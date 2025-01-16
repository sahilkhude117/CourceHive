import prisma from '@/utils/db';
import { NextResponse } from 'next/server';

export const GET = async (req: Request) => {
  try {
    const body = await req.json();
    const {
        categoryId
    } = body;

    const cources = await prisma.course.findMany({
      where: {
        categoryId: categoryId,
      }
    });

    return NextResponse.json(
      {
        cources
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