import React, { lazy } from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import { HighlightText } from "../components/core/HomePage/HighlightText";
import CTAButton from "../components/core/HomePage/Button";
import Banner from "../assets/Images/banner.mp4";
import CodeBlocks from "../components/core/HomePage/CodeBlocks"
import TimelineSection from "../components/core/HomePage/TimelineSection";
import LearningLangaugeSection from "../components/core/HomePage/LearningLangaugeSection";
import InstructorSection from "../components/core/HomePage/InstructorSection";
// import Footer from "../components/comman/Footer"
import ExploreMore from "../components/core/HomePage/ExploreMore";
const Home = () => {
     return (
          <>
               {/* Section 1  */}
               <section className="relative mx-auto flex flex-col w-11/12 max-w-maxContent items-center justify-between text-richblack-5">

                    <Link to={"/signup"}>
                         <div className="group mx-auto mt-16 p-1 rounded-full bg-richblack-800 font-bold text-richblack-200 hover:scale-95 w-fit transition-all duration-200 shadow-sm shadow-blue-50/100">
                              <div className="flex gap-2 items-center px-5 py-[5px] rounded-full transition-all duration-200 group-hover:bg-richblack-900">
                                   <p className="">Become an Instructor</p>
                                   <FaArrowRight />
                              </div>
                         </div>
                    </Link>

                    <div className="max-md:text-left  font-semibold text-center text-4xl mt-5">
                         Empower Your Future with <HighlightText text={"Coding Skills"} />
                    </div>

                    <div className="max-md:ml-0 max-md:w-full w-[70%] m-auto">
                         <p className=" max-md:text-left text-center text-richblack-300 my-5">
                              With our online coding courses, you can learn at your own pace, from
                              anywhere in the world, and get access to a wealth of resources,
                              including hands-on projects, quizzes, and personalized feedback from
                              instructors.
                         </p>
                    </div>
                    {/* CTA Button */}
                    <div className=" flex flex-row max-w-maxContentTab m-auto gap-7 justify-center">
                         <CTAButton active={true} linkto={"/signup"}>
                              Learn More
                         </CTAButton>

                         <CTAButton active={false} linkto={"/login"}>
                              Book a Demo
                         </CTAButton>
                    </div>
                    {/* Banner */}
                    <div className="w-11/12 max-md:w-full my-12 shadow-xl shadow-blue-100/50 drop-shadow-md rounded-lg">
                         <video
                              autoPlay
                              muted
                              loop
                              className="rounded-lg"
                              onLoad={lazy}
                         >
                              <source src={Banner} type="video/mp4" />
                         </video>
                    </div>
                    {/* Code Block */}
                    <div className="w-11/12 my-5 mb-20">
                         <div>
                              <CodeBlocks
                                   position={'lg:flex-row'}
                                   heading={
                                        <div>
                                             Unlock your <HighlightText text={`coding potential`} /> with our online courses
                                        </div>
                                   }

                                   subheading={`Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you.`}

                                   ctabtn1={
                                        {
                                             btnText: `Try it Yourself`,
                                             linkto: `/signup`,
                                             active: true
                                        }
                                   }

                                   ctabtn2={
                                        {
                                             btnText: `Learn More`,
                                             linkto: `/login`,
                                             active: false
                                        }
                                   }
                                   backgroundGradie={'codebox1'}
                                   codeblock={`<!DOCTYPE html>\n<html lang="en">\n<head>\n<meta charset="UTF-8">\n<meta name="viewport" content="width=device-width, initial-scale=1.0">\n<title>StudyNation</title>\n<link rel="stylesheet" href="style.css">\n</head>\n<body>\n<h1>Welcome to StudyNation</h1>\n<p>With our online coding courses</p>\n</body>\n</html>`}
                                   codeColor={"text-yellow-50"}
                              />
                         </div>
                         <div className="mt-40 max-md:mt-20">
                              <CodeBlocks
                                   position={'lg:flex-row-reverse'}
                                   heading={
                                        <div>
                                             Start <HighlightText text={`coding
                                   in seconds`} />
                                        </div>
                                   }

                                   subheading={`Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson.`}

                                   ctabtn1={
                                        {
                                             btnText: `Continue Lesson`,
                                             linkto: `/signup`,
                                             active: true
                                        }
                                   }

                                   ctabtn2={
                                        {
                                             btnText: `Learn More`,
                                             linkto: `/login`,
                                             active: false
                                        }
                                   }
                                   backgroundGradie={'codebox2'}
                                   codeblock={`function isPelindrome(str) {\nlet s = str + "";\nif (str.split("").reverse().join("") == s) {\nconsole.log("is Pelindrome : " + str);\n} else {\nconsole.log("is Not Pelindrome : " + str);\n}\n}
                                        isPelindrome("nurses");`}
                                   codeColor={"text-blue-25"}
                              />
                         </div>
                    </div>

                    <div className="my-10 w-11/12 max-w-maxContent h-[300px] border border-yellow-5">
                         <ExploreMore />
                    </div>

               </section>

               {/* Section 2 */}
               <section className="bg-pure-greys-5 text-richblack-700 ">
                    <div className="homepage_bg h-[310px]" >
                         <div
                              className="w-11/12 h-full max-w-maxContent m-auto flex flex-col items-center justify-between">
                              <div className="flex max-md:flex-col gap-7 m-auto text-white">
                                   <CTAButton active={true} linkto={'/signup'} >
                                        <div className="flex items-center gap-2">
                                             Explore Full Catalog
                                             <FaArrowRight />
                                        </div>
                                   </CTAButton>
                                   <CTAButton active={false} linkto={'/login'} >
                                        Learn More
                                   </CTAButton>
                              </div>
                         </div>
                    </div>

                    <div className="mx-auto flex flex-col w-11/12 max-w-maxContent items-center justify-between">
                         <div className="w-11/12 max-w-maxContent flex flex-row justify-between max-md:flex-col max-lg:flex-col max-lg:w-full max-md:gap-5 max-lg:gap-5 my-10 gap-20">
                              <div className=" max-md:w-full max-lg:w-full">
                                   <h2 className="text-4xl font-bold">
                                        Get the skills you need for a <HighlightText text={'job that is in demand.'} />
                                   </h2>
                              </div>
                              <div className="space-y-4 max-lg:w-full">
                                   <p>The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.</p>
                                   <div className="w-[30%] max-md:w-full">
                                        <CTAButton active={true} linkto={'/signup'}>
                                             Learn More
                                        </CTAButton>
                                   </div>
                              </div>
                         </div>

                         <TimelineSection />
                         <LearningLangaugeSection />
                    </div>
               </section>

               {/* Section 3 */}
               <section className="w-11/12 max-w-maxContent m-auto flex flex-col items-center justify-between bg-richblack-900 text-richblack-5 my-10">

                    <InstructorSection />

                    <div className="my-10">
                         <h1 className="text-4xl font-semibold">Review <HighlightText text={' from other learners'} /> </h1>
                    </div>
               </section>

               {/* Footer */}
               {/* <footer>
                    <Footer />
               </footer> */}
          </>
     );
};

export default Home;
