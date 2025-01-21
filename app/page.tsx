import CheckFootprint from "@/components/CheckFootprint";
import NavigationBar from "@/components/NavigationBar";
import TabContainer from "@/components/TabContainer";
import { TabProvider } from "@/contexts/TabContext";
import { NEXT_AUTH_CONFIG } from "@/public/lib/auth";
import { getServerSession } from "next-auth";

async function getUser() {
  const session = await getServerSession(NEXT_AUTH_CONFIG);
  return session;
}

export default async function Home() {
  const session = await getUser();
  return (
    <TabProvider>
      <main className="min-h-screen bg-black text-white">
        <CheckFootprint/>
        <TabContainer/>
        <NavigationBar/>
      </main>
    </TabProvider>
  )
}