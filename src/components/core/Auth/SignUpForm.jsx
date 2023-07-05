import React, { useState } from "react";
import Tab from "../../common/Tab";
import { ACCOUNT_TYPE } from "../../../utils/constants";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { setSignUpData } from "../../../slices/authSlice";
import { sendOtp } from "../../../service/operations/AuthApi";

const SignUpForm = () => {
     const [showPassword, setShowPassword] = useState(false);
     const [showConfirmPassword, setShowConfirmPassword] = useState(false);
     const navigate = useNavigate();
     const dispatch = useDispatch();

     const [accountType, setAccountType] = useState(ACCOUNT_TYPE.STUDENT);
     const [formData, setFormData] = useState({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          confirmPassword: "",
     });
     const { firstName, lastName, email, password, confirmPassword } = formData;

     const handleOnchange = (e) => {
          setFormData((prevData) => ({
               ...prevData,
               [e.target.name]: e.target.value,
          }));
     };
     const handleOnSubmit = (e) => {
          e.preventDefault();

          if (password !== confirmPassword) {
               console.log("error");
               toast.error("Password dose not match");
               return;
          }
          const signUpData = {
               firstName,
               lastName,
               email,
               password,
               confirmPassword,
               accountType,
          };
          // console.log("singupdata when i store slice = > ", signUpData);
          dispatch(setSignUpData(signUpData));
          dispatch(sendOtp(formData.email, navigate));

          // reset data
          setFormData({
               firstName: "",
               lastName: "",
               email: "",
               password: "",
               confirmPassword: "",
          });
          setAccountType(ACCOUNT_TYPE.STUDENT);
     };

     const tabData = [
          {
               id: 1,
               tabName: "student",
               type: ACCOUNT_TYPE.STUDENT,
          },
          {
               id: 2,
               tabName: "Instructor",
               type: ACCOUNT_TYPE.INSTRUCTOR,
          },
     ];
     return (
          <div>
               <Tab
                    tabData={tabData}
                    field={accountType}
                    setField={setAccountType}
               />
               <form
                    onSubmit={handleOnSubmit}
                    className="flex flex-col w-full  gap-y-4 mt-7"
               >
                    <div className="flex gap-x-2">
                         <label htmlFor="firstName">
                              <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                                   First Name{" "}
                                   <sup className="text-pink-200">*</sup>
                              </p>
                              <input
                                   required
                                   id="firstName"
                                   name="firstName"
                                   type="text"
                                   value={firstName}
                                   onChange={handleOnchange}
                                   placeholder="Enter first name"
                                   style={{
                                        boxShadow: `inset 0px -1px 0px rgba(255, 255, 255, 0.18)`,
                                   }}
                                   className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
                              />
                         </label>
                         <label htmlFor="lasttName">
                              <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                                   Last Name{" "}
                                   <sup className="text-pink-200">*</sup>
                              </p>
                              <input
                                   required
                                   id="lastName"
                                   name="lastName"
                                   type="text"
                                   value={lastName}
                                   onChange={handleOnchange}
                                   placeholder="Enter last name"
                                   style={{
                                        boxShadow: `inset 0px -1px 0px rgba(255, 255, 255, 0.18)`,
                                   }}
                                   className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
                              />
                         </label>
                    </div>
                    <div className="">
                         <label htmlFor="email">
                              <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                                   Email Address{" "}
                                   <sup className="text-pink-200">*</sup>
                              </p>
                              <input
                                   required
                                   id="email"
                                   name="email"
                                   type="text"
                                   value={email}
                                   onChange={handleOnchange}
                                   placeholder="Enter email address"
                                   style={{
                                        boxShadow: `inset 0px -1px 0px rgba(255, 255, 255, 0.18)`,
                                   }}
                                   className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
                              />
                         </label>
                    </div>
                    <div className="flex gap-x-2">
                         <label className="relative" htmlFor="password">
                              <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                                   Password{" "}
                                   <sup className="text-pink-200">*</sup>
                              </p>
                              <input
                                   required
                                   id="password"
                                   name="password"
                                   value={password}
                                   onChange={handleOnchange}
                                   type={showPassword ? "text" : "password"}
                                   placeholder="Password"
                                   style={{
                                        boxShadow: `inset 0px -1px 0px rgba(255, 255, 255, 0.18)`,
                                   }}
                                   className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
                              />
                              <span
                                   onClick={() =>
                                        setShowPassword((prev) => !prev)
                                   }
                                   className="absolute right-3 top-[38px] z-[10] cursor-pointer"
                              >
                                   {showPassword ? (
                                        <AiOutlineEyeInvisible
                                             fontSize={24}
                                             fill="#AFB2BF"
                                        />
                                   ) : (
                                        <AiOutlineEye
                                             fontSize={24}
                                             fill="#AFB2BF"
                                        />
                                   )}
                              </span>
                         </label>
                         <label className="relative" htmlFor="confirmPassword">
                              <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                                   Confirm password{" "}
                                   <sup className="text-pink-200">*</sup>
                              </p>
                              <input
                                   required
                                   id="confirmPassword"
                                   name="confirmPassword"
                                   value={confirmPassword}
                                   type={
                                        showConfirmPassword
                                             ? "text"
                                             : "password"
                                   }
                                   onChange={handleOnchange}
                                   placeholder="Confirm password"
                                   style={{
                                        boxShadow: `inset 0px -1px 0px rgba(255, 255, 255, 0.18)`,
                                   }}
                                   className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5 -z-0"
                              />

                              <span
                                   onClick={() =>
                                        setShowConfirmPassword((prev) => !prev)
                                   }
                                   className="absolute right-3 top-[38px] z-[10] cursor-pointer"
                              >
                                   {showConfirmPassword ? (
                                        <AiOutlineEyeInvisible
                                             fontSize={24}
                                             fill="#AFB2BF"
                                        />
                                   ) : (
                                        <AiOutlineEye
                                             fontSize={24}
                                             fill="#AFB2BF"
                                             className="z-[10000]"
                                        />
                                   )}
                              </span>
                         </label>
                    </div>
                    <button
                         type="submit"
                         className="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900"
                    >
                         Create Account
                    </button>
               </form>
          </div>
     );
};

export default SignUpForm;
