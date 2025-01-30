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
        instructor : true,
        slug: true,
        telegramLink: true,
        price: true,
        originalPrice: true,
        thumbnailUrl: true,
        description: true,
        modules: {
          select: {
            id: true,
            title: true,
            description: true,
            lessons: {
              select: {
                id: true,
                duration: true
              }
            }
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