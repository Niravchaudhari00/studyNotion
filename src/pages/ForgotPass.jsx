import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BiArrowBack } from "react-icons/bi";
import { Link } from "react-router-dom";
import Spinner from "../components/common/Spinner";
import { resetPasswordToken } from "../service/operations/AuthApi";

const ForgotPass = () => {
     const dispatch = useDispatch();
     const [sentEmail, setSentEmail] = useState(false);
     const [email, setEmail] = useState("");

     const { loading } = useSelector((state) => state.auth);
     const handleForgotPassword = (e) => {
          e.preventDefault();
          dispatch(resetPasswordToken(email, setSentEmail));
     };
     return (
          <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
               {loading ? (
                    <Spinner />
               ) : (
                    <div className="flex flex-col md:w-[508px] w-screen p-2 text-richblack-5 ">
                         <h1 className="text-richblack-5 font-semibold text-[1.875rem] leading-[2.375rem]">
                              {!sentEmail
                                   ? "Reset your password"
                                   : "Check email"}
                         </h1>
                         <p className="text-xtext-[1.125rem] leading-[1.625rem] my-4 text-richblack-100l">
                              {!sentEmail
                                   ? "Have no fear. We’ll email you instructions to reset your password. If you dont have access to your email we can try account recovery"
                                   : `We have sent the reset email to ${email}`}
                         </p>

                         <form onSubmit={handleForgotPassword}>
                              {!sentEmail && (
                                   <label htmlFor="email" className="w-full">
                                        <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                                             Email address{" "}
                                             <sup className="text-pink-200">
                                                  *
                                             </sup>{" "}
                                        </p>
                                        <input
                                             required
                                             type="text"
                                             id="email"
                                             name="email"
                                             value={email}
                                             onChange={(e) =>
                                                  setEmail(e.target.value)
                                             }
                                             placeholder="Enter email address"
                                             style={{
                                                  boxShadow:
                                                       "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                             }}
                                             className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
                                        />
                                   </label>
                              )}{" "}
                              <button
                                   type="submit"
                                   className="w-full bg-yellow-50 py-[12px] px-[12px] rounded-[8px] mt-6 font-medium text-richblack-900"
                              >
                                   {!sentEmail
                                        ? ` Reset Password`
                                        : `Resend email`}
                              </button>
                         </form>
                         <div className="mt-6 flex items-center justify-between">
                              <Link to="/login">
                                   <p className="text-richblack-5 flex items-center gap-x-2">
                                        <BiArrowBack /> Back To Login
                                   </p>
                              </Link>
                         </div>
                    </div>
               )}
          </div>
     );
};

export default ForgotPass;
