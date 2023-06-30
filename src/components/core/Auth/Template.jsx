import React from "react";
import { useSelector } from "react-redux";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import FrameImage from "../../../assets/Images/frame.png";
import Spinner from "../../common/Spinner";
const Tamplate = ({ title, description1, description2, image, formType }) => {
     const { loading } = useSelector((state) => state.auth);
     return (
          <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
               {loading ? (
                    <Spinner />
               ) : (
                    <div className="w-11/12 max-w-maxContent flex flex-col-reverse justify-between text-richblack-5 px-12 py-12 gap-y-12 md:flex-row md:gap-x-12">
                         <div className="w-11/12 mx-auto max-w-[450px] md:mx-0 space-y-5 ">
                              <h1 className="text-richblack-5 text-3xl font-semibold">
                                   {title}
                              </h1>
                              <p className="font-semibold">
                                   <span className="text-richblack-100 text-lg">
                                        {description1}
                                   </span>{" "}
                                   <span className="font-edu-sa text-base text-blue-100 italic">
                                        {description2}
                                   </span>
                              </p>
                              {formType === "signup" ? (
                                   <SignUpForm />
                              ) : (
                                   <LoginForm />
                              )}
                         </div>
                         <div className="relative w-11/12 mx-auto max-w-[450px] md:mx-0 ">
                              <img
                                   src={FrameImage}
                                   alt="Pattern"
                                   width={558}
                                   height={504}
                                   loading="lazy"
                              />

                              <img
                                   src={image}
                                   alt="student"
                                   width={558}
                                   height={504}
                                   loading="lazy"
                                   className="absolute -top-3 -left-3 z-10"
                              />
                         </div>
                    </div>
               )}
          </div>
     );
};

export default Tamplate;
