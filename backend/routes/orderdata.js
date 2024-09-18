const express = require('express');
const router = express.Router();
const Order = require('../models/Orders'); // Ensure this path is correct

router.post('/orderdata', async (req, res) => {
    const { order_data, email, order_date } = req.body;

    // Add order_date to the beginning of the order_data array
    order_data.unshift({ Order_date: order_date });

    try {
        // Find existing order by email
        let existingOrder = await Order.findOne({ email: req.body.email });

        if (existingOrder) {
            // Update existing order
            await Order.findOneAndUpdate(
                { email: email },
                { $push: { order_data: order_data } }
            ).then(() => {
                res.json({ success: true })

            })
        }
        else {
            // Create a new order
            await Order.create({
                email: email,
                order_data: [order_data]
            }).then(() => {
                res.json({ success: true });
            })
        }

    } catch (error) {
        console.error(error.message);
        res.status(500).send(error.message);
    }
});

module.exports = router;
