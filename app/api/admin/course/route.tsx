import prisma from '@/utils/db';
import { NextResponse } from 'next/server';

export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    const {
        title,         
        slug,           
        description, 
        instructor,
        duration,    
        price,           
        thumbnailUrl, 
        lessions,
        videoUrl,   
        telegramLink, 
        categoryId,    
    } = body;

    const course = await prisma.course.create({
      data : {
        title,
        slug,
        description,
        instructor,
        duration,
        price,
        thumbnailUrl,
        lessions,
        videoUrl,
        telegramLink,
        categoryId,
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