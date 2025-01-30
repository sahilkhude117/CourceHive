'use client'

import { TabType } from "@/utils/types";
import { useTab } from "@/contexts/TabContext";
import { BookOpen, GraduationCap, HomeIcon, Terminal, UserCircle } from "lucide-react";


const NavigationBar = () => {
    const {activeTab,setActiveTab} = useTab();
    const tabs: {id:TabType; label:string; Icon: React.FC<{className?: string}>}[] = [
        {id: 'home', label: 'Home', Icon: HomeIcon},
        {id: 'cources', label: 'Cources', Icon: Terminal},
        {id: 'mycources', label: 'MyCources', Icon: BookOpen},
        {id: 'profile', label: 'Profile', Icon: UserCircle},
    ]

    return (
        <div className="flex justify-center w-full">
            <div className="fixed bottom-0 bg-black border-t border-gray-800 w-full max-w-md">
                <div className="flex justify-between items-center px-4 py-2">
                    {tabs.map((tab) => {
                        const isActive = activeTab === tab.id 
                        return(
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex flex-col items-center`}
                            >
                                <tab.Icon
                                    className={`w-8 h-8 ${isActive ? `text-[#4c9ce2]` : `text-[#727272]`}`}
                                />
                                <span>
                                    {tab.label}
                                </span>
                            </button>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default NavigationBar;