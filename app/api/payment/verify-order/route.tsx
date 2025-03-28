import prisma from '@/utils/db';
import crypto from 'crypto';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    const body = await req.json();
    const { 
        razorpay_order_id, 
        razorpay_payment_id, 
        razorpay_signature,
        userId,
        courseId,
        amount
    } = body;

    const secret = process.env.RAZORPAY_SECRET_KEY || "default";
    const sign = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
        .createHmac('sha256', secret)
        .update(sign)
        .digest('hex');

    if (razorpay_signature === expectedSignature) {
        //payment success, create purchase
        const purchase = await prisma.purchase.create({
            data: {
                userId: userId,
                courseId: courseId,
                paymentId: razorpay_payment_id,
                amount: amount,
                status: "COMPLETED"
            }
        });

        return NextResponse.json({ 
            success: true,
            message: 'Payment verified'
        }, { 
            status: 200 
        });
    } else {
        //payment failed, return error

        await prisma.purchase.create({
            data: {
                userId: userId,
                courseId: courseId,
                paymentId: razorpay_payment_id,
                amount: amount,
                status: "FAILED"
            }
        })
        return NextResponse.json({ 
            success: false,
            message: 'Payment verification failed'
        }, { 
            status: 400 
        });
    }
}

