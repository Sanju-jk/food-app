const mongoose = require("mongoose");
const { Schema } = mongoose;

const orderSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    order_data: {
        type: Array, // Use an array of mixed types
        required: true
    }
});

module.exports = mongoose.model('Order', orderSchema);
