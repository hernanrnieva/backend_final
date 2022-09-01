import express from 'express'
import configController from '../../controllers/config/config.js'
import jwt from '../../controllers/middlewares/jwt.js'

const router = express.Router()

router.get('/', jwt, configController.sendConfigs)

export default router