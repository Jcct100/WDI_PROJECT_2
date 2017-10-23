module.exports = {
  port: process.env.PORT || 4000,
  databaseURL: process.env.MONGODB_URI || 'mongodb://localhost/foodbank-database',
  secret: process.env.SESSION_SECRET || 'shh it\'s a secret'
};
