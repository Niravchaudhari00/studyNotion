const BASE_URL = process.env.REACT_APP_BASE_URL;

// ENDPOINT REST API
export const endPoint = {

     SEND_OTP_API: `${BASE_URL}/auth/sendOtp`,
     SIGNUP_API: `${BASE_URL}/auth/signup`,
     LOGIN_API: `${BASE_URL}/auth/login`,
     LOGOUT_API: `${BASE_URL}/auth/logout`,
     RESET_PASSWORD_TOKEN_API: `${BASE_URL}/auth/reset-password-token`,
     RESET_PASSWORD_API: `${BASE_URL}/auth/reset-passowrd`
}
// CATEGORI REST API
export const categories = {
     CATAGORIES_API: `${BASE_URL}/course/getAllCategory`
}

// CONTACT US 
export const contactUs = {
     CONTACTUS_API: `${BASE_URL}/contactUs`
}

// SETTING END POINT
export const SettingEndPoint = {
     UPDATE_PROFILE_PICTURE: `${BASE_URL}/profile/update-profile-picture`,
     UPDATE_YOUR_PROFILE: `${BASE_URL}/profile/update-profile`,
     DELETE_ACCOUNT: `${BASE_URL}/profile/deleteAccount`,
     CHANGE_PASSWORD: `${BASE_URL}/auth/change-password`,
     
}