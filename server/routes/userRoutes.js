import express from "express";
import { getUserData } from "../controllers/userController.js";
import userAuth from "../middleware/userAuth.js";

const userRoute = express.Router();

// Use query parameter to fetch user data
userRoute.get('/data',userAuth, getUserData);

export default userRoute;
