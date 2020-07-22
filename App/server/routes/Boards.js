const express = require("express");
const { isAuth } = require("../middlewares/auth");
const Board = require("../models/Boards");
const mongoose = require("mongoose");

const boardRouter = express.Router();

boardRouter.post("/", isAuth, (req, res, next) => {
  const { title } = req.body;
  console.log(req.userData);
  Board.find()
    .exec()
    .then((board) => {
      const newBoard = new Board({
        user: req.userData._id,
        title,
        columnOrder: [],
      });

      newBoard
        .save()
        .then((result) =>
          res.status(201).json({ message: "created a new board", result })
        )
        .catch((err) => res.status(500).json(err));
    })
    .catch((error) => internalErrorResponse(error, res));
});

boardRouter.patch("/", (req, res) => {
  const { boardId, newColumnOrder } = req.body;
  if (boardId && newColumnOrder) {
    console.log(boardId, newColumnOrder);
    Board.findOneAndUpdate({ _id: boardId }, { columnOrder: newColumnOrder })
      .exec()
      .then((board) => {
        const updatedColumnOrder = board.columnOrder;
        console.log(updatedColumnOrder);

        res
          .status(200)
          .json({ message: "Reorder success", updatedColumnOrder });
      })
      .catch((error) => internalErrorResponse(error, res));
  } else {
    return res.status(400).json({ message: "required parameters are missing" });
  }
});

boardRouter.get("/board/:boardId", (req, res, next) => {
  Board.findOne({ _id: req.params.boardId })
    .exec()
    .then((board) => {
      if (!board) {
        return res
          .status(404)
          .json({ message: "Board with given id was not found" });
      }
      return res.status(200).json({ details: board });
    })
    .catch((error) => internalErrorResponse(error, res));
});

boardRouter.get("/all", isAuth, (req, res, next) => {
  console.log(req.userData._id);
  Board.find({ user: req.userData._id })
    .select("columnOrder title _id")
    .exec()
    .then((boards) => {
      if (boards.length === 0) {
        const firstBoard = new Board({
          user: req.userData._id,
          title: "",
          columnOrder: [],
        });
        return res
          .status(200)
          .json({ message: "Board has not yet created by this user", boards });
      }
      return res.status(200).json({ message: "Success", boards });
    })
    .catch((error) => internalErrorResponse(error, res));
});

module.exports = boardRouter;
