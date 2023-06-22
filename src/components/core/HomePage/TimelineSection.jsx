import React from "react";
import logo1 from "../../../assets/TimeLineLogo/Logo1.svg";
import logo2 from "../../../assets/TimeLineLogo/Logo2.svg";
import logo3 from "../../../assets/TimeLineLogo/Logo3.svg";
import logo4 from "../../../assets/TimeLineLogo/Logo4.svg";
import TimelineImage from "../../../assets/Images/TimelineImage.png";
const timeline = [
     {
          logo: logo1,
          heading: "Leadership",
          description: "Fully committed to the success company",
     },
     {
          logo: logo2,
          heading: "Responsibility",
          description: "Students will always be our top priority",
     },
     {
          logo: logo3,
          heading: "Flexibility",
          description: "The ability to switch is an important skills",
     },
     {
          logo: logo4,
          heading: "Solve the problem",
          description: "Code your way to a solution",
     },
];
const TimelineSection = () => {
     return (
          <>
               <div className="w-11/12 max-w-maxContent flex flex-row max-md:flex-col max-lg:flex-col justify-evenly gap-5 my-10 max-md:my-0">
                    <div className="flex flex-col w-[35%] max-md:w-full max-lg:w-full">
                         {timeline.map((element, index) => {
                              return (
                                   <div className="flex max-md:w-full gap-5 items-center font-inter" key={index}>
                                        <div className="relative flex items-center justify-center h-[50px] w-[50px] shadow-lg shadow-blue-100/50 rounded-full my-6 ">
                                             <img src={element.logo} alt="" className="space-y-10" />

                                             <div className="absolute top-5 h-10 w-10 border-dotted border-black"></div>
                                        </div>
                                        <div>
                                             <h2 className="text-richblack-800 text-lg font-semibold">
                                                  {element.heading}
                                             </h2>
                                             <p className="text-base">{element.description}</p>
                                        </div>
                                   </div>
                              );
                         })}
                    </div>
                    <div className="w-[50%] max-md:w-full max-lg:w-full shadow-xl shadow-blue-200/50 relative">
                         <div className="">
                              <img
                                   src={TimelineImage}
                                   alt="TimelineImage"
                                   loading="lazy"
                                   className="shadow-white object-cover h-fit"
                              />
                         </div>
                         <div className="absolute max-md:scale-50 bg-caribbeangreen-700 flex flex-row text-white uppercase py-7
                            left-[50%] translate-x-[-50%] translate-y-[-50%]">
                              <div className="flex flex-row gap-5 items-center border-r border-caribbeangreen-300 px-7">
                                   <p className="text-3xl font-bold">10</p>
                                   <p className="text-caribbeangreen-300 text-sm">
                                        Years of Experience
                                   </p>
                              </div>

                              <div className="flex gap-5 items-center px-7">
                                   <p className="text-3xl font-bold">250</p>
                                   <p className="text-caribbeangreen-300 text-sm">TYpe of Courses</p>
                              </div>
                         </div>
                    </div>
               </div>
          </>
     );
};

export default TimelineSection;
