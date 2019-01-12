console.log('this is loaded');

exports.databaseConfig = {
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: 'slayDb',
  host: process.env.DB_HOST
};
