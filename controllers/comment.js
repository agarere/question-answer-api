const asyncErrorWrapper = require('express-async-handler');
const { Comment } = require('../helpers/database/database')


const createComment = asyncErrorWrapper(async (req, res, next) => {

  const { name, text, tutorialId } = req.body

  const comment = await Comment.create({
    name,
    text,
    tutorialId
  });

  res.status(200)
    .json({
      success: true,
      data: comment
    })
})

module.exports = {
  createComment
}