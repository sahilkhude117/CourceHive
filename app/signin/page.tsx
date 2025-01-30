'use client'
import { useState } from 'react';

// Mock purchased courses data
const mockPurchasedCourses = [
  {
    id: 1,
    title: 'Web Development Bootcamp',
    purchaseDate: '2024-03-15',
    thumbnail: '/images/thumbnails/cohort/cohort3.png',
    progress: 65,
    telegramLink: 'https://t.me/course1'
  },
  {
    id: 2,
    title: 'Mobile App Design',
    purchaseDate: '2024-02-28',
    thumbnail: '/images/thumbnails/cohort/cohort3.png',
    progress: 0,
    telegramLink: 'https://t.me/course2'
  },
];

const CourseCard = ({ course }:{course : any}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <div className="flex items-start">
        <img 
          src={course.thumbnail}
          alt={course.title}
          className="w-24 h-24 rounded-lg object-cover mr-4"
        />
        <div className="flex-1">
          <h3 className="text-lg font-semibold mb-1">{course.title}</h3>
          <p className="text-gray-500 text-sm mb-2">
            Purchased: {new Date(course.purchaseDate).toLocaleDateString()}
          </p>
          <div className="relative pt-1">
            <div className="flex mb-2 items-center justify-between">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-500 rounded-full h-2"
                  style={{ width: `${course.progress}%` }}
                ></div>
              </div>
            </div>
            <span className="text-xs font-semibold text-blue-500">
              {course.progress}% Completed
            </span>
          </div>
          <a
            href={course.telegramLink}
            className="mt-2 inline-block bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-600"
            target="_blank"
            rel="noopener noreferrer"
          >
            {course.progress === 0 ? "Start" : "Continue Learning" }
          </a>
        </div>
      </div>
    </div>
  );
};

const MyCourses = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredCourses = mockPurchasedCourses.filter(course =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4 max-w-2xl mx-auto">
      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search your courses..."
          className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Courses List */}
      {filteredCourses.length === 0 ? (
        <div className="text-center mt-8">
          <p className="text-gray-500 mb-4">No courses found matching your search</p>
          <p className="text-gray-400 text-sm">
            Haven't purchased any courses yet? Check out our Courses tab!
          </p>
        </div>
      ) : (
        filteredCourses.map(course => (
          <CourseCard key={course.id} course={course} />
        ))
      )}

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="flex justify-around p-4 max-w-2xl mx-auto">
          <button className="text-gray-400 px-4 py-2">Home</button>
          <button className="text-gray-400 px-4 py-2">Courses</button>
          <button className="text-blue-500 font-semibold px-4 py-2">
            My Courses
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyCourses;