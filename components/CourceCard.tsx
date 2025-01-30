import React from 'react';
import { useRouter } from 'next/navigation';

const CourseCard = ({   
  title,
  thumbnail,
  description, 
  slug,
  originalPrice,
  price,
}:{
    title : string, 
    thumbnail : string, 
    description : string
    slug : string,
    originalPrice: number,
    price : number,  
}) => {
    const router = useRouter();
    const discountPecentage = Math.round(((originalPrice - price) / originalPrice) * 100);

    return (
        <div className='bg-zinc-800 rounded-lg shadow-md p-4 mb-4'>
            <div className='flex items-start'>
                <img 
                    src={thumbnail}
                    alt={title}
                    className="w-24 h-24 rounded-lg object-cover mr-4"
                />
                <div className='flex-1'>
                    <h3 className="text-lg font-semibold mb-1">{title}</h3>
                    <p className="text-gray-500 text-sm mb-2">{description}</p>

                    <div>
                        <span className="text-xl font-bold p-1 text-blue-500">
                        ₹{price}
                        </span>
                        <span className="text-gray-400 p-1 text-sm line-through">
                        ₹{originalPrice}
                        </span>
                        <span className="bg-green-200 m-1 text-green-800 px-1 py-1 rounded text-xs">
                            {discountPecentage}% OFF
                        </span>
                    </div>

                    <button
                        onClick={() => router.push(`/course/${slug}`)}
                        className="w-full bg-blue-500 text-white px-4 py-2 mt-2 rounded-lg text-sm font-medium hover:bg-blue-600"
                    >
                        Enroll Now
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CourseCard;