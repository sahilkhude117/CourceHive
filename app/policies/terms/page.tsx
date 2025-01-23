'use client'
import { Button } from '@/components/ui/button';
import { TabProvider } from '@/contexts/TabContext';
import { ArrowLeft, Share2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';

const TermsAndConditionsPage: React.FC = () => {
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
          Terms and Conditions
        </h1>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-3 text-blue-600">
            User Agreement
          </h2>
          <ul className="space-y-2 text-white">
            <li className="flex items-start">
              <span className="mr-2 text-blue-500">✓</span>
              Users must be 13+ years old
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-blue-500">✓</span>
              One account per individual
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-blue-500">✓</span>
              Course content for personal use only
            </li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-3 text-blue-600">
            Account Responsibilities
          </h2>
          <ul className="space-y-2 text-white">
            <li className="flex items-start">
              <span className="mr-2 text-blue-500">⚠️</span>
              Maintain account security
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-blue-500">⚠️</span>
              Provide accurate registration information
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-blue-500">⚠️</span>
              Comply with platform guidelines
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3 text-blue-600">
            Content Usage
          </h2>
          <p className="text-white">
            Courses are intended for personal learning. Reproduction, distribution, or sharing of course materials is strictly prohibited.
          </p>
        </section>

        <div className="mt-6 text-center text-sm text-gray-500">
          Last Updated: January 2024
        </div>
      </div>
    </div>
    </TabProvider>
  );
};

export default TermsAndConditionsPage;