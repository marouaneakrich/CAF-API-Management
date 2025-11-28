const jwt = require('jsonwebtoken');

//authentication
exports.authentication = (req, res, next) => {
    try{
        const authHeader = req.headers.authorization;
        
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ 
                error: 'Access denied. No token provided.' 
            });
        }
        
        // Extract token (format: "Bearer TOKEN")
        const token = authHeader.split(' ')[1];
        
        if (!token) {
            return res.status(401).json({ 
                error: 'Access denied. No token provided.' 
            });
        }
        
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Attach user info to request
        req.user = decoded;
        
        next();
        
    } catch (error) {

        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ 
                error: 'Token expired. Please login again.' 
            });
        }
        
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ 
                error: 'Invalid token.' 
            });
        }
        
        return res.status(401).json({ 
            error: 'Authentication failed.',
            details: error.message 
        });
    }
};

//authorization
exports.authorization = (...allowedRoles) => {
    return (req, res, next) => {
        // 1. Check if user exists (should be set by authenticate middleware)
        if (!req.user) {
            return res.status(401).json({ 
                error: 'Authentication required.' 
            });
        }
        
        // 2. Check if user's role is in allowed roles
        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({ 
                error: 'Forbidden. You do not have permission to access this resource.' 
            });
        }
        
        // 3. User is authorized, continue
        next();
    };
};
