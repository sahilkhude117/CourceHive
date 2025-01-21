import { NEXT_AUTH_CONFIG } from "@/public/lib/auth";
import prisma from "@/utils/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const session = await getServerSession(NEXT_AUTH_CONFIG);
    const user = session?.user;

  const userInfo = await prisma.user.findUnique({
    where: {
      email: user?.email
    },
    select: {
      name: true,
      email: true,
      purchases: {
        select: {
          courseId: true
        }
      }
    }
  })

  return NextResponse.json({
    userInfo: userInfo
  }, {
    status: 200
  })
  } catch (e) {
    console.log('Error', e);
    return NextResponse.json(
      {
        error: 'Internal Server Error',
        details: e,
      },
      {
        status: 500,
      }
    );
  }
};
