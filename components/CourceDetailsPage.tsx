"use client"

import React, { useEffect, useState } from 'react';
import { ArrowLeft, CheckCircle, CheckCircle2, ChevronLeft, GraduationCap, Clock, IndianRupee, Share2, ShoppingCart } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Auth } from './Auth';
import axios from 'axios';
import { useCallback } from 'react';
import { PulseLoader } from 'react-spinners';
import { CardHeader, Card, CardContent, CardFooter } from './ui/card';
import { Course } from '@/app/course/[coursename]/page';
import { TabProvider } from '@/contexts/TabContext';
import { CourseSkeleton } from './SkeletonCard';



const CourseDetailsPage = ({course, userId}:{course: Course | null; userId: String | null}) => {

  const { data: session, status } = useSession();
  const user = session?.user;
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  interface RazorpayResponse {
    razorpay_payment_id : string,
    razorpay_order_id : string,
    razorpay_signature : string
  }
  
  const loadRazorpay = useCallback((): Promise<boolean> => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => {
        resolve(true);
      }
      script.onerror = () => {
        resolve(false);
      }
      document.body.appendChild(script);
    })
  }, []);

  const handleClick = async () => {
    setLoading(true);
    try {
      await onBuy();
    } catch (error) {
      console.error("Failed to buy course", error);
      alert("Failed to buy course");
    } finally {
      setLoading(false);
    }
  };

  const handlePurchase = useCallback(
    async (order: any,) => {
      const options = {
        key : process.env.NEXT_PUBLIC_RAZORPAY_KEY,
        amount : order.amount,
        currency : "INR",
        name : "CourceHive",
        order_id : order.id,
        handler : async (response: RazorpayResponse) => {
          const payload = {
            razorpay_payment_id : response.razorpay_payment_id,
            razorpay_order_id : response.razorpay_order_id,
            razorpay_signature : response.razorpay_signature,
            userId : userId, 
            courseId : course?.id ?? "",
            amount : course?.price ?? 0
          };

          try {
            const verify = await axios.post('/api/payment/verify-order', payload, {
              headers : {
                'Content-Type' : 'application/json'
              }
            });

            if (verify.data.success) {
              window.location.href = course?.telegramLink ?? "";
            } else {
              alert("Payment failed");
            }
          } catch (error) {
            console.error("Payment verification failed", error);
            alert("Payment verification failed");
          }
        },
        prefill : {
          name : session?.user?.name,
          email : session?.user?.email,
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    },
    []
  );

  const onBuy = async () => {
    return new Promise(async (resolve, reject) => {
      try {
        const isLoaded = await loadRazorpay();
        if (!isLoaded) {
          reject("Razorpay script failed to load");
          alert("Razorpay script failed to load");
          return;
        }

        try {
          const response = await axios.post('/api/payment/create-order', { amount : course?.price ?? 0});
          const order = response.data.order;
          await handlePurchase(order);
          resolve(true);
        } catch (error) {
          reject("Failed to create order");
          alert("Failed to create order");
        }
      } catch (error) {
        reject("Failed to create order");
        alert("Failed to create order");
      }
    })
  }

  const discountPercentage = Math.round(
    (((course?.originalPrice ?? 0) - (course?.price ?? 0 )) / (course?.originalPrice ?? 0)) * 100
  );

  const totalLessons = (course?.modules.reduce((acc, module) => acc + module.lessons.length, 0));
  const totalDuration = course?.modules.reduce(
    (acc, module) => acc + module.lessons.reduce((sum, lesson) => sum + lesson.duration, 0),0
  );

  return (
    <div className="flex flex-col min-h-screen bg-black">
      {/* Header */}
      <div className="relative">
        <Button onClick={() => {
          router.push('/')
        }} variant="ghost" size="sm" className="absolute top-4 left-4 z-10">
          <ChevronLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <img 
          src={course?.thumbnailUrl ?? ""}
          alt={course?.title ?? ""}
          className="w-full h-70 object-cover rounded-b-lg"
        />
      </div>

      <div className="p-4 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <h1 className="text-xl text-white font-bold mb-2">{course?.title ?? ""}</h1>
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-200">By {course?.instructor ?? ""}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Clock className="h-4 w-4" />
              <span>{totalDuration} m</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <GraduationCap className="h-4 w-4" />
              <span>{totalLessons} lessons</span>
            </div>
          </div>

          <p className="text-gray-600 mb-6">{course?.description}</p>

          {/* Curriculum */}
          <Accordion type="single" collapsible className="w-full">
            {course?.modules.map((module, index) => {
              const moduleLessons = module.lessons.length;
              const moduleDuration = module.lessons.reduce((sum, lesson) => sum + lesson.duration, 0);

              return (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger>
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-medium text-gray-300">{module.title}</span>
                      <span className="absolute right-8 text-xs text-gray-500 ">{moduleDuration} mins</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                      <Badge className="text-xs text-gray-300">
                        {moduleLessons} lessons
                      </Badge>
                    <div className="text-sm text-gray-400 mt-2">{module.description}</div>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </div>

        {/* Purchase Card */}
        <div className='mt-4'>
          <Card className="sticky top-4">
            <CardHeader>
              <div className="flex justify-between items-center">
                <div className="space-y-1">
                  <div className="text-3xl font-bold">₹{course?.price ?? 0}</div>
                  <div className="text-sm text-gray-500 line-through">₹{course?.originalPrice ?? 0}</div>
                </div>
                <Badge className="bg-green-100 text-green-800">
                  {discountPercentage}% OFF
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {status === 'authenticated' ? (
              <Button
                className="w-full py-6 text-lg font-semibold"
                onClick={handleClick}
                disabled={loading}
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                  {loading ? <PulseLoader color="#fff" size={12} /> : `Buy Now`}
              </Button>
              ):(
                <Auth/>
              )}
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  <span>Full lifetime access</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  <span>14-day money-back guarantee</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="text-xs text-gray-500">
              Includes Exclusive access to video and downloadable resources
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailsPage;