// This file now just re-exports from the shared config
const { authenticateToken, generateToken } = require('../configs/jwt_config');

module.exports = {
  authenticateToken,
  generateToken
};
