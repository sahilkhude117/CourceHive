import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PlayCircle, Clock, IndianRupee} from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ShineBorder } from './ui/shine-border';

const CourseCard = ({ 
  courseId,  
  title, 
  instructor, 
  thumbnail, 
  duration, 
  slug,
  originalPrice,
  price, 
  category 
}:{
    courseId : string,
    title : string, 
    instructor : string, 
    thumbnail : string, 
    duration : string,  
    slug : string,
    originalPrice: number,
    price : number, 
    category : string   
}) => {
    const router = useRouter();
    const discountPecentage = Math.round(((originalPrice - price) / originalPrice) * 100);

    return (
        <div className='ml-5 mb-5 mr-5'>
            <Card className="w-full max-w-sm mx-auto">
            <CardHeader className="p-0">
                <div className="relative">
                <Image
                    src={thumbnail}
                    alt="courceHive Logo"
                    className='w-full h-52 object-cover rounded-t-lg'
                    width={500}
                    height={500}
                />
                <Badge className="absolute top-2 right-2 bg-primary">
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
                
                <button onClick={() => {
                    router.push(`/course/${slug}`);
                }} className="bg-[#4c9ce2] text-black px-4 py-2 rounded-lg text-sm font-bold">
                Enroll Now
                </button>
            </CardFooter>
            </Card>
        </div>
  );
};

export default CourseCard;