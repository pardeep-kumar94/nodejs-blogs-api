import express from 'express';
import { checkUserNameAvailability, getUserDetails, login, signup } from '../src/controllers/users.js';
const userRoutes = express.Router();

userRoutes.get("/username_available/:username", checkUserNameAvailability)
userRoutes.post("/create", signup);
userRoutes.post("/login", login);
userRoutes.get("/:username", getUserDetails)


export default userRoutes;