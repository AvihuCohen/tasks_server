const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = new Schema(
    {
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        imagePath: {
            type: String,
            required: true
        },
        lists: {
            type: Schema.Types.ObjectID,
            ref: 'List'
        }
    },
    {timestamps: true}
);

module.exports = mongoose.model('User', userSchema);