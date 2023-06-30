import React, { useState } from "react";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../../service/operations/AuthApi";

const LoginForm = () => {
     const navigate = useNavigate();
     const dispatch = useDispatch();

     const [showPassword, setShowPassword] = useState(false);
     const [formData, setFormData] = useState({
          email: "",
          password: "",
     });

     const handleOnChange = (e) => {
          setFormData((prevData) => ({
               ...prevData,
               [e.target.name]: e.target.value,
          }));
     };
     // Destructure form data
     const { email, password } = formData;
     const submitHandler = (e) => {
          e.preventDefault();
          dispatch(login(email, password, navigate));
     };
     return (
          <div>
               <form
                    onSubmit={submitHandler}
                    className="mt-9 w-full flex flex-col gap-y-4"
               >
                    <label className="w-full">
                         <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                              Email Address{" "}
                              <sup className="text-pink-200">*</sup>
                         </p>
                         <input
                              required
                              type="text"
                              name="email"
                              value={email}
                              onChange={handleOnChange}
                              placeholder="Enter email address"
                              style={{
                                   boxShadow:
                                        "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                              }}
                              className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
                         />
                    </label>
                    <label className="w-full relative">
                         <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                              Password <sup className="text-pink-200">*</sup>
                         </p>
                         <input
                              required
                              type={showPassword ? "text" : "password"}
                              name="password"
                              value={password}
                              onChange={handleOnChange}
                              placeholder="Enter password"
                              style={{
                                   boxShadow:
                                        "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                              }}
                              className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
                         />

                         {/* showpassword icon */}
                         <span
                              onClick={() => setShowPassword((prev) => !prev)}
                              className="absolute right-3 top-[38px] z-[10] cursor-pointer"
                         >
                              {showPassword ? (
                                   <AiOutlineEyeInvisible
                                        fontSize={24}
                                        fill="#AFB2BF"
                                   />
                              ) : (
                                   <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                              )}
                         </span>
                         <Link to={"/forgot-password"}>
                              <p className="max-w-max ml-auto mt-1 text-xs text-blue-100">
                                   Forgot Passowrd
                              </p>
                         </Link>
                    </label>
                    <button
                         type="submit"
                         className="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900"
                    >
                         Log In
                    </button>
               </form>
          </div>
     );
};

export default LoginForm;
