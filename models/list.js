const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const listSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        puclic: {
            type: Boolean,
            required: true
        },
        todos: [
            {
                type: Schema.Types.ObjectId,
                ref: 'TodoItem'
            }
        ],
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        isRemovable: {
            type: Boolean,
            required: true
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model('List', listSchema);