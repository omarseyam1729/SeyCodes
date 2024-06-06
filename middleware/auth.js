const jwt = require('jsonwebtoken');
const {User}=require('../models');
const secret_key='loverboySAM1729';
let blacklist = [];
const deauth=(req,res,next)=>{
  blacklist.push(req.cookies.token);
  next();
}
const authenticate = (req, res, next) => {
  const token =  req.cookies.token; 
  if (!token || blacklist.includes(token)) {
    return next(); 
  }

  jwt.verify(token, secret_key, async (err, decoded) => {
    if (err) {
      return next(); 
    }
    req.user = await User.findByPk(decoded.userId); 
    next();
  });
};

module.exports = {authenticate,deauth};
