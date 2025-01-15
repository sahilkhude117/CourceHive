'use client'

import ArrowBigRight from "@/icons/ArrowBigRight";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const CheckFootprint = () => {
    return (
        <div className="flex fixed z-20 justify-center w-full">
            <div className="top-0 w-full max-w-md px-4 py-3 bg-[#151516]">
                <div className="flex justify-between items-center pl-2 border-1-[2px] border-[#4c9ce2]">
                    <div className="flex text-base font-medium">
                        <div className="text-white">
                            Cource
                        </div>
                        <div className="text-cyan-700">
                            Hive
                        </div>
                    </div>
                    
                    <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                </div>
            </div>
        </div>
    )
}

export default CheckFootprint;