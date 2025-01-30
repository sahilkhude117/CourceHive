'use client'

import ArrowRight from "@/icons/ArrowRight";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel"
import CourceList from "./Cources";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { HomeSkeleton} from "./SkeletonCard";
import { useRouter } from "next/navigation";
import { useTab } from "@/contexts/TabContext";

interface Cource {
    id: string;
    thumbnailUrl: string;
    slug: string;
}

interface Category {
    id: string;
    name: string;
    slug: string;
    courses: Cource[];
}

const topCources = [
    {
        id: "1",
        thumbnailUrl: "/images/thumbnails/cohort/cohort3.png",
        slug: "cohort3",
    },
    {
        id: "2",
        thumbnailUrl: "/images/thumbnails/apnacollege/sigma3.png",
        slug: "sigma3",
    },
    {
        id: "3",
        thumbnailUrl: "/images/thumbnails/webveda/speak.png",
        slug: "communication",
    },
]

const HomeTab = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { activeTab, setActiveTab } = useTab();
    const router = useRouter();

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('/api/home');
                setCategories(response.data.categories);
            } catch (error) {
                console.error('Error fetching categories:', error);
                setError("failed to fetch categories"); 
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    return (
        <div className={`home-tab-con transition-all duration-300`}>

        <div className="flex flex-col items-center mt-10">
            <div className="cursor-pointer">
                <Carousel
                    plugins={[
                        Autoplay({
                          delay: 2000,
                        }),
                      ]}
                >
                    <CarouselContent>
                        <CarouselItem>
                            <Image
                                src="/images/thumbnails/apnacollege/sigma3.png"
                                alt="courceHive Logo"
                                width={500}
                                height={500}
                                onClick={() => router.push('/course/sigma3')}
                                className="rounded-lg"
                            />
                        </CarouselItem>
                        <CarouselItem>
                            <Image
                                src="/images/thumbnails/cohort/cohort3.png"
                                alt="courceHive Logo"
                                width={500}
                                height={500}
                                className="rounded-lg"
                                onClick={() => router.push('/course/cohort3')}
                            />
                        </CarouselItem>
                        <CarouselItem>
                            <Image
                                src="/images/thumbnails/webveda/speak.png"
                                alt="courceHive Logo"
                                width={500}
                                height={500}
                                className="rounded-lg"
                                onClick={() => router.push('/course/communication')}
                            />
                        </CarouselItem>
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
                
            </div>
            
            {/* <CourceHiveLogo size={2000} className="w-100 h-100 mb-4"/> */}
            
            <div onClick={() => setActiveTab('cources')} className="flex items-center gap-1 text-[#868686] rounded-full px-4 py-1.5 mt-2 cursor-pointer">
                <span>View All Cources</span>
                <ArrowRight className="w-6 h-6"/>
            </div>
        </div>

        {loading ? (
            <HomeSkeleton />
        ) : (
            <div>
                <CourceList 
                    categoryName={`Top Cources`} 
                    cources={topCources}
                    type="top_10"
                />
                {categories.map((category) => (
                    <CourceList 
                        key={category.id}   
                        categoryName={`${category.name} Cources`} 
                        cources={category.courses}
                    />
                ))}
            </div>
        )}
        </div>
    )
}

export default HomeTab;