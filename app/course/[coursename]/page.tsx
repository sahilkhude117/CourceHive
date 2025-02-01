'use client'

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { CourseSkeleton } from "@/components/SkeletonCard";
import CourceDetailsPage from "@/components/CourceDetailsPage";
import { TabProvider } from "@/contexts/TabContext";
import { useSession } from "next-auth/react";
import React from "react";

export interface Course {
  id: string;
  title: string;
  slug: string;
  description: string;
  instructor: string;
  thumbnailUrl: string;
  originalPrice: number;
  price: number;
  telegramLink: string;
  modules: Module[]
}

export interface Module {
    id: string;
    title: string;
    description: string;
    lessons: Lesson[]   
}

export interface Lesson {
    id: string,
    duration: number
}

export default function CoursePage() {
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { data: session, status } = useSession();

  const { coursename } = useParams();

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const courseResponse = await axios.get(`/api/course/${coursename}`);
        setCourse(courseResponse.data.course);
      } catch (error){
        setError("Error fetching course data");
      } finally {
        setLoading(false);
      }
    }
    const fetchUser = async () => {
      try {
        const userResponse = await axios.get('/api/user');
        setUserId(userResponse.data.userInfo.id);
      } catch(e) {
        setError("error fetching user id");
      }
    }
    if (coursename){
      fetchCourse();
    }
    if(session?.user){
      fetchUser();
    }
  },[coursename]);

  return (
    <TabProvider>
        <main className="min-h-screen bg-black text-white">
        <div className="flex-1 overflow-hidden max-w-md mx-auto pb-[72px]">
            {loading ? <CourseSkeleton/> :
                <CourceDetailsPage
                    course = {course}
                    userId = {userId}
                />
            }
        </div>
        </main>
    </TabProvider>
  );
};

