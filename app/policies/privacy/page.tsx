'use client'
import { Button } from '@/components/ui/button';
import { TabProvider } from '@/contexts/TabContext';
import { ArrowLeft } from 'lucide-react';
import React from 'react';
import { useRouter } from 'next/navigation';

const PrivacyPolicyPage: React.FC = () => {
    const router = useRouter();
  return (
    <TabProvider>
    <main className='min-h-screen bg-black text-white'>
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
          Privacy Policy
        </h1>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-3 text-blue-600">
            Data Collection
          </h2>
          <ul className="space-y-2 text-white">
            <li className="flex items-start">
              <span className="mr-2 text-blue-500">•</span>
              Email address
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-blue-500">•</span>
              Payment information
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-blue-500">•</span>
              Course interaction data
            </li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-3 text-blue-600">
            Data Usage
          </h2>
          <p className="text-white mb-2">
            We collect and use data for:
          </p>
          <ul className="space-y-2 text-white">
            <li className="flex items-start">
              <span className="mr-2 text-green-500">✓</span>
              Course personalization
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-green-500">✓</span>
              Platform improvement
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-green-500">✓</span>
              Fraud prevention
            </li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-3 text-blue-600">
            User Rights
          </h2>
          <ul className="space-y-2 text-white">
            <li className="flex items-start">
              <span className="mr-2 text-blue-500">🔒</span>
              Request data deletion
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-blue-500">🔒</span>
              Access personal information
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-blue-500">🔒</span>
              Opt-out of marketing communications
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3 text-blue-600">
            Data Protection
          </h2>
          <p className="text-white">
            We implement SSL encryption, regular security audits, and ensure GDPR and CCPA compliance.
          </p>
        </section>

        <div className="mt-6 text-center text-sm text-gray-500">
          Last Updated: January 2024
        </div>
      </div>
    </div>
    </main>
    </TabProvider>
  );
};

export default PrivacyPolicyPage;