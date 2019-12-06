const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const listSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        isPublic: {
            type: Boolean,
            required: true
        },
        tasks: [
            {
                type: Schema.Types.ObjectId,
                ref: 'TodoItem'
            }
        ],
        creator: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        isRemovable: {
            type: Boolean,
            required: true
        }
    },
    {timestamps: true}
);

module.exports = mongoose.model('List', listSchema);