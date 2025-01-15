import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PlayCircle, Clock} from 'lucide-react';
import Image from 'next/image';
import { courcehiveLogo } from '@/images';

const CourseCard = ({ 
  title, 
  instructor, 
  thumbnail, 
  duration, 
  progress, 
  price, 
  category 
}:{
    title : string, 
    instructor : string, 
    thumbnail : string, 
    duration : string, 
    progress : number, 
    price : string, 
    category : string   
}) => {
  return (
    <div className='ml-12 mb-5 mr-12'>
        <Card className="w-full max-w-sm mx-auto">
        <CardHeader className="p-0">
            <div className="relative">
            <Image
                src={courcehiveLogo}
                alt="courceHive Logo"
                className='w-full h-48 object-cover rounded-t-lg'
                width={500}
                height={500}
            />
            <Badge className="absolute top-2 right-2 bg-primary">
                {category}
            </Badge>
            </div>
        </CardHeader>
        <CardContent className="p-4">
            <h3 className="text-lg font-semibold mb-2 line-clamp-2">{title}</h3>
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
            <span>{instructor}</span>
            </div>
            <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span className="text-sm">{duration}</span>
            </div>
            <div className="flex items-center gap-1">
                <PlayCircle className="w-4 h-4" />
                <span className="text-sm">12 lessons</span>
            </div>
            </div>
        </CardContent>
        <CardFooter className="p-4 pt-0 flex justify-between items-center">
            <span className="text-lg font-bold">₹{price}</span>
            <button className="bg-[#4c9ce2] text-black px-4 py-2 rounded-lg text-sm font-bold">
             Enroll Now
            </button>
        </CardFooter>
        </Card>
    </div>
  );
};

export default CourseCard;