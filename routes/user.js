import express from 'express';
import { loginHead, loginManager, logoutHead, logoutManager, newHead, newManager } from '../controllers/user.js';
const router=express.Router();

router.post("/new",newHead);
router.post("/new/manager",newManager);
router.post("/login",loginHead);
router.post("/login/manager",loginManager);
router.get("/logoutManager",logoutManager);
router.get("/logoutHead",logoutHead);


export default router;