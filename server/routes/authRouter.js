import { Router } from "express";
import { changePassword, logIn, logOut, sendOtp, signUp } from "../controllers/authController.js";
import { Auth } from "../middlewares/Auth.js";
import { resetPassword, resetPasswordToken } from "../controllers/resetPasswordController.js";

const router = Router();

router.get("/test", Auth, (req, res) => {
     res.json({
          message: `Welecom to the protected routed Test`
     })
})

// ***************************************************
//                 Authentication routes            //
// ***************************************************

router.post("/sendOtp", sendOtp)
router.post("/signup", signUp);
router.post("/login", logIn)
router.get("/logout",logOut)
router.post("/change-password", Auth, changePassword)

// ***************************************************
//                 Reset password                   //
// ***************************************************

// Generate a reset password token
router.post("/reset-password-token", resetPasswordToken)

// Resting user's password after verification
router.post("/reset-passowrd", resetPassword)

export default router