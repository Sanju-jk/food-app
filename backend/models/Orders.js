const mongoose = require("mongoose");
const { Schema } = mongoose;

const orderSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    order_data: {
        type: [{ type: Schema.Types.Mixed }],
        required: true
    },
    price: {
        type: Number
    }
});

module.exports = mongoose.model('Order', orderSchema);
