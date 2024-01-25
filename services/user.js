import userPassName from '../models/user.js';
import jwt from 'jsonwebtoken'

const getDetails = async (req, authorization) => {
    // Check if authorization header exists
    if (!authorization || !authorization.startsWith('Bearer ')) {
        return null;
    }

   
    const token = authorization.split(' ')[1];

    // Extract the token from the Authorization header
    const decodedToken = jwt.decode(token);

    if (!decodedToken || !decodedToken.userId) {
        return res.status(401).json({ error: 'Invalid token' });
    }

    // Extract the user's ID from the decoded token
    const userId = decodedToken.userId;


    try {
    
        jwt.verify(token, process.env.KEY);
        const user = await userPassName.findById(userId);
       
        if (user) {
            const profile = {
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                password: user.password
            };
            return profile;
        }
    } catch (err) {
        return null;
    }
}

export default {
    getDetails
};
