const config = require('config');

module.exports = function (req, res, next) {
  if (!config.get('requiresAdmin')) return next();

  const admin = req.user.isAdmin;
  if (!admin) return res.status(403).send('Access denied');
  next();
};
