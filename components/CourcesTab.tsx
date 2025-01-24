import { useEffect, useState } from "react";
import CourseCard from "./CourceCard"
import axios from "axios";
import { CoursesSkeleton } from "./SkeletonCard";

interface Cource {
    id: string;
    title: string;
    slug: string;
    description: string;
    instructor: string;
    thumbnailUrl: string;
    duration: string;
    originalPrice: number;
    price: number;
    category: {
        name: string;
    }
}

export const CourcesTab = () => {
    const [cources, setCources] = useState<Cource []>([]);
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

    return <div className="pt-20">
        {loading ? <CoursesSkeleton /> : cources.map((cource) => (
            <CourseCard 
                key = {cource.id}
                title = {cource.title} 
                instructor = {cource.instructor}
                thumbnail = {cource.thumbnailUrl}
                duration = {cource.duration}
                originalPrice={cource.originalPrice}
                price = {cource.price}
                category = {cource.category.name}
                slug = {cource.slug}
            />
        ))}
    </div>
}