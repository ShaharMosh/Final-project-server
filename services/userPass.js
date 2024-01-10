import userPassName from '../models/userPassName.js';
import jwt from 'jsonwebtoken'

const isLogin = async (email, password) => {
  // Validate the username and password against the User model
  const user = await userPassName.findOne({ email, password });
  if (!user) {
    return null;
  }

  // Generate a token
  const token = jwt.sign({ userId: user._id }, process.env.KEY, { expiresIn: '1h' });
  
  return token;
};

export default {
  isLogin
};
