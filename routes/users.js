import express from 'express';
import { getUser, updateUser, getAllUsers, GetFriends } from '../controllers/user.js';
const router = express.Router()

router.get("/find/:userId", getUser);
router.put('/', updateUser)
router.get('/', getAllUsers)
router.get('/getfirends', GetFriends)
export default router