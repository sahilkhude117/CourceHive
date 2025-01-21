import prisma from '@/utils/db';
import { NextResponse } from 'next/server';

export const GET = async (req: Request) => {
  try {
    
    const categories = await prisma.category.findMany({
      select: {
        id: true,
        name: true,
        slug: true,
        courses: {
          select: {
            id: true,
            thumbnailUrl: true,
            slug: true,
          }
        }
      }
    });

    return NextResponse.json(
      {
        categories
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