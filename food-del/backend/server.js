import express  from "express"
import cors from 'cors'
import mongoose from "mongoose"
import bodyParser from "body-parser"
import { connectDB } from "./config/db.js"
import userRouter from "./routes/userRoute.js"
import foodRouter from "./routes/foodRoute.js"
import 'dotenv/config'
import cartRouter from "./routes/cartRoute.js"
import orderRouter from "./routes/orderRoute.js"


// app config
const app = express()
const port = process.env.PORT || 4000;


// middlewares
app.use(express.json())
app.use(cors())
app.use(bodyParser.json());

// db connection
connectDB()

// api endpoints
app.use("/api/user", userRouter)
app.use("/api/food", foodRouter)
app.use("/images",express.static('uploads'))
app.use("/api/cart", cartRouter)
app.use("/api/order",orderRouter)

app.get("/", (req, res) => {
    res.send("API Working")
  });


  app.get('/api/compare', (req, res) => {
    const { item } = req.query;
    if (!item) {
      return res.status(400).send('Item name is required');
    }
    const comparisonData = foodItems.filter(food => food.name.toLowerCase() === item.toLowerCase());
    res.json(comparisonData);
  });
 
  
  

app.listen(port, () => console.log(`Server started on http://localhost:${port}`))