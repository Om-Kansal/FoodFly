import foodModel from "../models/foodModel.js";
import fs from "fs";
// Note: 'fs' isn't used here; keep minimal imports to avoid lint warnings

// add food item

const addFood = async (req, res) => {

    // multer adds the parsed file to req.file when the request is multipart/form-data
    // If req.file is undefined, bail out with a clear error message so we don't try to read filename
    if (!req.file || !req.file.filename) {
        return res.status(400).json({ success: false, message: "Image file (field `image`) is required." });
    }

    const image_filename = req.file.filename;

    const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        // ensure price is stored as a Number if possible
        price: Number(req.body.price) || 0,
        category: req.body.category,
        image: image_filename
    })
    try{
        await food.save();
        res.json({success:true,message:"Food Added"});

    }catch (error) {
        console.log(error)
        res.json({success:false, message:"Error"});
    }

}

// all food list
const listFood = async (req, res) => {
    try {
        const foods = await foodModel.find({});
        res.json({ success: true, data: foods });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error fetching food list" });
    }    
}

// remove food item
const removeFood = async (req, res) => {
    try {
        const food = await foodModel.findById(req.body._id);
        fs.unlink(`uploads/${food.image}`, () => {})

        await foodModel.findByIdAndDelete(req.body._id);
        res.json({ success: true, message: "Food removed" });
    }catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
}
export { addFood, listFood, removeFood };