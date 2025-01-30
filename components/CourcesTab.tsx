import { useEffect, useState } from "react";
import CourseCard from "./CourceCard"
import axios from "axios";
import { CoursesSkeleton } from "./SkeletonCard";

export interface Cource {
    courseId: string;
    title: string;
    slug: string;
    description: string;
    thumbnailUrl: string;
    originalPrice: number;
    price: number;
}

export const CourcesTab = () => {
    const [cources, setCources] = useState<Cource []>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCources = async () => {
            try {
                const response = await axios.get('/api/courses');
                setCources(response.data.cources);
            } catch (error) {
                console.error('Error fetching cources:', error);
                setError("failed to fetch cources"); 
            } finally {
                setLoading(false);
            }
        };

        fetchCources();
    }, []);

    const filteredCourses = cources.filter(course => 
        course.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return <div className="min-h-screen bg-black p-4 max-w-2xl mx-auto mt-10">
        {/* Search Bar  */}
        <div className="mb-6">
            <input 
                type="text"
                placeholder="Search all courses..."
                className="w-full text-black p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
        </div>

        {/* Cources List  */}
        {loading ? <CoursesSkeleton/> : (
        <div>
        {filteredCourses.length === 0 ? (
            <div className="text-center mt-8">
                <p className="text-gray-500 mb-4">
                    No courses found matching your Search
                </p>
                <p className="text-gray-400 text-sm">
                    Check back later for new courses!
                </p>
          </div>
        ):(
            filteredCourses.map(course => (
                <CourseCard
                    title = {course.title}
                    thumbnail = {course.thumbnailUrl}
                    description = {course.description}
                    slug = {course.slug}
                    originalPrice = {course.originalPrice}
                    price = {course.price}
                />
            ))
        )}
        </div>
        )}
    </div>
}