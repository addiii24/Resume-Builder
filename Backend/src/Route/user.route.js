import {registeruser, loginuser, logoutuser, getMe} from "../Controller/user.controller.js";
import express from "express";
import authUser from "../Middleware/auth.moddleware.js";
const router = express.Router();

// @route POST /api/auth/registeruser
// @desc Register a new user, expects username, email, and password in the request body
// @access Public
router.route("/registeruser").post(registeruser);

// @route POST /api/auth/loginuser
// @desc Log in an existing user, expects email and password in the request body
// @access Public
router.route("/loginuser").post(loginuser);

// @route POST /api/auth/logout
// @desc Log out the current user
// @access Public
router.route("/logout").get(logoutuser);

// @route GET /api/auth/get-me
// @desc Get the current logged-in user's information
// @access Private (requires authentication)
router.route("/get-me").get(getMe);

export default router;