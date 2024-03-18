import express from 'express';
const  router = express.Router();
import {getMessageByRoomId} from '../controller/message_controller.mjs';


router.post("/getmessage",getMessageByRoomId)
export default router;