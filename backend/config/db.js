import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('---Mongodb URI---').then(() => console.log("DB Connected"));
}