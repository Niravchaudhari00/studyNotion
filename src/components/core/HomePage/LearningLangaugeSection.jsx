import React from 'react'
import { HighlightText } from './HighlightText'
import know_your_progress from "../../../assets/Images/Know_your_progress.png"
import compare_with_others from "../../../assets/Images/Compare_with_others.png"
import plan_your_lesson from "../../../assets/Images/Plan_your_lessons.png"
import CTAButton from "../HomePage/Button"

const LearningLangaugeSection = () => {
     return (
          <>
               <div className="flex flex-col gap-3 items-center mt-32 my-16">
                    <h1 className='max-md:text-left font-semibold text-center text-4xl'>Your swiss knife for <HighlightText text={'learning any language'} /> </h1>
                    <div className='w-[70%] max-md:w-full'> 
                         <p className='text-center max-md:text-start'>Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.</p>
                   </div>
               </div>
               <div className='flex max-md:flex-col max-md:items-center'> 
                    <img
                         src={know_your_progress}
                         alt="KnowYourProgressImage"
                         className='object-contain -mr-28  max-md:-mr-1'
                         loading='lazy'
                         
                    />
                    <img
                         src={compare_with_others}
                         alt="Compare with other"
                         className='object-contain max-md:-mt-16'
                         loading='lazy'
                    />
                    <img
                         src={plan_your_lesson}
                         alt="plan your lesson"
                         loading='lazy'
                         className='object-contain -ml-36 max-md:ml-16 max-md:-mt-28'
                    />

               </div>

               <div className='my-5 mb-28'>
                    <CTAButton active={true} linkto={'/signup'}>
                         Learn More
                    </CTAButton>
               </div>
          </>
     )
}

export default LearningLangaugeSection