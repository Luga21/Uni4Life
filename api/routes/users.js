<<<<<<< HEAD
import express from 'express'
import { getUser, updateUser } from '../controllers/user.js'

const router = express.Router()

router.get('/find/:userId', getUser)
router.put('/', updateUser)

export default router
=======
import express from "express";

const router = express.Router();
router.get("/test", (req, res) => {
  res.send("está funcionando");
});

export default router;
>>>>>>> de0f159b704ab154dad1d4708a16e09dc40b0ca8
