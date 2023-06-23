import React, { useState } from 'react'
import { HighlightText } from './HighlightText'
import { HomePageExplore } from '../../../data/homepage-explore'
import CourseCard from './CourseCard'
const ExploreMore = () => {
     const tabTimes = [
          'Free',
          'New to coding',
          'Most popular',
          'Skills paths',
          'Career paths'
     ]
     const [currentTab, setCurrentTab] = useState(tabTimes[0]);
     const [courses, setCourses] = useState(HomePageExplore[0].courses)
     const [currentCard, setCurrentCard] = useState(HomePageExplore[0].courses[0].heading);


     const setMyCard = (value) => {
          setCurrentTab(value);
          const result = HomePageExplore.filter((course) => course.tag === value)
          setCourses(result[0].courses);
          setCurrentCard(result[0].courses[0].heading)
     }

     return (
          <>
               <div className='flex flex-col max-md:items-start items-center gap-3 lg:flex-wrap'>
                    <h1 className='font-semibold text-4xl'>
                         Unlock the <HighlightText text={'Power of Code'} />
                    </h1>
                    <p className='text-richblack-300'>
                         Learn to Build Anything You Can Imagine
                    </p>
               </div>
               {/* Tab Section */}
               <nav className=' hidden lg:flex gap-1 mt-10 mx-auto w-max bg-richblack-800 text-richblack-200 p-2 px-5 rounded-full font-medium drop-shadow-[0_1.5px_rgba(255,255,255,0.25)]'>
                    {
                         tabTimes.map((element, index) => {
                              return (
                                   <div
                                        className={`${currentTab === element ? 'bg-richblack-900' : 'text-richblack-200'} text-base flex flex-row px-7 py-2 rounded-3xl transition-all duration-100 cursor-pointer hover:bg-richblack-900 hover:text-richblack-5`} key={index} onClick={() => setMyCard(element)}
                                   >
                                        {element}
                                   </div>

                              );
                         })
                    }
               </nav>
               <div className="hidden lg:block lg:h-[200px]"></div>
               <div className="lg:absolute gap-10  justify-center lg:gap-0 flex lg:justify-between flex-wrap w-full translate-y-[120px] lg:bottom-[0] lg:left-[50%] lg:translate-x-[-50%] lg:translate-y-[50%] text-black lg:mb-0 mb-7 lg:px-0 px-3">
                    {courses.map((ele, index) => {
                         return (
                              <CourseCard
                                   key={index}
                                   cardData={ele}
                                   currentCard={currentCard}
                                   setCurrentCard={setCurrentCard}
                              />
                         );
                    })}

               </div>

          </>
     )
}

export default ExploreMore