import { NextApiRequest, NextApiResponse } from "next";
import crypto from "crypto";
import prisma from "@/utils/db";
import axios from "axios";

export async function POST(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { merchantTransactionId, transactionId, amount, code } = req.body;

        //verify callback
        const string = `/pg/v1/status/${process.env.PHONEPE_MERCHANT_ID}/${merchantTransactionId}${process.env.PHONEPE_SALT_KEY}`;
        const sha256 = crypto.createHash('sha256').update(string).digest('hex');
        const xVerify = `${sha256}###${process.env.PHONEPE_SALT_INDEX}`;

        //check payment status with phonepe
        const response = await axios.get(`https://api.phonepe.com/apis/hermes/pg/v1/status/${process.env.PHONEPE_MERCHANT_ID}/${merchantTransactionId}`, {
            headers: {
                'Content-Type': 'application/json',
                'X-VERIFY': xVerify,
                'X-MERCHANT-ID': process.env.PHONEPE_MERCHANT_ID || "default",
            },
        });

        const data = response.data;

        if(data.status === "PAYMENT_SUCCESS") {
            await prisma.purchase.update({
                where: { paymentId: merchantTransactionId },
                data: { status: "COMPLETED" },
            });

            res.redirect(307, `/payment/success?transactionId=${transactionId}`);
        } else{
            await prisma.purchase.update({
                where: { paymentId: merchantTransactionId },
                data: { status: "FAILED" },
            });

            res.redirect(307, `/payment/failed`);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

