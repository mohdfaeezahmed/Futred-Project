import express from "express"
import { signup,login,logout,home,checkAuth, employee } from "../controllers/auth.controllers.js";
import { protectRoute } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/",home);
router.post("/signup",signup);
router.post("/login",login);
router.post("/logout",logout);
router.get("/:username", employee);
// router.put("/update-profile",protectRoute,updateRoute);
// router.get("/check",protectRoute,checkAuth);


export default router;