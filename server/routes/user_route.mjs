import express from 'express';
const  router = express.Router();
import {Register,Verification,Login,getUserByRoomId,Logout} from '../controller/user_controller.mjs';

router.post("/register",Register);
router.post("/verify",Verification);
router.post("/login",Login);
// router.post("/getuser",getUserById);
router.post("/getall",getUserByRoomId)
router.post("/logout",Logout)
export default router;