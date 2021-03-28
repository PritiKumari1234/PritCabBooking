const express   =require('express')
const router    =express.Router()

const AuthController=require('../controllers/controlling.controller')

router.post('/v1/driver/register',AuthController.register)
router.post('/v1/passenger/available_cabs',AuthController.nearbyCabs)
router.post('/v1/driver/:id/sendLocation',AuthController.savelocation)

module.exports=router