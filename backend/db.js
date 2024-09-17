// db.js or wherever you are configuring the Mongoose connection
const mongoose = require('mongoose');

async function connectDB() {
    try {
        await mongoose.connect('mongodb+srv://foodify:foodify123@cluster0.os64c.mongodb.net/foodify?retryWrites=true&w=majority&appName=Cluster0');
        console.log('MongoDB connected successfully');
        const db = mongoose.connection.db;

        // Fetch data from the 'food_items' collection
        const foodItems = await db.collection("food_items").find({}).toArray();
        const foodCategory = await db.collection("food_category").find({}).toArray();
        // console.log(fetchedData)
        global.food_items = foodItems;
        global.food_category = foodCategory;
     } catch (err) {
        console.error('MongoDB connection error:', err);
    }
}

module.exports = connectDB;
