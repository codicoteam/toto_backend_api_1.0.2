const jwt = require('jsonwebtoken');

// Single source of truth for JWT secret
// In production, this should come from environment variable
const JWT_SECRET = process.env.JWT_SECRET || 'toto-academy-super-secret-key-2026';

// Token expiration time
const TOKEN_EXPIRY = '24h';

// Generate token function
const generateToken = (user) => {
  return jwt.sign(
    { 
      id: user._id || user.id, 
      email: user.email,
      role: user.role || 'admin',
      type: 'access'
    }, 
    JWT_SECRET, 
    { expiresIn: TOKEN_EXPIRY }
  );
};

// Verify token function
const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    throw error;
  }
};

// Middleware to authenticate token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN
  
  console.log('Ì¥ë Auth check:', token ? 'Token present' : 'No token');
  
  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Access denied. No token provided.'
    });
  }

  try {
    const decoded = verifyToken(token);
    console.log('‚úÖ Token verified for:', decoded.email);
    req.user = decoded;
    next();
  } catch (error) {
    console.log('‚ùå Token verification failed:', error.message);
    
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Token expired. Please login again.'
      });
    }
    
    return res.status(403).json({
      success: false,
      message: 'Invalid token.'
    });
  }
};

module.exports = {
  JWT_SECRET,
  TOKEN_EXPIRY,
  generateToken,
  verifyToken,
  authenticateToken
};
