import userPassName from '../models/userPassName.js';
import jwt from 'jsonwebtoken'

const getDetails = async (email, authorization) => {
    // Check if authorization header exists
    if (!authorization || !authorization.startsWith('Bearer ')) {
        return null;
    }

    // Extract the token from the authorization header
    const token = JSON.parse(authorization.split(' ')[1]).token;

    try {
        jwt.verify(token, process.env.KEY);

        const user = await userPassName.findOne(
            { email: email },
            { firstName: 1, lastName: 1 }
        ).exec();

        if (user) {
            const profile = {
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName
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
