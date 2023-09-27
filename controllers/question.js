const asyncErrorWrapper = require('express-async-handler');
// const { db } = require('../helpers/database/database')
const { Question } = require('../helpers/database/database')


const getAllQuestions = asyncErrorWrapper(async (req, res, next) => {

  const questions = await Question.findAll();
  res.status(200)
    .json({
      success: true,
      data: questions
    })

  // var sql = "select * from question"
  //   var params = []
  //   db.all(sql, params, (err, rows) => {
  //       if (err) {
  //         res.status(400).json({"error":err.message});
  //         return;
  //       }
  //       res.json({
  //           message: "success",
  //           data: rows
  //       })
  //     });
})

const createQuestion = asyncErrorWrapper(async (req, res, next) => {

  const { title, content } = req.body


  const question = await Question.create({
    title,
    content
  });

  res.status(200)
    .json({
      success: true,
      data: question
    })



  // const { title, content } = req.body

  // const insert = 'INSERT INTO question (title, content) VALUES (?,?)'
  // db.run(insert, [title, content], function (err) {
  //   if (err) {
  //     res.status(400).json({ "error": err.message })
  //     return;
  //   }

  //   console.log('this:', this)
  //   console.log('result:', result)

  //   res.json({
  //     "message": "success"
  //   })
  // })
})

module.exports = {
  getAllQuestions,
  createQuestion
}