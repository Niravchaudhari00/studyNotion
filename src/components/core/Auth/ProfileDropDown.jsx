import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineCaretDown } from "react-icons/ai";
import { VscDashboard, VscSignOut } from "react-icons/vsc";
import { Link, useNavigate } from "react-router-dom";
import useOnClickOutside from "../../../hooks/useOnClick";
import { logout } from "../../../service/operations/AuthApi";

const ProfileDropDown = () => {
     const { user } = useSelector((state) => state.profile);
     // console.log("user here -> ", JSON.stringify(user));
     const [open, setOpen] = useState(false);
     const ref = useRef(null);
     const dispatch = useDispatch();
     const navigate = useNavigate();
     useOnClickOutside(ref, () => setOpen(false));
     if (!user) return null;
     return (
          <>
               <button className="relative" onClick={()=>setOpen(true)}>
                    <div className="flex items-center gap-1">
                         <img
                              src={user?.image}
                              alt={`profile-${user?.firstName}`}
                              className="rounded-full w-[35px] aspect-square object-fill"
                         />
                         <AiOutlineCaretDown className="text-sm text-richblack-100" />
                    </div>
                    {open && (
                         <div
                              onClick={(e) => e.stopPropagation()}
                              className="absolute top-[130%] -right-2 z-[1000] divide-y-[1px] divide-richblack-700 overflow-hidden rounded-md border-[1px] border-richblack-700 bg-richblack-800"
                              ref={ref}
                         >
                              <Link
                                   to="/dashboard/my-profile"
                                   onClick={() => setOpen(false)}
                              >
                                   <div className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25">
                                        <VscDashboard className="text-lg" />
                                        Dashboard
                                   </div>
                              </Link>
                              <div
                                   onClick={() => {
                                        dispatch(logout(navigate));
                                        setOpen(false);
                                   }}
                                   className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25"
                              >
                                   <VscSignOut className="text-lg" />
                                   Logout
                              </div>
                         </div>
                    )}
               </button>
          </>
     );
};

export default ProfileDropDown;
