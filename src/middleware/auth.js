import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

const verifyToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        console.error('Token verification error:', err.message);
        return reject(new Error('Invalid token'));
      }
      resolve(decoded);
    });
  });
};

const authenticate = async (req, res, next) => {
  try {
    const authorizationHeader = req.headers?.authorization;

    if (!authorizationHeader) {
      return res.status(401).send({ message: 'Authorization token not found' });
    }

    if (!authorizationHeader.startsWith('Bearer ')) {
      return res.status(401).send({ message: 'Invalid authorization format' });
    }

    const token = authorizationHeader.split(' ')[1];

    if (!token) {
      return res.status(401).send({ message: 'Token not found in authorization header' });
    }

    // const decoded = await verifyToken(token);
    req.user = req.user;
    next();
  } catch (err) {
    console.error('Authentication error:', err.message);
    return res.status(401).send({ message: 'Invalid or expired token' });
  }
};

export default authenticate;
