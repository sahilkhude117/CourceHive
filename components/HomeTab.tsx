'use client'

import ArrowRight from "@/icons/ArrowRight";
import { courcehiveLogo } from "@/images";
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

const CodingCources = [
  { id: '1', imageUrl: 'https://www.filmiforest.com/img/movies/524/pushpa-telugu-movie-photo-5.jpg' },
  { id: '2', imageUrl: 'https://www.filmiforest.com/img/movies/524/pushpa-telugu-movie-photo-5.jpg' },
  { id: '3', imageUrl: 'https://www.filmiforest.com/img/movies/524/pushpa-telugu-movie-photo-5.jpg' },
  { id: '4', imageUrl: 'https://www.filmiforest.com/img/movies/524/pushpa-telugu-movie-photo-5.jpg' },
  { id: '5', imageUrl: 'https://www.filmiforest.com/img/movies/524/pushpa-telugu-movie-photo-5.jpg' },
  { id: '5', imageUrl: 'https://www.filmiforest.com/img/movies/524/pushpa-telugu-movie-photo-5.jpg' },
]

const WarikooCources = [
  { id: '1', imageUrl: 'https://www.filmiforest.com/img/movies/524/pushpa-telugu-movie-photo-5.jpg' },
  { id: '2', imageUrl: 'https://www.filmiforest.com/img/movies/524/pushpa-telugu-movie-photo-5.jpg' },
  { id: '3', imageUrl: 'https://www.filmiforest.com/img/movies/524/pushpa-telugu-movie-photo-5.jpg' },
  { id: '4', imageUrl: 'https://www.filmiforest.com/img/movies/524/pushpa-telugu-movie-photo-5.jpg' },
]

const HomeTab = () => {
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
                                src={courcehiveLogo}
                                alt="courceHive Logo"
                                width={500}
                                height={500}
                            />
                        </CarouselItem>
                        <CarouselItem>
                            <Image
                                src={courcehiveLogo}
                                alt="courceHive Logo"
                                width={500}
                                height={500}
                            />
                        </CarouselItem>
                        <CarouselItem>
                            <Image
                                src={courcehiveLogo}
                                alt="courceHive Logo"
                                width={500}
                                height={500}
                            />
                        </CarouselItem>
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            </div>
            
            {/* <CourceHiveLogo size={2000} className="w-100 h-100 mb-4"/> */}
            
            <div className="flex items-center gap-1 text-[#868686] rounded-full px-4 py-1.5 mt-2 cursor-pointer">
                <span>View All Cources</span>
                <ArrowRight className="w-6 h-6"/>
            </div>
        </div>
    
        <CourceList rowTitle="Top Coding Cources" cources={CodingCources} type="top_10"/>
        <CourceList rowTitle="Ankur Warikoo Cources" cources={WarikooCources}/>

        </div>
    )
}

export default HomeTab;