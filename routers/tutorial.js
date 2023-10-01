const express = require('express');
const {
  getAllTutorials,
  createTutorial,
  getTutorial
} = require('../controllers/tutorial')

// /api/tutorial
const router = express.Router();

router.get("/", getAllTutorials)
router.get("/:id", getTutorial)
router.post("/", createTutorial)

module.exports = router;