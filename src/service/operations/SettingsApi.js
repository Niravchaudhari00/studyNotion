import { toast } from "react-hot-toast";
import { setLoading, setUser } from "../../slices/profileSlice";
import { apiConnector } from "../apiConnector";
import { SettingEndPoint } from "../apis";


const { UPDATE_PROFILE_PICTURE, DELETE_ACCOUNT, UPDATE_YOUR_PROFILE } = SettingEndPoint;

export const changeProfilePicture = (token, formData) => {
     return async (dispatch) => {
          const toastId = toast.loading("uploading picture...");
          try {
               const respons = await apiConnector(
                    "PUT",
                    UPDATE_PROFILE_PICTURE,
                    formData,
                    {
                         "Content-Type": "multipart/form-data",
                         Authorization: 'Bearer ' + token,
                    }
               );
               if (!respons.data.success) {
                    console.log(respons.data.message);
               }
               console.log("PROFILE PICTURE UPLOAD ->", respons);

               dispatch(setUser(respons.data.data))
               toast.success(respons?.data?.message)

          } catch (error) {
               toast.error(error.response.data.message)
          }
          setLoading(false);
          toast.dismiss(toastId);
     };
};

export const updateYourProfile = (token, data) => {
     console.log("data here => ", data);
     return async (dispatch) => {
          const toastId = toast.loading("Updating...")
          try {
               const respons = await apiConnector("PUT", UPDATE_YOUR_PROFILE, data, {
                    Authorization: 'Bearer ' + token,
               })

               console.log('Update data ->', respons);
             

               // toast.success(respons.data.message)

          } catch (error) {
               toast.error(error.response.data.message)
          }
          toast.dismiss(toastId)
     }
}
