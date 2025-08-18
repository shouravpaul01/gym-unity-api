import express from 'express'
import { UserController } from './user.controller'
import auth from '../../middlewares/auth'
import { USER_ROLE } from './user.constant'

const router=express.Router()

router.patch("/update-user/:userId",auth(USER_ROLE.admin),UserController.updateUserInto)
router.get("/",auth(USER_ROLE.admin),UserController.getAllUsers)
router.get("/single-user/:email",auth(USER_ROLE.admin),UserController.getSingleUser) 

router.patch("/update-role/:userId",auth(USER_ROLE.admin),UserController.updateUserRole)
router.patch("/update-status/:userId",auth(USER_ROLE.admin),UserController.updateStatus)
export const UserRoutes=router