import prisma from '@/utils/db';
import { NextResponse, NextRequest } from 'next/server';

export const GET = async (req: NextRequest, { params }: { params: { slug: string } }) => {
  try {
    const courseSlug = params.slug;

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
        originalPrice: true,
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