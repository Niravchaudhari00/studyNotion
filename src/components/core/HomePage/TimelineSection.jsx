import React from 'react'
import logo1 from '../../../assets/TimeLineLogo/Logo1.svg'
import logo2 from '../../../assets/TimeLineLogo/Logo2.svg'
import logo3 from '../../../assets/TimeLineLogo/Logo3.svg'
import logo4 from '../../../assets/TimeLineLogo/Logo4.svg'
const timeline = [
     {
          logo: logo1,
          heading: "Leadership",
          description: "Fully committed to the success company"
     },
     {
          logo: logo2,
          heading: "Responsibility",
          description: "Students will always be our top priority"
     },
     {
          logo: logo3,
          heading: "Flexibility",
          description: "The ability to switch is an important skills"
     },
     {
          logo: logo4,
          heading: "Solve the problem",
          description: "Code your way to a solution"
     }
]
const TimelineSection = () => {
     return (
          <>
               <div className='flex flex-row justify-evenly border border-black'>
                    <div className='flex flex-col w-[35%]'>
                         {
                              timeline.map((element, index) => {
                                   return (
                                        <div className='flex gap-5 items-center font-inter' key={index}>
                                             <div className='relative flex items-center justify-center h-[50px] w-[50px] shadow-lg shadow-blue-100/50 rounded-full my-6 '>
                                                  <img src={element.logo} alt="" className='space-y-10' />
                                                  
                                                  <div className='absolute top-5 h-10 w-10 border-dotted border-black'></div>
                                             </div>
                                             <div>
                                                  <h2 className='text-richblack-800 text-lg font-semibold'>{element.heading}</h2>
                                                  <p className='text-base'>{element.description}</p>
                                             </div>
                                        </div>
                                   )
                              })
                         }
                    </div>
                    <div className='w-[45%]'>
                         <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias consequatur, ipsum excepturi deleniti ab quisquam iusto maiores magnam sapiente doloremque quo ut dicta consequuntur deserunt, nemo delectus itaque distinctio perspiciatis.</p>
                    </div>
               </div>
          </>
     )
}

export default TimelineSection