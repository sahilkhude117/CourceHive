import prisma from '@/utils/db';
import { NextResponse, NextRequest } from 'next/server';

export const GET = async (req: NextRequest) => {
  try {
    const courseSlug = req.nextUrl.searchParams.get('coursename');

    const course = await prisma.course.findUnique({
      where: {
        slug: courseSlug ?? undefined
      },
      select: {
        id: true,
        title: true,
        slug: true,
        description: true,
        instructor: true,
        thumbnailUrl: true,
        duration: true,
        price: true,
        telegramLink: true,
        category: {
          select: {
            name: true,
          }
        }
      }
    });

    return NextResponse.json(
      {
        course
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