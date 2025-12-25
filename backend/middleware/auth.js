import jwt from 'jsonwebtoken';

const authMiddleware = async (req, res, next) => {
    // accept token either in `token` header or `Authorization: Bearer <token>`
    const tokenHeader = req.headers.token || req.headers.authorization;
    let token = null;

    if (tokenHeader) {
        if (typeof tokenHeader === 'string' && tokenHeader.startsWith('Bearer ')) {
            token = tokenHeader.split(' ')[1];
        } else {
            token = tokenHeader;
        }
    }

    if (!token) {
        return res.status(401).json({success:false, message: 'Not Authorized. Login again.' });
    }

    try {
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
        const id = token_decode.id || token_decode._id || token_decode.userId;
        if (!id) {
            return res.status(401).json({success:false, message: 'Invalid token payload' });
        }

        // Protect against req.body being undefined
        req.userId = id;
        req.body = req.body || {};
        req.body.userId = id;
        next();
    } catch (error) {
        console.log('auth error:', error.message);
        return res.status(401).json({success:false, message: 'Invalid token' });
    }
}

export default authMiddleware; 



// import jwt from 'jsonwebtoken';

// const authMiddleware = async (req, res, next) => {
//     const {token} = req.headers;

//     if (!token) {
//         return res.json({success:false, message: 'Not Authorized Login Again' });
//     }
//     try {
//         const token_decode = jwt.verify(token, process.env.JWT_SECRET);
//         req.body.userId = token_decode.id;
//         next();
//     }catch (error) {
//         console.log(error);
//         res.json({success:false, message: 'Error' });
//     }
// }

// export default authMiddleware; 