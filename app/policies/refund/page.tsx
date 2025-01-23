'use client'
import React from 'react';
import { TabProvider } from '@/contexts/TabContext';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

const RefundAndCancellationPage: React.FC = () => {
  const router = useRouter();
  return (
    <TabProvider>
    <div className="sticky top-0 z-10 bg-black shadow-sm ">
        <div className="flex items-center p-4">
          <Button onClick={() => router.back()} size="icon" className="mr-2">
            <ArrowLeft className="h-6 w-6" color='white' />
          </Button>
        </div>
      </div>
    <div className="min-h-screen bg-black p-4 mobile:max-w-md mx-auto">
      <div className="bg-zinc-950 shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold text-center mb-6 text-white">
          Refund & Cancellation Policy
        </h1>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-3 text-blue-600">
            Refund Terms
          </h2>
          <ul className="space-y-2 text-white">
            <li className="flex items-start">
              <span className="mr-2 text-green-500">✓</span>
              30% refund within 7 days of purchase
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-green-500">✓</span>
              Refund valid if less than 30% course content viewed
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-red-500">✗</span>
              No refunds after 7 days
            </li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-3 text-blue-600">
            Refund Process
          </h2>
          <ol className="space-y-2 text-white list-decimal pl-5">
            <li>Email support - sahilkhude11@gmail.com</li>
            <li>Include purchase details</li>
            <li>State reason for refund</li>
            <li>Refund processed in 5-7 business days</li>
          </ol>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3 text-blue-600">
            Course Cancellation
          </h2>
          <p className="text-white mb-2">
            Cancel enrollment before course start with partial refund based on course progress.
          </p>
          <p className="text-white">
            100% digital course delivery with instant access post-purchase.
          </p>
        </section>

        <div className="mt-6 text-center text-sm text-white">
          Last Updated: January 2024
        </div>
      </div>
    </div>
    </TabProvider>
  );
};

export default RefundAndCancellationPage;