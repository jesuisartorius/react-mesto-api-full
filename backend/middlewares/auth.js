const jwt = require('jsonwebtoken');
const NotExistError = require('../errors/not-exist-err');
const { JWT_SECRET } = require('../config/config');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new NotExistError('Ошибка авторизации');
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    next(new NotExistError('Ошибка авторизации'));
  }

  req.user = payload;
  next();
};
