const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CarSchema = new Schema(
    {
        make: {
            type: String,
            required: 'Make is required',
            trim: true
        },
        model: {
            type: String,
            required: 'Model is required',
            trim: true
        },
        year: {
            type: Number,
            required: 'Year is required'
        },
        kilometers: Number,
        doors: Number,
        seats: Number,
        color: String,
        price: Number,
        created: {
            type: Date,
            default: Date.now,
            immutable: true
        },
        updated: {
            type: Date,
            default: Date.now
        }
    },
    {
        collection: "cars"
    }
);

// Ensure virtual fields are serialised.
CarSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
    }
});

module.exports = mongoose.model("Car", CarSchema);