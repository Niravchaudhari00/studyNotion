import { toast } from "react-hot-toast";
import { endPoint } from "../apis";
import { apiConnector } from "../apiConnector";
import { setLoading, setToken } from "../../slices/authSlice";
import { setUser } from "../../slices/profileSlice";
import { resetCart } from "../../slices/cartSlice";
const {
     LOGIN_API,
     SIGNUP_API,
     SEND_OTP_API,
     LOGOUT_API,
     RESET_PASSWORD_API,
     RESET_PASSWORD_TOKEN_API,
} = endPoint;
// Send otp
export const sendOtp = (email, navigate) => {
     return async (dispatch) => {
          const toastId = toast.loading("Loading...");
          dispatch(setLoading(true));
          try {
               const response = await apiConnector("POST", SEND_OTP_API, {
                    email,
                    userIsPresent: true,
               });
               console.log("OTP SENT =>", response);

               if (!response.data.success) {
                    throw new Error(response.data.message);
               }
               toast.success("OTP Sent Successfully");
               navigate("/verify-email");
          } catch (error) {
               console.log(error.message);
               toast.error("Failed to sent otp");
          }
          dispatch(setLoading(false));
          toast.dismiss(toastId);
     };
};

// SignUp Api
export const signUp = (
     accountType,
     firstName,
     lastName,
     email,
     password,
     confirmPassword,
     otp,
     navigate
) => {
     return async (dispatch) => {
          const toastId = toast.loading("Loading...");
          dispatch(setLoading(true));
          try {
               const response = await apiConnector("POST", SIGNUP_API, {
                    accountType,
                    firstName,
                    lastName,
                    email,
                    password,
                    confirmPassword,
                    otp,
               });

               console.log("Sing up response => ", response);

               if (!response.data.success) {
                    // toast.error(response.data)
                    throw new Error(response.data.message);
               }
               toast.success("Signup Successfull");
               navigate("/login");
          } catch (error) {
               console.log("response error", error);
               toast.error("Failed to signup,");
          }
          dispatch(setLoading(false));
          toast.dismiss(toastId);
     };
};

// Login Apiv
export const login = (email, password, navigate) => {
     return async (dispatch) => {
          const toastId = toast.loading("Loading...");
          dispatch(setLoading(true));
          try {
               const response = await apiConnector("POST", LOGIN_API, {
                    email,
                    password,
               });

               console.log(`API RESPONSE =>`, response.data.user);

               if (!response.data.success) {
                    throw new Error(toast.error(response.data.message));
               }

               toast.success("Login success");
               const userImage = response?.data?.user?.image
                    ? response.data.user.image
                    : `"https://api.dicebear.com/6.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}"`;

               dispatch(setToken(response.data.user.token));
               dispatch(setUser({ ...response.data.user, image: userImage }));

               // data store in localstorage
               localStorage.setItem(
                    "token",
                    JSON.stringify(response.data.user.token)
               );
               localStorage.setItem("user", JSON.stringify(response.data.user));

               navigate("/dashboard/my-profile");
          } catch (error) {
               toast.error(error.response.data.message);
          }
          dispatch(setLoading(false));
          toast.dismiss(toastId);
     };
};

// ForgotPassword
export const resetPasswordToken = (email, setSentEmail) => {
     return async (dispatch) => {
          dispatch(setLoading(true));
          try {
               const response = await apiConnector(
                    "POST",
                    RESET_PASSWORD_TOKEN_API,
                    { email }
               );
               console.log(`RESET PASSWORD TOKEN SENT =>`, response);
               toast.success("Reset password sent. Check your email");
               setSentEmail(true);
          } catch (error) {
               toast.error(`Failed to send email for resetting password.`);
          }
          dispatch(setLoading(false));
     };
};

export const resetPassword = (password, confirmPassword, token, setFlag) => {
     return async (dispatch) => {
          const toastId = toast.loading("Loading...");
          dispatch(setLoading(true));
          try {
               const response = await apiConnector("POST", RESET_PASSWORD_API, {
                    password,
                    confirmPassword,
                    token,
               });
               console.log(`PASSWORD UPDATE => `, response);
               toast.success("Password reset successfully");
               setFlag(true);
          } catch (error) {
               console.log("error => ", error);
               toast.error("Failed");
          }
          dispatch(setLoading(false));
          toast.dismiss(toastId);
     };
};

export const logout = (navigate) => {
     return async (dispatch) => {
          dispatch(setUser(null));
          dispatch(setToken(null));
          dispatch(resetCart());
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          toast.success("Logout success");
          navigate("/");
     };
};
