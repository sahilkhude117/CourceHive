'use client'

import { useTab } from "@/contexts/TabContext";
import HomeTab from "./HomeTab";
import { CourcesTab } from "./CourcesTab";
import Profile from "./Profile";

const TabContainer = () => {
    const { activeTab } = useTab();
    return (
        <div className="flex-1 overflow-hidden max-w-md mx-auto pt-[20px] pb-[72px]">
            <div className={`${activeTab === 'home' ? 'is-show' : 'is-hide'}`}>
                <HomeTab/>
            </div>
            <div className={`${activeTab === 'cources' ? 'is-show' : 'is-hide'}`}>
                <CourcesTab/>
            </div>
            <div className={`${activeTab === 'profile' ? 'is-show' : 'is-hide'}`}>
                <Profile/>
            </div>
        </div>
    )
}

export default TabContainer;