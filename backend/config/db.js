import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://omkansal285:9761@cluster0.tvu4jki.mongodb.net/food-del').then(() => console.log("DB Connected"));
}