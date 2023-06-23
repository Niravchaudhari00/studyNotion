import React from 'react'
import Instructor from "../../../assets/Images/Instructor.png"
import { HighlightText } from './HighlightText'
import CTAButton from "../HomePage/Button"
import { FaArrowRight } from 'react-icons/fa'
const InstructorSection = () => {
     return (
          <>
               <div className='flex max-md:flex-col-reverse max-md:gap-10 max-lg:flex-col justify-around my-10'>
                    {/* Instructor Image */}
                    <div className='w-[45%] flex justify-center max-md:w-full max-lg:w-full'>
                         <img
                              src={Instructor}
                              alt="Instructor"
                              loading='lazy'
                              className='box-shadow box-shadow-none'

                         />
                    </div>
                    {/* Description */}
                    <div className="flex flex-col items-start max-md:items-center max-lg:items-center gap-2 justify-center w-[30%] max-md:w-full max-lg:w-full">
                         <h2 className="max-lg:text-center text-4xl font-bold max-lg:mt-5">
                              Become an <HighlightText text={'instructor'} />
                         </h2>
                         <p className='max-lg:text-center'>
                              Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.
                         </p>
                         <div className='mt-16 max-md:mt-5'>
                              <CTAButton active={true} linkto={'/signup'}>
                                   <div className='flex justify-center items-center gap-3'>
                                        Start Teaching Today
                                        <FaArrowRight/>
                                   </div>
                              </CTAButton>
                         </div>
                    </div>

               </div>
          </>
     )
}

export default InstructorSection