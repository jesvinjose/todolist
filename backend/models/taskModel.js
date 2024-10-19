const mongoose = require("mongoose");

const taskSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    completionStatus: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Task=mongoose.model('Task',taskSchema);
module.exports=Task;