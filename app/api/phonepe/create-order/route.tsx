
import { NextApiRequest, NextApiResponse } from "next";
import crypto from "crypto";
import { PhonePePayload } from "@/utils/types";
import prisma from "@/utils/db";
import axios from "axios";

export async function POST(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { amount, userId, courseId } = req.body;
        const merchantTransactionId = `MT${userId}${courseId}${Date.now()}`;

        const payload: PhonePePayload = {
            merchantId: process.env.PHONEPE_MERCHANT_ID || "default",
            merchantTransactionId,
            merchantUserId: userId,
            amount: amount * 100,
            redirectUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/api/phonepe/redirect`,
            redirectMode: "POST",
            callbackUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/api/phonepe/callback`,
            paymentInstrument: {
                type: "PAY_PAGE",
            }
        };

        const base64Payload = Buffer.from(JSON.stringify(payload)).toString('base64');

        //calculate X-VERIFY for api
        const string = `${base64Payload}/pg/v1/pay${process.env.PHONEPE_SALT_KEY}`;
        const sha256 = crypto.createHash('sha256').update(string).digest('hex');
        const xVerify = `${sha256}###${process.env.PHONEPE_SALT_INDEX}`;

        const response = await axios.post('https://api.phonepe.com/apis/hermes/pg/v1/pay',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-VERIFY': xVerify,
            },
            body: JSON.stringify({
                request: base64Payload,
            }),
        });

        const data = response.data;

        await prisma.purchase.create({
            data: {
                userId,
                courseId,
                paymentId: merchantTransactionId,
                amount: amount * 100,
                status: "PENDING",
            }
        });

        res.status(200).json({
            success: true,
            redirectUrl: data.data.instrumentResponse.redirectInfo.url,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to create order",
        });
    }
}
