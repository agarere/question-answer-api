const express = require('express');
const {
  createComment
} = require('../controllers/comment')

// /api/comment
const router = express.Router();

router.post("/", createComment)

module.exports = router;