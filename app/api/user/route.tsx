import prisma from '@/utils/db';
import { useSearchParams } from 'next/navigation';
import { NextResponse } from 'next/server';

export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    const {
        name,
        email,
        password
    } = body;

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password
      }
    });

    return NextResponse.json(
      {
        user
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

export const PUT = async (req: Request) => {
  try {
    const body = await req.json();
    const {
        name,
        email,
    } = body;

    const user = await prisma.user.update({
      where: {
        email
      },
      data: {
        name,
      }
    });

    return NextResponse.json(
      {
        status: 'success',
        user
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

export const GET = async (req: Request) => {
  try {
    const id = getUserId();

    const user = await prisma.user.findUnique({
      where: {
        id, 
      }
    });

    return NextResponse.json(
      {
        user
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

async function getUserId() {
  const searchParams = await useSearchParams();
  const userId = await searchParams.get('userId');
  return userId;
}