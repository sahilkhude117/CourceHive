'use client'
import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { courcehiveLogo, sparkles, taskWhitePaws } from '@/images';

const NumberBackground = ({ number }: { number: number }) => {
  const num = number.toString().padStart(2, '');
  return (
    <div className="absolute inset-0 flex justify-center items-center z-10">
      <span className="text-[100px] text-white pt-20 opacity-20 font-bold transform -translate-y-10 -translate-x-10">{num}</span>
    </div>
  );
};

const CourceItem = ({ item, router, index, isTop10 }: { 
  item: { id: string; imageUrl: string }; 
  router: any; 
  index: number; 
  isTop10: boolean; 
}) => (
  <div
    className={`relative cursor-pointer rounded-lg overflow-hidden h-[150px] flex-shrink-0 ${isTop10 ? "w-[150px]" : "w-[100px]"}`}
    onClick={() => router.push(`/cources/${item.id}`)}
  >
    {isTop10 && <NumberBackground number={index + 1} />}
    <Image
      src={taskWhitePaws}
      alt="Thumbnail"
      className = {`w-full ${isTop10 ? "ml-10 h-full object-cover" : "h-full object-cover"} `}
      width={200}
      height={225}
    />
  </div>
);

const CourceList = ({ rowTitle, cources, type }: { 
  rowTitle: string; 
  cources: { id: string; imageUrl: string }[]; 
  type?: string; 
}) => {
  const router = useRouter();
  const isTop10 = type === 'top_10';

  return (
    <div className="p-5">
      <h2 className="text-xl font-bold mb-4">{rowTitle}</h2>
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

