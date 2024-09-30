const mongoose = require("mongoose");
const TaskScheam = new mongoose.Schema(
  {
    title: { type: String },
    description: { type: String },
    status: { type: String },
    email: { type: String },
    createdDate: { type: String },
  },
  { versionKey: false }
);

const TaskModel = mongoose.model("tasks", TaskScheam);
module.exports = TaskModel;
