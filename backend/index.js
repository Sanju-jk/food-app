const express = require('express')
const cors = require('cors');

const app = express()
const PORT = 5000

const connectDB = require("./db")
connectDB();

//middleware to handle cors
app.use(cors({
  origin: 'http://localhost:3000', // Adjust this based on your frontend URL
  methods: 'GET, POST, PUT, DELETE',
  allowedHeaders: 'Content-Type, Authorization',
}));


//middleware to handle routes
app.use(express.json())
app.use('/api', require("./routes/user"));
app.use('/api', require("./routes/displaydata"));
app.use('/api', require("./routes/orderdata"));


//creating server at PORT
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})