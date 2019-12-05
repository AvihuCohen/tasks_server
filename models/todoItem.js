const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const todoItemSchema = new Schema(
    {
        task: {
            type: String,
            require: true
        },
        completed: {
            type: Boolean,
            require: true
        },
        important: {
            type: Boolean,
            require: true
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('TodoItem', todoItemSchema);