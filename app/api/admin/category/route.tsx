import prisma from '@/utils/db';
import { NextResponse } from 'next/server';

export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    const {
        name,
        slug
    } = body;

    const category = await prisma.category.create({
        data : {
            name,
            slug
        }
    });

    return NextResponse.json(
      {
        category
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