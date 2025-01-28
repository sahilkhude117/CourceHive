'use client';
import { Button } from '@/components/ui/button';
import { TabProvider } from '@/contexts/TabContext';
import { ArrowLeft } from 'lucide-react';
import React from 'react';
import { useRouter } from 'next/navigation';

const ContactUsPage: React.FC = () => {
  const router = useRouter();
  return (
    <TabProvider>
      <main className="min-h-screen bg-black text-white">
        <div className="sticky top-0 z-10 bg-black shadow-sm">
          <div className="flex items-center p-4">
            <Button onClick={() => router.back()} size="icon" className="mr-2">
              <ArrowLeft className="h-6 w-6" color="white" />
            </Button>
          </div>
        </div>
        <div className="min-h-screen bg-black p-4 mobile:max-w-md mx-auto">
          <div className="bg-zinc-950 shadow-md rounded-lg p-6">
            <h1 className="text-2xl font-bold text-center mb-6 text-white">
              Contact Us
            </h1>

            <section className="mb-6">
              <h2 className="text-xl font-semibold mb-3 text-blue-600">
                Merchant Legal Entity Name
              </h2>
              <p className="text-white">
                <strong>SAHIL VIKAS KHUDE</strong>
              </p>
            </section>

            <section className="mb-6">
              <h2 className="text-xl font-semibold mb-3 text-blue-600">
                Registered Address
              </h2>
              <p className="text-white">
                at-shendri post-badyachiwadi,
                <br />
                Gadhinglaj, Maharashtra,
                <br />
                PIN: 416502
              </p>
            </section>

            <section className="mb-6">
              <h2 className="text-xl font-semibold mb-3 text-blue-600">
                Operational Address
              </h2>
              <p className="text-white">
                at-shendri post-badyachiwadi,
                <br />
                Gadhinglaj, Maharashtra,
                <br />
                PIN: 416502
              </p>
            </section>

            <section className="mb-6">
              <h2 className="text-xl font-semibold mb-3 text-blue-600">
                Contact Information
              </h2>
              <ul className="space-y-2 text-white">
                <li className="flex items-start">
                  <span className="mr-2 text-green-500">📞</span>
                  Telephone No: 8767029766
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-blue-500">📧</span>
                  E-Mail ID: <a href="mailto:sahilkhude11@gmail.com" className="text-blue-400 underline">sahilkhude11@gmail.com</a>
                </li>
              </ul>
            </section>

            <div className="mt-6 text-center text-sm text-gray-500">
              Last Updated: January 28, 2025, 14:45:53
            </div>
          </div>
        </div>
      </main>
    </TabProvider>
  );
};

export default ContactUsPage;
