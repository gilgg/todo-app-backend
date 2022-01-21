const mongoose = require("mongoose");

const todoSchema = mongoose.Schema({
  desc: {
    type: String,
    required: true,
    trim: true,
  },
  isCompleted: {
    type: Boolean,
    default: false,
    trim: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
});

// remove the fields that the frontend doesnt need before sending it back to the frontend
todoSchema.methods.toJSON = function () {
  const todo = this;
  const todoObject = todo.toObject();

  delete todoObject.owner;
  delete todoObject.__v;

  return todoObject;
};

const Todo = mongoose.model("Todo", todoSchema);
module.exports = Todo;
