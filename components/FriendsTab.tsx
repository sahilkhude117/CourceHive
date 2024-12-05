'use client'

import Image from "next/image";
import { paws } from "@/images";

const FriendsTab = () => {
    return (
        <div className={`friends-tab-con px-4 pb-24 transition-all duration-300`}>
         {/* Header Text */}
            <div className="pt-8 space-y-1">
                <h1 className="text-3xl font-bold">Invite Friends</h1>
                <div className="text-xl">
                    <span className="font-semibold">Share</span>
                    <span className="ml-2 text-gray-500">Your Invitation</span>
                </div>
                <div className="text-xl">
                    <span className="text-gray-500">Link &</span>
                    <span className="ml-2 font-semibold">Get 10%</span>
                    <span className="ml-2 text-gray-500">of</span>
                </div>
                <div className="text-gray-500 text-xl">
                    Friends Points
                </div>
            </div>

            {/* Empty State */}
            <div className="mt-8 mb-2">
                <div className="bg-[#151516] w-full rounded-2xl p-8 flex flex-col items-center">
                    <Image 
                        src={paws}
                        alt="Paws"
                        width={170}
                        height={130}
                        className="mb-4" />
                    <p className="text-xl text-[#8e8e93] text-center">
                        There is nothing else. <br />
                        Invite to get more rewards
                    </p>    
                </div>
            </div>

            {/* Invite Button */}
            <div className="fixed bottom-[80px] left-0 right-0 py-4 flex justify-center">
                <div className="w-full max-w-md px-4">
                    <button className="w-full bg-[#4c9ce2] text-white py-4 rounded-xl text-lg font-medium">
                        Invite
                    </button>
                </div>
            </div>
        </div>
       
    )
}

export default FriendsTab;