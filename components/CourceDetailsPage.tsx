"use client"

import React from 'react';
import { ArrowLeft, CheckCircle, Share2 } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { taskWhitePaws } from '@/images';

const CourseDetailsPage = ({ 
  title, 
  instructor, 
  thumbnail, 
  price, 
  category,
  description,
  telegramLink
}:{
    title : string, 
    instructor : string, 
    thumbnail : string, 
    price : number, 
    category : string,
    description : string,
    telegramLink : string
}) => {
  const handlePurchase = async () => {
    // Here you would implement your payment gateway integration
    try {
      // After successful payment:
      window.location.href = telegramLink;
    } catch (error) {
      console.error('Payment failed:', error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-black">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-black shadow-sm ">
        <div className="flex items-center p-4">
          <Button variant="ghost" size="icon" className="mr-2">
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
          src={taskWhitePaws}
          alt={title}
          fill
          className="object-cover rounded-lg"
        />
        <Badge className="absolute top-4 right-4 bg-black">
          {category}
        </Badge>
      </div>

      {/* Course Info */}
      <div className="p-4 bg-black">
        <h2 className="text-xl font-bold mb-2">{title}</h2>
        <p className="text-gray-600 mb-2">By {instructor}</p>
        <div className="flex items-center justify-between mb-4">
          <span className="text-2xl font-bold">₹{price}</span>
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
        <Button 
          className="w-full bg-[#4c9ce2]/80 hover:bg-[#4c9ce2]/60 py-6 text-lg font-semibold"
          onClick={handlePurchase}
        >
          Buy Now ₹{price}
        </Button>
      </div>
    </div>
  );
};

export default CourseDetailsPage;