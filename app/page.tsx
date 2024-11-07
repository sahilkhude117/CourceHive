// app/page.tsx

/**
 * This project was developed by Nikandr Surkov.
 * 
 * YouTube: https://www.youtube.com/@NikandrSurkov
 * GitHub: https://github.com/nikandr-surkov
 */

import CheckFootprint from '@/components/CheckFootprint'
import NavigationBar from '@/components/NavigationBar'
import TabContainer from '@/components/TabContainer'
import { TabProvider } from '@/contexts/TabContext'

export default function Home() {
  return (
    <TabProvider>
      <main className="min-h-screen bg-black text-white">
        <div className="max-w-md mx-auto pt-[44px] pb-[72px]">
          <CheckFootprint />

          <TabContainer />
        </div>
        <NavigationBar />
      </main>
    </TabProvider>
  )
}