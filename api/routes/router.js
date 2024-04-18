const express = require("express");

const { register, login } = require("../controllers/auth");
const {
  getAll,
  getOne,
  create,
  update,
  deleteTodo,
} = require("../controllers/todo");
const { verifyToken } = require("../middleware/authMid");

const router = express.Router();

//AUTH
router.post("/register", register);
router.post("/login", login);

//TODO

router.get("/todo/getAll", verifyToken, getAll);
router.get("/todo/getOne/:todo_id", verifyToken, getOne);
router.post("/todo/create", verifyToken, create);
router.delete("/todo/delete/:todo_id", verifyToken, deleteTodo);
router.put("/todo/update/:todo_id", verifyToken, update);

module.exports = { router };
