'use client'

import PawsLogo from "@/icons/PawsLogo";
import Image from "next/image";
import { trophy } from "@/images";

//import {Image}from '@/images'

type LeaderboardItem = {
    wallet: string;
    balance: string;
    place: string | number;
    medal? : any
}

const LeaderboardTab = () => {
    const leaderboardData: LeaderboardItem[] = [
        { wallet: "user 1", balance: "53,546,444", place: "1"},
        { wallet: "user 1", balance: "53,546,444", place: "2"},
        { wallet: "user 1", balance: "53,546,444", place: "3"},
        { wallet: "user 1", balance: "53,546,444", place: "4"},
        { wallet: "user 1", balance: "53,546,444", place: "5"},
        { wallet: "user 1", balance: "53,546,444", place: "6"},
        { wallet: "user 1", balance: "53,546,444", place: "7"},
        { wallet: "user 1", balance: "53,546,444", place: "8"},
        { wallet: "user 1", balance: "53,546,444", place: "9"},
    ]

    return (
        <div className={`leaderboard-tab-con transition-all duration-300`}>
            <div className="px-4">
                {/* {Headers} */}
                <div className="flex flex-col items-center mt-4">
                     <Image
                        src={trophy}
                        alt="Trophy"
                        width={80}
                        height={80}
                        className="mb-2"
                    /> 
                    <h1 className="text-2xl font-bold mb-2">Leaderboard</h1>
                    <div className="w-full h-12 items-center px-6 pu-1 flex justify-between rounded-lg text-sm font font-medium text-[#fefefe] bg-[#151516]">
                        <span>Total</span>
                        <span>23,345,354</span>
                    </div>
                </div>

                {/* Current User Stats */}
                <div className="bg-white rounded-2xl p-6 mt-4">
                    <div className="flex items-center justify-between">
                        <div className="flex item-center gap-3">
                            <div className="w-10 h-10 p-1.5 bg-black rounded-lg">
                                <PawsLogo className="w-full h-full"/>
                            </div>
                            <div className="text-black font-medium">
                                <div className="text-base">user</div>
                                <div className="text-xs">4,556 PAWS</div>
                            </div>
                        </div>
                        <div className="text-black">#15,234,454</div>
                    </div>
                </div>

                {/* Leaderboard list */}
                <div className="mt-2">
                    {leaderboardData.map((item,index) => (
                        <div 
                            key={index}
                            className={`p-4 flex items-center justify-between border-b-[1px] border-[#222622] ${index === 0 ? `bg-[#2d2b1b] rounded-t-2xl` : index === 1 ? `bg-[#272728]`: index === 2 ? 'bg-[#2d241b]' : `bg-[#151515]`}`}
                            >
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 p-1.5 bg-white rounded-lg">
                                       <PawsLogo className="w-full h-full text-black"/> 
                                </div>
                                <div>
                                    <div className="text-base font-medium">
                                        {item.wallet}
                                    </div>
                                    <div className="text-sm font-medium text-[#7c7c7c]">
                                        {item.balance} PAWS
                                    </div>
                                </div>
                            </div>
                            <div className={`text-base font-medium ${typeof item.place === 'string' && item.place.startsWith('#')
                                ? 'text-white' : '' }`}>
                                    {item.place}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default LeaderboardTab;