import React, { useEffect, useState } from "react";
import { NavbarLinks } from "../../data/navbar-links";
import logo from "../../assets/Logo/Logo-Full-Light.png";
import { Link, matchPath, useLocation } from "react-router-dom";
import { apiConnector } from "../../service/apiConnector";
import { categories } from "../../service/apis";
import { BsChevronDown } from "react-icons/bs";
import { useSelector } from "react-redux";
import { ACCOUNT_TYPE } from "../../utils/constants";

import { AiOutlineShoppingCart, AiOutlineMenu } from "react-icons/ai";
import ProfileDropDown from "../core/Auth/ProfileDropDown";
const Navbar = () => {
     const [subLinks, setSubLink] = useState([]);
     const [loading, setLoading] = useState(false);
     const location = useLocation();

     const { token } = useSelector((state) => state.auth);
     const { user } = useSelector((state) => state.profile);
     const { totalItem } = useSelector((state) => state.cart);
     // console.log("totalNumber : ", totalItem);

     useEffect(() => {
          (async () => {
               setLoading(true);
               try {
                    const result = await apiConnector(
                         "GET",
                         categories.CATAGORIES_API
                    );
                    setSubLink(result.data.data);
               } catch (error) {
                    console.log(error);
               }
               setLoading(false);
          })();
     }, []);

     // console.log('result => ', subLinks?.filter((sub) => sub?.courses?.length));

     const matchRoutes = (routes) => {
          return matchPath({ path: routes }, location.pathname);
     };
     return (
          <div className="h-14 flex items-center text-richblack-5 border-b-[1px] border-b-richblack-700 bg-richblack-800">
               <div className="w-11/12 max-w-maxContent m-auto flex items-center justify-between">
                    {/* logo */}
                    <div>
                         <Link to={"/"}>
                              <img
                                   src={logo}
                                   width={160}
                                   height={45}
                                   alt="studynation logo"
                                   loading="lazy"
                              />
                         </Link>
                    </div>

                    {/* nav links */}
                    <nav className="hidden md:block">
                         <ul className="flex gap-x-6 text-richblack-25">
                              {NavbarLinks.map((links, index) => {
                                   return (
                                        <li key={index}>
                                             {links.title === "Catalog" ? (
                                                  <>
                                                       <div
                                                            className={`group relative flex cursor-pointer items-center gap-1 ${
                                                                 matchRoutes(
                                                                      "/catalog/:catalogName"
                                                                 )
                                                                      ? "text-yellow-25"
                                                                      : "text-richblack-25"
                                                            }`}
                                                       >
                                                            <p>{links.title}</p>
                                                            <BsChevronDown />

                                                            <div className="invisible absolute left-[50%] top-[50%] z-[1000] flex w-[200px] translate-x-[-50%] translate-y-[3em] flex-col rounded-lg bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-150 group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px]">
                                                                 <div className="absolute left-[50%] top-0 -z-10 h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded bg-richblack-5"></div>
                                                                 {loading ? (
                                                                      <div role="status">
                                                                           <svg
                                                                                aria-hidden="true"
                                                                                className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                                                                                viewBox="0 0 100 101"
                                                                                fill="none"
                                                                                xmlns="http://www.w3.org/2000/svg"
                                                                           >
                                                                                <path
                                                                                     d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                                                                     fill="currentColor"
                                                                                />
                                                                                <path
                                                                                     d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                                                                     fill="currentFill"
                                                                                />
                                                                           </svg>
                                                                           <span className="sr-only">
                                                                                Loading...
                                                                           </span>
                                                                      </div>
                                                                 ) : subLinks?.length ? (
                                                                      <>
                                                                           {subLinks
                                                                                ?.filter(
                                                                                     (
                                                                                          sublink
                                                                                     ) =>
                                                                                          sublink
                                                                                               ?.courses
                                                                                               ?.length >
                                                                                          0
                                                                                )
                                                                                .map(
                                                                                     (
                                                                                          sublink,
                                                                                          index
                                                                                     ) => (
                                                                                          <Link
                                                                                               to={`catalog/${sublink.name
                                                                                                    .split(
                                                                                                         " "
                                                                                                    )
                                                                                                    .join(
                                                                                                         "-"
                                                                                                    )
                                                                                                    .toLowerCase()}`}
                                                                                               key={
                                                                                                    index
                                                                                               }
                                                                                               className="rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50"
                                                                                          >
                                                                                               {
                                                                                                    sublink.name
                                                                                               }
                                                                                          </Link>
                                                                                     )
                                                                                )}
                                                                      </>
                                                                 ) : (
                                                                      <p>
                                                                           No
                                                                           Course
                                                                           Found
                                                                      </p>
                                                                 )}
                                                            </div>
                                                       </div>
                                                  </>
                                             ) : (
                                                  <Link to={links?.path}>
                                                       <span
                                                            className={`${
                                                                 matchRoutes(
                                                                      links.path
                                                                 )
                                                                      ? "text-yellow-50"
                                                                      : "text-richblack-25"
                                                            }`}
                                                       >
                                                            {links.title}
                                                       </span>
                                                  </Link>
                                             )}
                                        </li>
                                   );
                              })}
                         </ul>
                    </nav>

                    {/* profile section Login/Signup/Cart/Profile/Dashboard */}
                    <div className="hidden lg:flex gap-7">
                         {/* login */}
                         {token === null && (
                              <Link to={"/login"}>
                                   <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
                                        Login
                                   </button>
                              </Link>
                         )}
                         {/* signup */}
                         {token === null && (
                              <Link to={"/signup"}>
                                   <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
                                        Sign Up
                                   </button>
                              </Link>
                         )}
                         <div className="flex felx-row justify-center items-center gap-5">
                              {user &&
                                   user?.accountType !==
                                        ACCOUNT_TYPE.INSTRUCTOR && (
                                        <Link
                                             to={"/dashboard/cart"}
                                             className="relative"
                                        >
                                             <AiOutlineShoppingCart className="text-2xl text-richblack-100" />
                                             {totalItem > 0 && (
                                                  <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-richblack-600 text-center text-xs font-bold text-yellow-100">
                                                       {totalItem}
                                                  </span>
                                             )}
                                        </Link>
                                   )}
                              {token !== null && <ProfileDropDown />}
                         </div>
                    </div>
                    <button className="mr-4 md:hidden">
                         <AiOutlineMenu fontSize={24} fill="#AFB2BF" />
                    </button>
               </div>
          </div>
     );
};

export default Navbar;
