const asyncErrorWrapper = require('express-async-handler');
const { Tutorial } = require('../helpers/database/database')


const getAllTutorials = asyncErrorWrapper(async (req, res, next) => {

  const tutorials = await Tutorial.findAll();
  res.status(200)
    .json({
      success: true,
      data: tutorials
    })
})

const getTutorial = asyncErrorWrapper(async (req, res, next) => {

  const tutorialId = req.params.id

  const tutorial = await Tutorial.findByPk(tutorialId, { include: ["comments"] });
  res.status(200)
    .json({
      success: true,
      data: tutorial
    })
})


const createTutorial = asyncErrorWrapper(async (req, res, next) => {

  const { title, content } = req.body

  const tutorial = await Tutorial.create({
    title,
    content
  });

  res.status(200)
    .json({
      success: true,
      data: tutorial
    })
})

module.exports = {
  getAllTutorials,
  createTutorial,
  getTutorial
}