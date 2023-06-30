import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../components/common/Spinner";
import OtpInput from "react-otp-input";
import { BiArrowBack } from "react-icons/bi";
import { RxCountdownTimer } from "react-icons/rx";
import { sendOtp, signUp } from "../service/operations/AuthApi";
import { Link, useNavigate } from "react-router-dom";

const VerifyEmail = () => {
     const [otp, setOtp] = useState("");
     const { loading, singUpData } = useSelector((state) => state.auth);

     const dispatch = useDispatch();
     const navigate = useNavigate();

     useEffect(() => {
          if (!singUpData) {
               navigate("/signup");
          }
     }, []);

     const handleVerifyOtpAndSignup = (e) => {
          e.preventDefault();
          const {
               accountType,
               firstName,
               lastName,
               email,
               password,
               confirmPassword,
          } = singUpData;
          dispatch(
               signUp(
                    accountType,
                    firstName,
                    lastName,
                    email,
                    password,
                    confirmPassword,
                    otp,
                    navigate
               )
          );
     };
     return (
          <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
               {loading ? (
                    <Spinner />
               ) : (
                    <div className="flex flex-col md:w-[508px] w-screen p-2 text-richblack-5 ">
                         <h1 className="text-richblack-5 font-semibold text-[1.875rem] leading-[2.375rem]">
                              Verify email
                         </h1>
                         <p className="text-xtext-[1.125rem] leading-[1.625rem] my-4 text-richblack-100l">
                              A verification code has been sent to you. Enter
                              the code below
                         </p>

                         <form onSubmit={handleVerifyOtpAndSignup}>
                              <OtpInput
                                   value={otp}
                                   onChange={setOtp}
                                   numInputs={6}
                                   renderSeparator={<span>-</span>}
                                   renderInput={(props) => (
                                        <input
                                             {...props}
                                             placeholder="0"
                                             className="w-[48px] lg:w-[60px] border-0 bg-richblack-800 rounded-[0.5rem] text-richblack-5 aspect-square text-center focus:border-0 focus:outline-2 focus:outline-yellow-50"
                                             style={{
                                                  boxShadow:
                                                       "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                             }}
                                        />
                                   )}
                                   containerStyle={{
                                        justifyContent: "space-between",
                                        gap: "0 6px",
                                   }}
                              />
                              <button
                                   type="submit"
                                   className="w-full bg-yellow-50 py-[12px] px-[12px] rounded-[8px] mt-6 font-medium text-richblack-900"
                              >
                                   Verify Email
                              </button>
                         </form>
                         <div className="mt-6 flex items-center justify-between">
                              <Link to="/signup">
                                   <p className="text-richblack-5 flex items-center gap-x-2">
                                        <BiArrowBack /> Back To Signup
                                   </p>
                              </Link>
                              <button
                                   className="flex items-center text-blue-100 gap-x-2"
                                   onClick={() =>
                                        dispatch(sendOtp(singUpData.email))
                                   }
                              >
                                   <RxCountdownTimer />
                                   Resend it
                              </button>
                         </div>
                    </div>
               )}
          </div>
     );
};

export default VerifyEmail;
