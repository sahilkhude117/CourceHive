import React, { useEffect, useState } from 'react';
import {
  Mail,
  BookOpen,
  ChevronRight,
  LogOut,
  Bell,
  CreditCard,
  Coins,
  Shield,
  Phone
} from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { EditProfile } from './EditProfile';
import axios from 'axios';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Auth } from './Auth';

interface UserInfo {
  name: string;
  email: string;
  purchases: {
    courseId: string;
  }[];
}

const StudentProfile = () => {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const { data: session , status } = useSession();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get('/api/user');
        setUserInfo(response.data.userInfo);
      } catch (error) {
        console.error('Error fetching user info:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchUserInfo();
  }, []);

  const handleLogout = () => {
    if(window.confirm('Are you sure you want to logout?')) {
      signOut();
      router.push('/');
    }
  }

  return (
    <div className="flex flex-col min-h-screen mt-10">
      {/* Profile Header */}
      {status === 'unauthenticated' ? (
        <div className='flex justify-center items-center h-screen'>
          <Auth/>
        </div>
      ) : (
      <div> 
      <div className="bg-black p-6">
        <div className="flex items-center space-x-4">
          <Avatar className="h-20 w-20">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-xl font-bold">
              {loading ? 'Loading...' : userInfo?.name}
            </h2>
            <p className="text-gray-500">Student</p>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid gap-4 mt-6 ">
          <Card className=''>
            <CardContent className="p-4 flex flex-col items-center">
              <BookOpen className="h-6 w-6 text-primary mb-2" />
              <p className="text-lg font-bold">{loading ? 'Loading...' : userInfo?.purchases.length}</p>
              <p className="text-sm text-gray-500">Enrolled Courses</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="info" className="flex-1">
        <TabsList className="grid w-full grid-cols-2 bg-zinc-800">
          <TabsTrigger value="info">Information</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="info" className="p-4 space-y-4">
          <Card>
            <CardContent className="p-4 space-y-4">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium">{loading ? 'Loading...' : userInfo?.email}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <div className='flex justify-center pt-4'>
            <EditProfile/> 
          </div>
               
        </TabsContent>

        <TabsContent value="settings" className="p-4 space-y-4 bg-black">
          <div className="space-y-4 ">
            {[
              {icon: Mail, label: 'Terms & Conditions', desc: 'Terms of use and conditions', link: '/policies/terms'},
              {icon: CreditCard, label: 'Refund & Cancellation', desc: 'Refund and cancellation policy', link: '/policies/refund'},
              {icon: Shield, label: 'Privacy Policy', desc: 'Privacy policy', link: '/policies/privacy'},
              {icon: Phone, label: 'Contact', desc: 'Contact', link: '/policies/contact'},
            ].map((item, index) => (
              <Card key={index} onClick={() => router.push(item.link)} className="cursor-pointer hover:bg-gray-50">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <item.icon className="h-5 w-5 text-gray-500" />
                      <div>
                        <p className="font-medium">{item.label}</p>
                        <p className="text-sm text-gray-500">{item.desc}</p>
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Button 
            variant="destructive" 
            className="w-full mt-6"
            onClick={handleLogout}
          >
            <LogOut className="h-5 w-5 mr-2" />
             Logout
          </Button>
        </TabsContent>
      </Tabs>
      </div>
      )}
    </div>
  );
};

export default StudentProfile;