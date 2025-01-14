'use client'

import ArrowBigRight from "@/icons/ArrowBigRight";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const CheckFootprint = () => {
    return (
        <div className="flex justify-center w-full">
            <div className="fixed top-0 w-full max-w-md px-4 py-3 bg-[#151516] cursor-pointer">
                <div className="flex justify-between items-center pl-2 border-1-[2px] border-[#4c9ce2]">
                    <div className="text-base text-white font-medium">
                        CourceHive
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