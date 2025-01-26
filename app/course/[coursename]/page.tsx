"use client"
import CourceDetailsPage from "@/components/CourceDetailsPage";
import { CourseSkeleton } from "@/components/SkeletonCard";
import { TabProvider } from "@/contexts/TabContext";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Course {
    id: string;
    title: string;
    slug: string;
    description: string;
    instructor: string;
    thumbnailUrl: string;
    duration: string;
    originalPrice: number;
    price: number;
    telegramLink: string;
    category: {
        name: string;
    }
}

export default function Cources() {
    const [course, setCourse] = useState<Course | null>(null);
    const [userId, setUserId] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const { coursename } = useParams();

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const courseResponse = await axios.get(`/api/course/${coursename}`);
                const userResponse = await axios.get(`/api/user`);
                setUserId(userResponse.data.userInfo.id);
                setCourse(courseResponse.data.course);
            } catch (error) {
                setError("Error fetching course data");
            } finally {
                setLoading(false);
            }
        }
        if (coursename) {
            fetchCourse();
        }
    }, [coursename]);

    return <TabProvider>
        <main className="min-h-screen bg-black text-white">
            <div className="flex-1 overflow-hidden max-w-md mx-auto pb-[72px]">
                {loading ? <CourseSkeleton/> :
                    <CourceDetailsPage
                        courseId={course?.id ?? ""}
                        title={course?.title ?? ""}
                        userId={userId ?? ""}
                        instructor={course?.instructor ?? ""}
                        thumbnail={course?.thumbnailUrl ?? ""}
                        originalPrice={course?.originalPrice ?? 0}
                        price={course?.price ?? 0}
                        category={course?.category?.name ?? ""}
                        description={course?.description ?? ""}
                        telegramLink={course?.telegramLink ?? ""}   
                    />
                }
            </div>
        </main>
    </TabProvider>
}