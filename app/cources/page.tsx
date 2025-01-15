import CourceDetailsPage from "@/components/CourceDetailsPage";
import NavigationBar from "@/components/NavigationBar";
import TabContainer from "@/components/TabContainer";
import { TabProvider } from "@/contexts/TabContext";

export default function Cources() {
    return <TabProvider>
        <main className="min-h-screen bg-black text-white">
            <div className="flex-1 overflow-hidden max-w-md mx-auto pb-[72px]">
                <CourceDetailsPage
                    title="Learn React"
                    instructor="John Doe"
                    thumbnail=""
                    price={100}
                    category="Web Development"
                    description="Learn React from scratch"
                    telegramLink="https://t.me/joinchat/AAAAAEXQYQg"    
                />
            </div>
        </main>
    </TabProvider>
}
