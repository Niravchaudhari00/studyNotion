import React from 'react'
import CTAButton from '../HomePage/Button'
import { FaArrowRight } from 'react-icons/fa'
import { TypeAnimation } from 'react-type-animation'
const CodeBlocks = ({ position, heading, subheading, ctabtn1, ctabtn2, codeblock, backgroundGradie, codeColor }) => {
     return (
          <div className={`flex ${position} max-md:flex-col max-lg:flex-col  gap-28 my-12 max-md:gap-10`}>
               <div className='w-[45%] flex flex-col justify-between max-md:w-full max-lg:w-full font-inter py-2 max-md:gap-5 max-lg:gap-5'>
                    <div className='space-y-3'>
                         <p className='text-4xl font-semibold'>{heading}</p>
                         <p className='text-richblack-300'>{subheading}</p>
                    </div>
                    {/* btns */}
                    <div className='flex max-md:gap-5 gap-7'>
                         <CTAButton active={ctabtn1.active} linkto={ctabtn1.linkto}>
                              <div className='flex items-center gap-2'>
                                   <span>{ctabtn1.btnText}</span>
                                   <FaArrowRight />
                              </div>
                         </CTAButton>

                         <CTAButton active={ctabtn2.active} linkto={ctabtn2.linkto}>
                              <div className='flex'>
                                   <span>{ctabtn2.btnText}</span>
                              </div>
                         </CTAButton>
                    </div>
               </div>
               <div className='relative w-[50%] max-md:w-full max-lg:w-full p-2 shadow-lg'>
                    <div className={`absolute top-10 left-28 h-[200px] w-[150px] rounded-[96px] blur-[60px] ${backgroundGradie}` }></div>
                    <div className='backdrop-blur-2xl bg-richblack-800/30 p-2 flex x'>
                         <div className = "text-center flex flex-col w-[10%] font-inter font-bold text-richblack-400">
                              <p>1</p>
                              <p>2</p>
                              <p>3</p>
                              <p>4</p>
                              <p>5</p>
                              <p>6</p>
                              <p>7</p>
                              <p>8</p>
                              <p>9</p>
                              <p>10</p>
                              <p>11</p>
                              <p>12</p>
                              <p>13</p>
                              <p>14</p>
                              
                         </div>
                         <div className={`${codeColor} flex flex-col font-mono font-bold w-[90%] max-lg:overflow-x-hidden`}>
                              <TypeAnimation
                                   sequence={[codeblock, 1000, '']}
                                   repeat={Infinity}
                                   cursor={true}
                                   style={
                                        {
                                             whiteSpace: "pre-line",
                                             display: "block",
                                        }
                                   }
                                   omitDeletionAnimation={true}
                              />
                         </div>
                    </div>
                    
               </div>
          </div>
     )
}

export default CodeBlocks