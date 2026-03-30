import jwt from 'jsonwebtoken';
import Company from '../models/Company.js';

export const protectCompany = async (req, res, next) => {

    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.json({
            success: false,
            message: "Not authorized"
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("DECODED:", decoded);
console.log("COMPANY ID:", decoded.id);

        req.company = await Company.findById(decoded.id).select('-password');
        req.companyId = decoded.id; // ✅ VERY IMPORTANT

        next();

    } catch (error) {
        res.json({
            success: false,
            message: "Not authorized, Login Again"
        });
    }
}