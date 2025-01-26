"use client"

import React, { useEffect, useState } from 'react';
import { ArrowLeft, CheckCircle, IndianRupee, Share2 } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import Image from 'next/image';
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
import Razorpay from 'razorpay';
import { PulseLoader } from 'react-spinners';
import { ShineBorder } from './ui/shine-border';

const CourseDetailsPage = ({ 
  courseId,
  userId,
  title, 
  instructor, 
  thumbnail, 
  originalPrice,
  price, 
  category,
  description,
  telegramLink
}:{
    courseId : string,
    userId : string,
    title : string, 
    instructor : string, 
    thumbnail : string, 
    originalPrice: number,
    price : number, 
    category : string,
    description : string,
    telegramLink : string
}) => {

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
    async (order: any) => {
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
            courseId : courseId,
            amount : price
          };

          try {
            const verify = await axios.post('/api/payment/verify-order', payload, {
              headers : {
                'Content-Type' : 'application/json'
              }
            });

            if (verify.data.success) {
              window.location.href = telegramLink;
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
          const response = await axios.post('/api/payment/create-order', { amount : price });
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

  const discountPecentage = Math.round(((originalPrice - price) / originalPrice) * 100);

  return (
    <div className="flex flex-col min-h-screen bg-black">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-black shadow-sm ">
        <div className="flex items-center p-4">
          <Button onClick={() => router.push('/')} variant="ghost" size="icon" className="mr-2">
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <h1 className="text-lg font-semibold flex-1 text-center">Course Details</h1>
          <Button variant="ghost" size="icon">
            <Share2 className="h-6 w-6" />
          </Button>
        </div>
      </div>

      {/* Course Image */}
      <div className="relative rounded-lg overflow-hidden w-full h-60">
        <Image
          src={thumbnail}
          alt={title}
          fill
          className="object-cover rounded-lg"
        />
        <Badge className="absolute top-4 right-4 bg-black">
          {category}
        </Badge>
        <ShineBorder borderRadius={8} borderWidth={2} className="absolute top-2 left-2 text-xs">
            <div className='rounded-full'>
                <div className='font-bold'>
                    {discountPecentage}% Off
                </div>
            </div>
        </ShineBorder>
      </div>

      {/* Course Info */}
      <div className="p-4 bg-black">
        <h2 className="text-xl font-bold mb-2">{title}</h2>
        <p className="text-gray-600 mb-2">By {instructor}</p>
        <div className="flex items-center justify-between mb-4">
        <div>
            <div>
                <div className='flex flex-row'>
                    <IndianRupee size={12} className='mt-2'/>
                    <span className="text-3xl font-bold">{price}</span>
                </div>
                
                <div>
                <span className="text-red-900 font-bold text-sm pr-1">- {discountPecentage}% </span>
                    <span className="text-gray-500 line-through text-sm">₹{originalPrice}</span>
                </div>
            </div>
          </div>
        </div>
      </div>

      {/* Course Details */}
      <div className="flex-1 pl-4 pr-4 pt-0 pb-0 bg-black">
        <Accordion type="single" collapsible>
          <AccordionItem value="description">
            <AccordionTrigger className="text-lg font-semibold">
              Course Description
            </AccordionTrigger>
            <AccordionContent>
              <p className="text-gray-600">{description}</p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="whatYouGet">
            <AccordionTrigger className="text-lg font-semibold">
              What You'll Get
            </AccordionTrigger>
            <AccordionContent>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  Lifetime access to course materials
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  Access to exclusive Telegram group
                </li>
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      {/* Sticky Purchase Button */}
      <div className="sticky w-full bg-black p-4">
        {status === "authenticated" ? (
          <Button 
            className="w-full bg-[#4c9ce2]/80 hover:bg-[#4c9ce2]/60 py-6 text-lg font-semibold"
            onClick={handleClick}
            disabled={loading}
          >
            {loading ? <PulseLoader color="#fff" size={12} /> : `Buy Now ₹${price}`}
        </Button>
        ) : (
          <Auth/>
        )}
      </div>
    </div>
  );
};

export default CourseDetailsPage;