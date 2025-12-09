const jwt = require('jsonwebtoken');
const prisma = require('../lib/prisma');
const secret_key = process.env.JWT_SECRET || 'loverboySAM1729';

const authenticate = (req, res, next) => {
  const token = req.cookies.token;
  
  if (!token) {
    return next();
  }

  jwt.verify(token, secret_key, async (err, decoded) => {
    if (err) {
      return next();
    }
    
    try {
      req.user = await prisma.user.findUnique({
        where: { id: decoded.userId }
      });
      next();
    } catch (error) {
      console.error('Error fetching user:', error);
      next();
    }
  });
};

// Middleware that requires authentication
const requireAuth = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Authentication required' });
  }
  next();
};

module.exports = { authenticate, requireAuth };
