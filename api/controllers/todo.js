const Todo = require("../models/Todo");

const getAll = async (req, res) => {
  try {
    const todos = await Todo.findAll();

    if (!todos || todos.length === 0) {
      return res.status(404).json({ message: "There's no to-do yet." });
    }

    return res.status(200).json({
      message: "All todos retrieved.",
      todos,
    });
  } catch (error) {
    console.error("Error fetching todos:", error);

    return res
      .status(500)
      .json({ message: "An error occurred while fetching todos." });
  }
};

const getOne = async (req, res) => {
  try {
    const { todo_id } = req.params;

    if (!todo_id) {
      return res.status(400).json({ message: "Please provide a todo ID" });
    }

    const todo = await Todo.findByPk(todo_id);

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    return res.status(200).json({ todo });
  } catch (error) {
    console.error(error);

    return res
      .status(500)
      .json({ message: "An error occurred while fetching todos." });
  }
};

const create = async (req, res) => {
  try {
    const { user_id, text, time } = req.body;

    console.log(user_id);

    if ((!user_id, !text, !time)) {
      return res.status(400).json({ message: "Please fill out all fields!" });
    }

    const newTodo = await Todo.create({
      user_id,
      text,
      time,
    });

    return res
      .status(201)
      .json({ todo: newTodo, message: "Todo created successfully" });
  } catch (error) {
    console.error(error);

    return res
      .status(500)
      .json({ message: "An error occurred while creating todos." });
  }
};

const deleteTodo = async (req, res) => {
  try {
    const { todo_id } = req.params;

    if (!todo_id) {
      return res.status(400).json({ message: "Please provide a todo ID!" });
    }

    const numDeletedRows = await Todo.destroy({
      where: {
        todo_id: todo_id,
      },
    });

    if (numDeletedRows === 1) {
      return res.status(200).json({ message: "Todo deleted successfully." });
    } else {
      return res
        .status(404)
        .json({ message: "Todo not found or already deleted." });
    }
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "An error occurred while deleting the todo." });
  }
};

const update = async (req, res) => {
  try {
    const { todo_id } = req.params;
    const { text, time } = req.body;

    if (!todo_id || !text || !time) {
      return res.status(400).json({ message: "Please fill out all fields!" });
    }

    const todo = await Todo.findByPk(todo_id);

    if (!todo) {
      return res.status(404).json({ message: "Todo not found." });
    }

    todo.text = text;
    todo.time = time;
    await todo.save();

    return res.status(200).json({ message: "Todo updated successfully." });
  } catch (error) {
    console.error(error);

    return res
      .status(500)
      .json({ message: "An error occurred while updating the todo." });
  }
};

module.exports = { getAll, getOne, create, deleteTodo, update };
