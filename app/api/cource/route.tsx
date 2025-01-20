import prisma from '@/utils/db';
import { NextResponse, NextRequest } from 'next/server';

export const GET = async (req: NextRequest) => {
  try {
    const courseId = req.nextUrl.searchParams.get('courseId');

    const cource = await prisma.course.findUnique({
      where: {
        id: courseId ?? undefined
      }
    });

    return NextResponse.json(
      {
        cource
      },
      {
        status: 200,
      }
    );
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