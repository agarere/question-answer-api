const express = require('express');
const { register, errorTest, getUser } = require('../controllers/auth')

const { getAccessToRoute } = require('../middlewares/authorization/auth')

// /api/auth
const router = express.Router();

router.post("/register", register)
router.get("/error", errorTest)
router.get("/profile", getAccessToRoute, getUser)

module.exports = router;