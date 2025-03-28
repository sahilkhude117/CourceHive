import prisma from '@/utils/db';
import { NextResponse } from 'next/server';

export const GET = async () => {
  try {
    const cources = await prisma.course.findMany({
      select: {
        id: true,
        title: true,
        slug: true,
        description: true,
        thumbnailUrl: true,
        originalPrice: true,
        price: true,
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
