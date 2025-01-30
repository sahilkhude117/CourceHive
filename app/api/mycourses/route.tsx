import { NEXT_AUTH_CONFIG } from '@/public/lib/auth';
import prisma from '@/utils/db';
import axios from 'axios';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

export const GET = async (req: Request) => {

    const session = await getServerSession(NEXT_AUTH_CONFIG);
    const user = session?.user;

    try {
        const myCourses = await prisma.purchase.findMany({
            where: {
                user : {
                    email : user?.email
                }
            },
            select: {
                id: true,
                purchasedAt: true,
                course : {
                    select: {
                        title : true,
                        thumbnailUrl : true,
                        telegramLink: true,
                        modules:{
                          select: {
                            lessons: {
                              select : {
                                id: true,
                                progress : {
                                  where : {
                                    user:{
                                      email : user?.email
                                    }
                                  },
                                  select: {
                                    completed: true,
                                  }
                                }
                              }
                            }
                          }
                        },
                    }
                }
            }
    });

    return NextResponse.json(
      {
        myCourses
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