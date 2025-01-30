'use client'
import { Search } from 'lucide-react';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { CourseSkeleton, CoursesSkeleton } from './SkeletonCard';

interface MyCourse {
  id: string;
  purchasedAt: Date | string; // Depending on your date handling
  course: {
    title: string;
    thumbnailUrl: string;
    telegramLink: string;
    modules: CourseModule[];
  };
}

interface CourseModule {
  lessons: CourseLesson[];
}

interface CourseLesson {
  id: string;
  progress: Progress[];
}

interface Progress {
  completed: boolean;
}

const calculateCourseProgress = (myCourse: MyCourse): number => {
  const allLessons = myCourse.course.modules.flatMap(module => module.lessons);
  if(allLessons.length === 0) return 0;

  const completedCount = allLessons.filter(lesson => 
    lesson.progress.length > 0 && lesson.progress[0].completed
  ).length;

  return Math.round((completedCount / allLessons.length)*100);
};

const CourseCard = ({
    purchasedAt,
    title,
    thumbnailUrl,
    telegramLink,
    progress,
}:{
    purchasedAt : any,
    title: string,
    thumbnailUrl : string,
    telegramLink : string,
    progress : number
}) => {
  return (
    <div className="bg-zinc-800 rounded-lg shadow-md p-2 mb-4">
      <div className="flex items-start">
        <img 
          src={thumbnailUrl}
          alt={title}
          className="w-24 h-24 rounded-lg object-cover mr-4"
        />
        <div className="flex-1">
          <h3 className="text-base text-white font-semibold mb-1">{title}</h3>
          <p className="text-gray-500 text-sm mb-2">
            Purchased: {new Date(purchasedAt).toLocaleDateString()}
          </p>
          <div className="relative pt-1">
            <div className="flex mb-2 items-center justify-between">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-500 rounded-full h-2"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
            <span className="text-xs font-semibold text-blue-500">
              {progress}% Completed
            </span>
          </div>
          <a
            href={telegramLink}
            className="mt-2 inline-block bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-600"
            target="_blank"
            rel="noopener noreferrer"
          >
            {progress === 0 ? "Start Learning" : "Continue Learning" }
          </a>
        </div>
      </div>
    </div>
  );
};

const MyCourses = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [myCourses, setMyCourses] = useState<MyCourse []>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCources = async () => {
        try {
            const response = await axios.get<{myCourses: MyCourse[]}>('/api/mycourses');
            setMyCourses(response.data.myCourses);
        } catch (error) {
            console.error('Error fetching cources:', error);
            setError("failed to fetch cources"); 
        } finally {
            setLoading(false);
        }
    };

    fetchCources();
   }, []);


  
  const filteredCourses = myCourses.filter(myCourse =>
    myCourse.course.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-black-500 p-4 max-w-2xl mx-auto mt-10">
      {/* Search Bar */}
      <div className="mb-6 bg-grey-500">
        <input
          type="text"
          placeholder="Search your courses..."
          className="w-full p-3 text-black rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Courses List */}
      {loading ? <CoursesSkeleton/> : (
        <div>
      {filteredCourses.length === 0 ? (
        <div className="text-center mt-8">
          <p className="text-gray-500 mb-4">No courses found matching your search</p>
          <p className="text-gray-400 text-sm">
            Haven't purchased any courses yet? Check out our Courses tab!
          </p>
        </div>
      ) : (
        filteredCourses.map(myCourse => (
          <CourseCard 
            key = {myCourse.id}
            purchasedAt = {myCourse.purchasedAt.toString()}
            title = {myCourse.course.title}
            thumbnailUrl = {myCourse.course.thumbnailUrl}
            telegramLink = {myCourse.course.telegramLink}
            progress={calculateCourseProgress(myCourse)}
          />
        ))
      )}
      </div>)
    }
    </div>
  );
};

export default MyCourses;