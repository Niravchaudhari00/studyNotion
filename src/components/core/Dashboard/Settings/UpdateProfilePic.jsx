import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import IconBtn from "../../../common/IconBtn";
import { FiUpload } from "react-icons/fi";
import { changeProfilePicture } from "../../../../service/operations/SettingsApi";
import { toast } from "react-hot-toast";

const UpdateProfilePic = () => {
     const { token } = useSelector((state) => state.auth);
     const { user } = useSelector((state) => state.profile);

     const [previewSource, setPreviewSource] = useState(null);
     const [imageFile, setImageFile] = useState('');
     const [loading, setLoading] = useState(false);
     const dispatch = useDispatch();

     const fileInputRef = useRef(null);

     const handleClick = () => {
          fileInputRef.current.click();
     };

     const previewImage = (file) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onloadend = () => {
               setPreviewSource(reader.result);
          };
     };
     const handleChangeFile = (e) => {
          const file = e.target.files[0];
          if (file) {
               setImageFile(file);
               previewImage(file);
          }

     };

     const handleFileUpload = async () => {
          try {
               
               setLoading(true);
               const formData = new FormData();
               formData.append("dpFile", imageFile);
               dispatch(changeProfilePicture(token, formData)).then(() => {
                    setLoading(false)
               });

          } catch (error) {
               console.log(error.message);
               toast.error("File upload fail")

          }
     };

     useEffect(() => {
          if (imageFile) {
               previewImage(imageFile);
          }
     }, [imageFile]);

     return (
          <>
               <div className="flex items-center justify-between rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12 text-richblack-5">
                    <div className="flex  items-center gap-x-4">
                         <img
                              src={previewSource || user?.image}
                              alt={`profile - ${user?.firstName}`}
                              loading="lazy"
                              className="w-[78px] object-cover aspect-square rounded-full"
                         />
                         <div className="space-y-2">
                              <p className="text-richblack-5">
                                   Change Profile Picture
                              </p>
                              <div className="flex flex-row gap-3">
                                   <input
                                        type="file"
                                        className="hidden"
                                        ref={fileInputRef}
                                        onChange={handleChangeFile}
                                        accept="image/jpg, image/png, image/jpeg"
                                   />
                                   <button
                                        onClick={handleClick}
                                        disabled={loading}
                                        className={`${loading
                                             ? "cursor-not-allowed"
                                             : "cursor-pointer"
                                             } " rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50"`}
                                   >
                                        select
                                   </button>
                                   {
                                        <IconBtn
                                             onclick={handleFileUpload}
                                             text={
                                                  loading
                                                       ? "Uploading.."
                                                       : "Upload"
                                             }
                                        >
                                             {!loading && (
                                                  <FiUpload className="text-lg text-richblack-900 gap-x-2" />
                                             )}
                                        </IconBtn>
                                   }
                              </div>
                         </div>
                    </div>
               </div>
          </>
     );
};

export default UpdateProfilePic;
