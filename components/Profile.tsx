import React from 'react';
import {
  User,
  Mail,
  Phone,
  MapPin,
  BookOpen,
  Clock,
  ChevronRight,
  Settings,
  LogOut,
  Bell,
  Shield,
  CreditCard
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
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { EditProfile } from './EditProfile';

const StudentProfile = () => {
  const studentInfo = {
    name: "Alex Johnson",
    email: "alex.j@example.com",
    phone: "+91 98765 43210",
    location: "Mumbai, India",
    enrolledCourses: 3,
    hoursWatched: 45
  };

  return (
    <div className="flex flex-col min-h-screen mt-10">
      {/* Profile Header */}
      <div className="bg-black p-6">
        <div className="flex items-center space-x-4">
          <Avatar className="h-20 w-20">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-xl font-bold">{studentInfo.name}</h2>
            <p className="text-gray-500">Student</p>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4 mt-6 ">
          <Card className=''>
            <CardContent className="p-4 flex flex-col items-center">
              <BookOpen className="h-6 w-6 text-primary mb-2" />
              <p className="text-lg font-bold">{studentInfo.enrolledCourses}</p>
              <p className="text-sm text-gray-500">Enrolled Courses</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex flex-col items-center">
              <Clock className="h-6 w-6 text-primary mb-2" />
              <p className="text-lg font-bold">{studentInfo.hoursWatched}h</p>
              <p className="text-sm text-gray-500">Hours Watched</p>
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
                  <p className="font-medium">{studentInfo.email}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="font-medium">{studentInfo.phone}</p>
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
              { icon: Bell, label: 'Notifications', desc: 'Manage your notifications' },
              { icon: Shield, label: 'Privacy', desc: 'Manage your privacy settings' },
              { icon: CreditCard, label: 'Payment Methods', desc: 'Manage your payment options' },
            ].map((item, index) => (
              <Card key={index} className="cursor-pointer hover:bg-gray-50">
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
            onClick={() => {/* Handle logout */}}
          >
            <LogOut className="h-5 w-5 mr-2" />
            Logout
          </Button>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StudentProfile;