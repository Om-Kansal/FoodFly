import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js"
import foodRouter from "./routes/foodRoute.js"
import userRouter from "./routes/userRoute.js"
import cartRouter from "./routes/cartRoute.js"
import orderRouter from "./routes/orderRoute.js"



// app config
const app = express()
const port = 4000

app.use(cors({
  origin: "https://food-fly-fln2.vercel.app/",
  credentials: true
}))

// middleware
app.use(express.json())
app.use(cors())

// db connection
connectDB();

// api endpoints
app.use("/api/food",foodRouter)
app.use("/images", express.static("uploads"));
app.use("/api/user",userRouter)
app.use("/api/cart",cartRouter)
app.use("/api/order",orderRouter)

app.get("/",(req,res)=>{
    res.send("API Working")
})

// app.listen(process.env.PORT || port,()=>{
//     console.log(`server Started on http://localhost:${process.env.PORT || port}`)
// })

export default app


// app.listen(port,()=>{
//     console.log(`server Started on http://localhost:${port}`)
// })



