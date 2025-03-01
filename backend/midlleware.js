const { JWT_SECRET } = require("./config");
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ success: false, message: "Access denied. No token provided." });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET);

        if (!decoded.userId) {
            return res.status(401).json({ success: false, message: "Invalid token: userId missing." });
        }

        req.userId = decoded.userId; 
        next(); 
    } catch (err) {
        return res.status(403).json({ success: false, message: "Invalid or expired token." });
    }
};

module.exports = authMiddleware;