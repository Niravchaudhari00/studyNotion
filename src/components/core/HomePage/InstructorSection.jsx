import React from 'react'
import Instructor from "../../../assets/Images/Instructor.png"
import { HighlightText } from './HighlightText'
import CTAButton from "../HomePage/Button"
const InstructorSection = () => {
     return (
          <>
               <div className='flex max-md:flex-col max-md:gap-1 max-lg:flex-col justify-around border border-white my-10'>
                    {/* Instructor Image */}
                    <div className='w-[45%] flex justify-center max-md:w-full max-lg:w-full border border-r-yellow-50 '>
                         <img
                              src={Instructor}
                              alt="Instructor Image"
                              loading='lazy'
                              className='box-shadow box-shadow-none'

                         />
                    </div>
                    {/* Description */}
                    <div className="flex flex-col items-start max-md:items-center max-lg:items-center gap-2 justify-center w-[30%] max-md:w-full max-lg:w-full">
                         <h2 className="text-4xl font-bold">
                              Become an <HighlightText text={'instructor'} />
                         </h2>
                         <p>
                              Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.
                         </p>
                         <div className='mt-16 max-md:mt-5'>
                              <CTAButton active={true} linkto={'/signup'}>
                                   Start Teaching Today
                              </CTAButton>
                         </div>
                    </div>

               </div>
          </>
     )
}

export default InstructorSection