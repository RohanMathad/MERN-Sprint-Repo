export const requireRole = (allowedRoles) => {
    return (req, res, next) => {
        // req.user is set by verifyToken
        if (!req.user || !allowedRoles.includes(req.user.role)) {
            return res.status(403).json({ 
                success: false, 
                message: 'Forbidden. You do not have the required permissions.' 
            });
        }
        next();
    };
};