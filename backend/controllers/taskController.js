const Task = require("../models/taskModel");

const addTask = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || !description) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const newTask = new Task({
      title,
      description,
    });

    // Save task to the database
    const savedTask = await newTask.save();

    return res.status(201).json({
      message: "Task added successfully",
      task: savedTask,
    });
  } catch (error) {
    console.error("Error adding task:", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find();

    // Respond with the list of tasks
    res.status(200).json(tasks);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Failed to fetch tasks", error: error.message });
  }
};

const changeCompletionStatus = async (req, res) => {
  try {
    const id = req.params.id; // Get task ID from the request parameters
    const { status } = req.body; // Get the new status from the request body

    // Find the task by ID and update the completionStatus field
    const task = await Task.findByIdAndUpdate(
      id,
      { completionStatus: status },
      { new: true } // Return the updated document
    );

    // If task is not found, return a 404 error
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Return the updated task
    res.status(200).json({ message: "Task status updated successfully", task });
  } catch (error) {
    // Handle any errors that occur
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

const deleteTask = async (req, res) => {
  try {
    const id = req.params.id;
    // Find the task by ID and delete
    const deletedTask = await Task.findByIdAndDelete(id);
    // console.log(deletedTask,'<------------deletedTask');

    // If consultant not found, return an error response
    if (!deletedTask) {
      return res.status(404).json({ message: "task not found." });
    }

    // Respond with a success message
    res.status(200).json({ message: "Task deleted successfully." });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Failed to delete task", error: error.message });
  }
};

const editTask = async (req, res) => {
  try {
    const id = req.params.id;
    const { title, description } = req.body;

    // Find the task by ID and update it
    const updatedTask = await Task.findByIdAndUpdate(
      id, // Correctly passing the id
      {
        title,
        description, // Include description in the update object
      },
      {
        new: true, // Return the updated document
        runValidators: true, // Ensure that validation is applied
      }
    );

    // Check if the task was found and updated
    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Send the updated task as the response
    return res.status(200).json({
      message: "Task updated successfully",
      task: updatedTask,
    });
  } catch (error) {
    console.error("Error updating task:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  addTask,
  getAllTasks,
  changeCompletionStatus,
  deleteTask,
  editTask
};
