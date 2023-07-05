import React from "react";
import { NavLink, matchPath, useLocation } from "react-router-dom";
import * as Icons from "react-icons/vsc";

const NavbarLinks = ({ link, iconName }) => {
     const Icon = Icons[iconName];
     const location = useLocation();
     const matchRoute = (route) => {
          return matchPath({ path: route }, location.pathname);
     };

     return (
          <NavLink
               to={link.path}
               className={`relative px-8 py-2 ${
                    matchRoute(link.path)
                         ? "bg-yellow-800 text-yellow-50"
                         : "bg-opacity-0 text-richblack-300"
               } transition-all duration-200`}
          >
               <span
                    className={`absolute top-0 left-0 h-full w-[0.25rem] bg-yellow-5 ${
                         matchRoute(link.path)
                              ? "bg-opacity-100"
                              : "bg-opacity-0"
                    }`}
               ></span>
               <div className="flex items-center gap-x-3">
                    <Icon className="text-lg" />
                    <span>{link.name}</span>
               </div>
          </NavLink>
     );
};

export default NavbarLinks;
