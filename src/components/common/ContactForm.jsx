import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import countryCode from "../../data/countrycode.json";
import { apiConnector } from "../../service/apiConnector";
import { contactUs } from "../../service/apis";
import { toast } from "react-hot-toast";
const ContactForm = ({ heading, para }) => {
     const [loading, setLoading] = useState(false);
     const {
          register,
          handleSubmit,
          reset,
          formState: { errors, isSubmitSuccessful },
     } = useForm();
     const submitContactForm = async (data) => {
          const toastId = toast.loading("Loading...");
          setLoading(true);
          try {
               const response = await apiConnector(
                    "POST",
                    contactUs.CONTACTUS_API,
                    data
               );
               console.log("contact form data ->", response);
               toast.success("Sent mail successfully");
          } catch (error) {}
          setLoading(false);
          toast.dismiss(toastId);
     };
     useEffect(() => {
          if (isSubmitSuccessful) {
               reset({
                    firstName: "",
                    lastName: "",
                    email: "",
                    mobileNo: "",
                    message: "",
               });
          }
     }, [reset, isSubmitSuccessful]);

     return (
          <div className="mb-10 flex flex-col">
               <header className="my-10 flex flex-col items-center gap-3 text-richblack-5 ">
                    <h1 className="text-3xl lg:text-center font-semibold">
                         {heading}
                    </h1>
                    <p>{para}</p>
               </header>
               <form
                    onSubmit={handleSubmit(submitContactForm)}
                    className="flex flex-col gap-3 p-2"
               >
                    <div className="flex gap-2 justify-between">
                         <div className="flex flex-col w-[50%]">
                              <label
                                   htmlFor="firstName"
                                   className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5"
                              >
                                   First Name{" "}
                                   <sup className="text-pink-200">*</sup>
                              </label>
                              <input
                                   id="firstName"
                                   name="firstName"
                                   type="text"
                                   placeholder="Enter first name"
                                   style={{
                                        boxShadow: `inset 0px -1px 0px rgba(255, 255, 255, 0.18)`,
                                   }}
                                   className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5 -z-0"
                                   {...register("firstName", {
                                        required: true,
                                   })}
                              />
                              {errors.firstName && (
                                   <span className=" text-yellow-50 mt-1 mr-1">
                                        Please enter your first name
                                   </span>
                              )}
                         </div>
                         <div className="flex flex-col w-[50%]">
                              <label
                                   htmlFor="lastName"
                                   className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5"
                              >
                                   Last Name{" "}
                              </label>
                              <input
                                   id="lastName"
                                   name="lastName"
                                   type="text"
                                   placeholder="Enter last name"
                                   style={{
                                        boxShadow: `inset 0px -1px 0px rgba(255, 255, 255, 0.18)`,
                                   }}
                                   className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5 -z-0"
                                   {...register("lastName")}
                              />
                         </div>
                    </div>
                    <div className="">
                         <div>
                              <label
                                   htmlFor="email"
                                   className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5"
                              >
                                   Email Address{" "}
                                   <sup className="text-pink-200">*</sup>
                              </label>
                              <input
                                   id="email"
                                   name="email"
                                   type="text"
                                   placeholder="Enter email address"
                                   style={{
                                        boxShadow: `inset 0px -1px 0px rgba(255, 255, 255, 0.18)`,
                                   }}
                                   className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5 -z-0"
                                   {...register("email", {
                                        required: true,
                                   })}
                              />
                              {errors.email && (
                                   <span className="text-yellow-50 mt-1 mr-1">
                                        Please enter your email
                                   </span>
                              )}
                         </div>
                    </div>
                    <div className="flex flex-col justify-between ">
                         <label
                              htmlFor="mobileNo"
                              className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5"
                         >
                              Contact No <sup className="text-pink-200">*</sup>
                         </label>
                         <div className="flex gap-x-2 flex-row justify-between">
                              <select
                                   name="countryCode"
                                   id="countryCode"
                                   style={{
                                        boxShadow: `inset 0px -1px 0px rgba(255, 255, 255, 0.18)`,
                                   }}
                                   className="w-[70px] rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5 -z-0"
                                   {...register("countryCode", {
                                        required: true,
                                   })}
                              >
                                   {countryCode.map((country, i) => (
                                        <option key={i} value={country.code}>
                                             <>
                                                  {country.code}
                                                  {" - "}
                                                  {country.country}
                                             </>
                                        </option>
                                   ))}
                              </select>
                              <div></div>
                              <input
                                   id="mobileNo"
                                   name="mobileNo"
                                   type="text"
                                   placeholder="Enter mobile number"
                                   style={{
                                        boxShadow: `inset 0px -1px 0px rgba(255, 255, 255, 0.18)`,
                                   }}
                                   className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5 -z-0"
                                   {...register("mobileNo", {
                                        required: {
                                             value: true,
                                             message: "Please enter your mobile number",
                                        },
                                        maxLength: {
                                             value: 12,
                                             message: "Invalid mobile number.",
                                        },
                                        minLength: {
                                             value: 10,
                                             message: "Invalid mobile number.",
                                        },
                                   })}
                              />
                         </div>
                         {errors.mobileNo && (
                              <span className="text-yellow-50 mt-1 mr-1">
                                   {errors.mobileNo.message}
                              </span>
                         )}
                    </div>
                    <div className="flex gap-x-2">
                         <div className="relative" htmlFor="message">
                              <label className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                                   Message{" "}
                                   <sup className="text-pink-200">*</sup>
                              </label>
                              <textarea
                                   id="message"
                                   name="message"
                                   type="text"
                                   rows="3"
                                   cols="60"
                                   placeholder="Enter message..."
                                   style={{
                                        boxShadow: `inset 0px -1px 0px rgba(255, 255, 255, 0.18)`,
                                   }}
                                   className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5 -z-0"
                                   {...register("message", {
                                        required: {
                                             value: true,
                                             message: "Please enter your message",
                                        },
                                        maxLength: {
                                             value: 100,
                                             message: "Maximum thousand charater write a message .",
                                        },
                                        minLength: {
                                             value: 10,
                                             message: "Minimum ten charater write a message",
                                        },
                                   })}
                              />
                              {errors.message && (
                                   <span className="text-yellow-50 mt-1 mr-1">
                                        {errors.message.message}
                                   </span>
                              )}
                         </div>
                    </div>
                    <button
                         type="submit"
                         className="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900"
                    >
                         Send Message
                    </button>
               </form>
          </div>
     );
};

export default ContactForm;
