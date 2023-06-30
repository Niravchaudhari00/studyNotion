import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { BiArrowBack } from "react-icons/bi";
import { Link, useLocation } from "react-router-dom";
import { resetPassword } from "../service/operations/AuthApi";
import { useDispatch } from "react-redux";

const ResetNewPassword = () => {
     const dispatch = useDispatch();
     const location = useLocation();
     const [showPassword, setShowPassword] = useState(false);
     const [showConfirmPassword, setShowConfirmPassword] = useState(false);
     const [flag, setFlag] = useState(false);
     const [formData, setFormData] = useState({
          password: "",
          confirmPassword: "",
     });
     const { password, confirmPassword } = formData;
     const handleOnChange = (e) => {
          setFormData({
               ...formData,
               [e.target.name]: e.target.value,
          });
     };

     const handleOnPasswordReset = (e) => {
          e.preventDefault();

          const token = location.pathname.split("/").at(-1);
          dispatch(resetPassword(password, confirmPassword, token, setFlag));
     };
     return (
          <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
               <div className="flex flex-col md:w-[508px] w-screen p-2 text-richblack-5 ">
                    <h1 className="text-richblack-5 font-semibold text-[1.875rem] leading-[2.375rem]">
                         {!flag ? "Choose new password" : "Reset complete!"}
                    </h1>
                    <p className="text-xtext-[1.125rem] leading-[1.625rem] my-4 text-richblack-100l">
                         {!flag
                              ? "  Almost done. Enter your new password and youre all set."
                              : `All done! We have sent an email to m***********@gmail.com to confirm`}
                    </p>

                    {!flag ? (
                         <form
                              onSubmit={handleOnPasswordReset}
                              className="flex flex-col gap-3"
                         >
                              <label className="w-full relative">
                                   <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                                        New password{" "}
                                        <sup className="text-pink-200">*</sup>
                                   </p>
                                   <input
                                        required
                                        type={
                                             showPassword ? "text" : "password"
                                        }
                                        name="password"
                                        value={password}
                                        onChange={handleOnChange}
                                        placeholder="Enter new password"
                                        style={{
                                             boxShadow:
                                                  "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                        }}
                                        className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
                                   />

                                   {/* showpassword icon */}
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

                              <label className="w-full relative">
                                   <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                                        Confirm new password{" "}
                                        <sup className="text-pink-200">*</sup>
                                   </p>
                                   <input
                                        required
                                        type={
                                             showConfirmPassword
                                                  ? "text"
                                                  : "password"
                                        }
                                        name="confirmPassword"
                                        value={confirmPassword}
                                        onChange={handleOnChange}
                                        placeholder="Enter confirm new password"
                                        style={{
                                             boxShadow:
                                                  "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                        }}
                                        className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
                                   />

                                   {/* showpassword icon */}
                                   <span
                                        onClick={() =>
                                             setShowConfirmPassword(
                                                  (prev) => !prev
                                             )
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
                                             />
                                        )}
                                   </span>
                              </label>

                              <button
                                   type="submit"
                                   className="w-full bg-yellow-50 py-[12px] px-[12px] rounded-[8px] mt-6 font-medium text-richblack-900"
                              >
                                   Reset Password
                              </button>
                         </form>
                    ) : (
                         <Link to={"/login"}>
                              <button className="w-full bg-yellow-50 py-[12px] px-[12px] rounded-[8px] mt-6 font-medium text-richblack-900">
                                   Return to login
                              </button>
                         </Link>
                    )}
                    {!flag ? (
                         <div className="mt-6 flex items-center justify-between">
                              <Link to="/login">
                                   <p className="text-richblack-5 flex items-center gap-x-2">
                                        <BiArrowBack /> Back To Login
                                   </p>
                              </Link>
                         </div>
                    ) : (
                         <div></div>
                    )}
               </div>
          </div>
     );
};

export default ResetNewPassword;
