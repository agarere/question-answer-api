const express = require('express');
const {
  getAllQuestions,
  createQuestion
} = require('../controllers/question')

// /api/questions
const router = express.Router();

router.get("/", getAllQuestions)
router.post("/", createQuestion)

module.exports = router;