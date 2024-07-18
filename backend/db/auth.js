import jwt from 'jsonwebtoken'


const isAuthenticated = async(req, res, next) =>{
    try {
        const token = req.cookies?.token
        if(!token) {
            return res.status(401).json({
                message:"User not authenticated",
                success: false,
                isLoginRequired: true
            })
        }
        
        try {
            const decode = await jwt.verify(token, process.env.JWT_SECRET);
            req.userId = decode.userId
        } catch (error) {
            return res.status(401).json({
                message:"Invalid token, Login again",
                success: false,
                isLoginRequired: true
            })
        }
        next()
    } catch (error) {
        console.log("isAuthenticated error: " + error);
    }

}

export default isAuthenticated;