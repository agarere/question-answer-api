const express = require('express')
const question = require('./question')
const auth = require('./auth')
const tutorial = require('./tutorial')
const comment = require('./comment')

// /api
const router = express.Router()

router.use("/question", question)
router.use("/auth", auth)
router.use("/tutorial", tutorial)
router.use("/comment", comment)

module.exports = router