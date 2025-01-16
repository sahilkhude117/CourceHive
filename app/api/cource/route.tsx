import prisma from '@/utils/db';
import { NextResponse } from 'next/server';

export const GET = async (req: Request) => {
  try {
    const body = await req.json();
    const {
        courseId
    } = body;

    const cource = await prisma.course.findUnique({
      where: {
        id: courseId
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