require('dotenv').config();

module.exports = {
  mongoURI: process.env.MONGO_URI || 'mongodb://localhost:27017/notaria',
  port: process.env.PORT || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  allowedIPs: process.env.ALLOWED_IPS ? process.env.ALLOWED_IPS.split(',') : ['127.0.0.1'],
  jwtSecret: process.env.JWT_SECRET || 'secret-local-dev'
};
