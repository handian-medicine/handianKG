const express = require("express")
const router = express.Router()

const login = require('./login')
const home = require('./home')
const password = require('./password')

router.use('/login',login)
router.use('/home',home)
router.use('/password',password)

module.exports = router
