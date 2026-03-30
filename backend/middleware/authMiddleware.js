const jwt = require('jsonwebtoken') ;


const authMiddleware = (req, res, next) => {
    try{
        // Get token from Authorization header: "Bearer token"
        const token = req.headers.authorization?.split(' ')[1];
        
        if(!token){
            return res.status(401).json({ message: 'Unauthorized: No token provided', success: false });
        }
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY || 'secretKey123');
        
        if(!decoded || !decoded.id){
            return res.status(401).json({ message: 'Unauthorized: Invalid token', success: false });
        }
        req.id = decoded.id;
        req.role = decoded.role;
        next();
    } catch (error) {
        console.log("JWT Error:", error.message);
        return res.status(401).json({ message: 'Unauthorized: Token verification failed', success: false });
    }   
};

module.exports = authMiddleware;

