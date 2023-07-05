import React, { useState } from "react";
import { sidebarLinks } from "../../../data/dashboard-links";
import { useDispatch, useSelector } from "react-redux";
import NavbarLinks from "./SidebarLinks";
import { VscSignOut } from "react-icons/vsc";
import { logout } from "../../../service/operations/AuthApi";
import { useNavigate } from "react-router-dom";
import ConfirmationModal from "../../common/ConfirmationModal";
const Sidebar = () => {
     const { user } = useSelector((state) => state.profile);
     const [confirmModal, setConfirmModal] = useState(null);
     const dispatch = useDispatch();
     const navigate = useNavigate();
     return (
          <>
               <div className="flex min-h-[calc(100vh-3.5rem)] min-w-[220px] flex-col border-r-[1px] border-r-richblack-700 bg-richblack-800 py-10 ">
                    <div className="flex flex-col">
                         {sidebarLinks.map((link) => {
                              if (link.type && user.accountType !== link.type) {
                                   return null;
                              } else {
                                   return (
                                        <NavbarLinks
                                             key={link.id}
                                             link={link}
                                             iconName={link.icon}
                                        />
                                   );
                              }
                         })}
                    </div>
                    <div className="w-10/12 h-[1px] bg-richblack-700 mx-auto my-5"></div>
                    <div className="flex flex-col">
                         <NavbarLinks
                              link={{
                                   name: "Settings",
                                   path: "/dashboard/settings",
                              }}
                              iconName={"VscSettingsGear"}
                         />
                         <button
                              onClick={() =>
                                   setConfirmModal({
                                        title: "Are you sure?",
                                        subTitle: "You will be logged out your account.",
                                        logoutBtnTxt: "Logout",
                                        cancelBtnTxt: "Cancel",
                                        btnLogoutHandler: () => dispatch(logout(navigate)),
                                        btnCancelHandler: () => setConfirmModal(null),
                                   })
                              }
                              className="px-8 py-2 text-sm font-medium text-richblack-300"
                         >
                              <div className="flex items-center gap-x-3">
                                   <VscSignOut className="text-lg" />
                                   <span>Logout</span>
                              </div>
                         </button>
                    </div>
               </div>
               {confirmModal && <ConfirmationModal modalData={confirmModal} />}
          </>
     );
};

export default Sidebar;
