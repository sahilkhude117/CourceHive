'use client'
import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Badge } from './ui/badge';

const NumberBackground = ({ number }: { number: number }) => {
  const num = number.toString().padStart(2, '');
  return (
    <div className="absolute inset-0 z-0">
      <span className="text-[100px] text-white pt-20 pl-2 opacity-50 font-bold transform -translate-y-10 -translate-x-10">{num}</span>
    </div>
  );
};

const CourceItem = ({ item, router, index, isTop10 }: { 
  item: { id: string; thumbnailUrl: string ; slug: string}; 
  router: any; 
  index: number; 
  isTop10: boolean; 
}) => (
  <div
    className={`relative cursor-pointer rounded-lg h-[120px] overflow-hidden flex-shrink-0 ${isTop10 ? "w-[250px] pl-10" : "w-[200px]"}`}
    onClick={() => router.push(`/course/${item.slug}`)}
  >
    {isTop10 && <NumberBackground number={index + 1} />}
    <Image
      src={item.thumbnailUrl}
      alt="Thumbnail"
      className = {`w-full ${isTop10 ? "ml-1 h-full object-cover" : "h-full object-cover"} `}
      width={200}
      height={200}
    />
  </div>
);

const CourceList = ({ categoryName, cources, type }: { 
  categoryName: string; 
  cources: { id: string; thumbnailUrl: string , slug: string}[]; 
  type?: string; 
}) => {
  const router = useRouter();
  const isTop10 = type === 'top_10';

  return (
    <div className="p-5">
      <h2 className="text-xl font-bold mb-4">{categoryName}</h2>
      <div className="flex gap-4 overflow-x-auto scrollbar-hide ">
        {cources.map((item, index) => (
          <CourceItem
            key={item.id}
            item={item}
            router={router}
            index={index}
            isTop10={isTop10}
          />
        ))}
      </div>
    </div>
  );
};

export default CourceList;

