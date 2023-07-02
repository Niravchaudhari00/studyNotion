import React from "react";
import CTAButton from "../../core/HomePage/Button";
import { HighlightText } from "../HomePage/HighlightText";
const LearMoreArray = [
     {
          order: -1,
          heading: "World-Class Learning for",
          highlightText: "Anyone, Anywhere",
          description:
               "Studynotion partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.",
          BtnText: "Learn More",
          BtnLink: "/",
     },
     {
          order: 1,
          heading: "Curriculum Based on Industry Needs",
          description:
               "Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs.",
     },
     {
          order: 2,
          heading: "Our Learning Methods",
          description:
               "Studynotion partners with more than 275+ leading universities and companies to bring",
     },
     {
          order: 3,
          heading: "Certification",
          description:
               "Studynotion partners with more than 275+ leading universities and companies to bring",
     },
     {
          order: 4,
          heading: `Rating "Auto-grading"`,
          description:
               "Studynotion partners with more than 275+ leading universities and companies to bring",
     },
     {
          order: 5,
          heading: "Ready to Work",
          description:
               "Studynotion partners with more than 275+ leading universities and companies to bring",
     },
];
const LearnMoreGrid = () => {
     return (
          <div className="grid m-auto w-[350px] xl:w-fit grid-cols-1 xl:grid-cols-4 mb-12 select-none">
               {LearMoreArray.map((cart, index) => {
                    return (
                         <div
                              key={index}
                              className={`${
                                   index === 0 && "xl:col-span-2 xl:h-[294px]"
                              } ${
                                   cart.order % 2 === 1
                                        ? "bg-richblack-700 h-[294px] hover:bg-yellow-50 hover:scale-105 transition-all duration-200 hover:text-richblack-900"
                                        : cart.order % 2 === 0
                                        ? "bg-richblack-800 h-[294px]  hover:bg-blue-50 hover:scale-105 transition-all duration-200 hover:text-richblack-900"
                                        : "bg-transparent"
                              } ${cart.order === 3 && "xl:col-start-2"}`}
                         >
                              {cart.order < 0 ? (
                                   <div className="xl:w-[90%] flex flex-col gap-3 pb-10 xl:pb-0">
                                        <div className="text-4xl font-semibold ">
                                             {cart.heading}{" "}
                                             <HighlightText
                                                  text={cart.highlightText}
                                             />
                                        </div>
                                        <p className="text-richblack-300 font-medium">
                                             {cart.description}
                                        </p>

                                        <div className="w-fit mt-2">
                                             <CTAButton
                                                  active={true}
                                                  linkto={cart.BtnLink}
                                             >
                                                  {cart.BtnText}
                                             </CTAButton>
                                        </div>
                                   </div>
                              ) : (
                                   <div className="p-8 flex flex-col gap-8 select-none ">
                                        <h1 className="text-xl font-semibold font-inter">{cart.heading}</h1>

                                        <p className="font-medium font-inter">
                                             {cart.description}
                                        </p>
                                   </div>
                              )}
                         </div>
                    );
               })}
          </div>
     );
};

export default LearnMoreGrid;
