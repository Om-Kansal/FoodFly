import userModel from '../models/userModel.js';
import foodModel from '../models/foodModel.js';

//add items to user cart
const addToCart = async (req, res) => {
    try {
        //const userData = await userModel.findOne({_id: req.body.userId});
        const userData = await userModel.findById(req.body.userId);
        if (!userData) {
            return res.json({success:false, message: 'User not found'});
        }

        // ensure cartData is an object
        const cartData = userData.cartData && typeof userData.cartData === 'object' ? {...userData.cartData} : {};

        const itemId = req.body.itemId;
        if (!itemId) {
            return res.json({success:false, message: 'No itemId provided'});
        }

        if (!cartData[itemId]) {
            cartData[itemId] = 1;
        } else {
            cartData[itemId] += 1;
        }

        await userModel.findByIdAndUpdate(req.body.userId, {cartData});
        return res.json({success:true, message: 'Added to cart'});
    }catch (error) {
        console.log(error);
        res.json({success:false, message: 'Error' });
    }
}


//remove items from user cart
const removeFromCart = async (req, res) => {
    try {
        const userId = req.body.userId;
        const itemId = req.body.itemId;

        if (!itemId) {
            return res.json({success:false, message: 'No itemId provided'});
        }

        const userData = await userModel.findById(userId);
        if (!userData) {
            return res.json({success:false, message: 'User not found'});
        }

        const cartData = userData.cartData && typeof userData.cartData === 'object' ? {...userData.cartData} : {};

        if (!cartData[itemId]) {
            return res.json({success:false, message: 'Item not in cart'});
        }

        if (cartData[itemId] > 1) {
            cartData[itemId] -= 1;
        } else {
            // remove item when count reaches 0
            delete cartData[itemId];
        }

        await userModel.findByIdAndUpdate(userId, {cartData});
        return res.json({success:true, message: 'Removed from cart'});
    } catch (error) {
        console.log(error);
        return res.json({success:false, message: 'Error'});
    }
}

// const getCart = async (req, res) => {
//     try {
//         const userId = req.userId || req.body.userId;
//         if (!userId) return res.status(400).json({success:false, message: 'No userId provided'});

//         const userData = await userModel.findById(userId);
//         if (!userData) return res.status(404).json({success:false, message: 'User not found'});

//         const cartData = userData.cartData && typeof userData.cartData === 'object' ? {...userData.cartData} : {};
//         const itemIds = Object.keys(cartData);

//         let products = [];
//         if (itemIds.length > 0) {
//             products = await foodModel.find({_id: {$in: itemIds}});
//         }

//         const cartItems = products.map(p => {
//             const obj = p.toObject();
//             obj.quantity = cartData[p._id] || 0;
//             return obj;
//         });

//         return res.json({success:true, data: {cartItems, cartData}});
//     } catch (error) {
//         console.log('getCart error:', error.message);
//         return res.status(500).json({ success:false, message: 'Server error' });
//     }
// }


const getCart = async (req, res) => {
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;
        return res.json({ success:true,cartData });
    }catch (error) {
        console.log(error);
        return res.json({ success:false, message: "Error" });
    }
}

export { addToCart, removeFromCart, getCart };