import { Router } from "express";
import { sendMessage } from "../controllers/contactUsController.js";

const route = Router();

route.post('/contactUs', sendMessage)

export default route
