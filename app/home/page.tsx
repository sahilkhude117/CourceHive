import { useState } from 'react';

// Mock data for different categories
const mockCategories = [
  {
    title: 'Trending Now',
    courses: [
      {
        id: 1,
        title: 'AI Masterclass',
        thumbnail: '/images/thumbnails/cohort/cohort3.png',
        description: 'Learn cutting-edge AI techniques',
        price: 89.99
      },
      {
        id: 2,
        title: 'Python Pro',
        thumbnail: '/images/thumbnails/cohort/cohort3.png',
        description: 'From basics to advanced programming',
        price: 49.99
      },
    ]
  },
  {
    title: 'Web Development',
    courses: [
      {
        id: 3,
        title: 'React Native',
        thumbnail: '/images/thumbnails/cohort/cohort3.png',
        description: 'Build cross-platform apps',
        price: 59.99
      },
      {
        id: 4,
        title: 'Node.js Expert',
        thumbnail: '/images/thumbnails/cohort/cohort3.png',
        description: 'Master backend development',
        price: 39.99
      },
    ]
  }
];

const HeroSection = () => (
  <div className="relative h-64 bg-gradient-to-r from-blue-800 to-purple-900">
    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
      <h1 className="text-2xl font-bold text-white mb-2">
        Learn Tech Skills, Your Way
      </h1>
      <p className="text-gray-200 text-sm">
        Access premium courses at unprecedented prices
      </p>
    </div>
  </div>
);

const CategoryRow = ({ title, courses }:{title:any, courses:any}) => (
  <div className="mb-6">
    <h2 className="text-lg font-semibold mb-3 px-4">{title}</h2>
    <div className="flex overflow-x-auto pb-4 space-x-4 px-4">
      {courses.map((course: {id:number, thumbnail:string, title:string,description:string, price:string}) => (
        <div 
          key={course.id}
          className="flex-shrink-0 w-48 rounded-lg bg-white shadow-md overflow-hidden"
        >
          <img
            src={course.thumbnail}
            alt={course.title}
            className="w-full h-32 object-cover"
          />
          <div className="p-3">
            <h3 className="font-medium text-sm mb-1">{course.title}</h3>
            <p className="text-gray-500 text-xs line-clamp-2 mb-2">
              {course.description}
            </p>
            <div className="text-blue-500 font-bold text-sm">
              ${course.price}
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50 max-w-2xl mx-auto">
      <HeroSection />

      <div className="mt-4">
        {mockCategories.map(category => (
          <CategoryRow
            key={category.title}
            title={category.title}
            courses={category.courses}
          />
        ))}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="flex justify-around p-4 max-w-2xl mx-auto">
          <button className="text-blue-500 font-semibold px-4 py-2">Home</button>
          <button className="text-gray-400 px-4 py-2">Courses</button>
          <button className="text-gray-400 px-4 py-2">My Courses</button>
        </div>
      </div>
    </div>
  );
};

export default Home;