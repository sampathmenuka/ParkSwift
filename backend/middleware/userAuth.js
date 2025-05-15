import jwt from 'jsonwebtoken'
import userModel from '../models/userModel.js';

const userAuth = async (req, res, next) => {

  const {token} = req.cookies;

  if (!token) {
    return res.json({success:false, message: "Not Authorized. Login Again"})
  }

  try {

    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);

    const user = await userModel.findById(tokenDecode.id);

    if (!user) {
      return res.json({ success: false, message: 'User not found' });
    }

    req.user = user;

    next();

  } catch (error) {
      return res.json({success:false, message: error.message})
  }

}


const authorizeRoles = (...roles) => {

  return (req, res, next) => {
    console.log('Role of current user:', req.user.role); // Debug

    if (!roles.includes(req.user.role)) {
      return res.json({success: false, message: 'Access denied'})
    }
    next();
  }
}

export { userAuth, authorizeRoles };