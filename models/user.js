const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = new Schema(
    {
        email: {
            type: String,
            required: true
        },

        gender: {
            type: String,
            required: true
        },

        phone: {
            type: String,
            required: false
        },

        birthday: {
            type: String,
            required: false
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
            required: false
        },
        lists: [
            {
                type: Schema.Types.ObjectID,
                ref: 'List'
            }
        ]
    },
    {timestamps: true}
);

module.exports = mongoose.model('User', userSchema);