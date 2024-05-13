const env = process.env.REACT_APP_ENV || 'default';

let config;
try {
  config = require(`./${env}`);
} catch (error) {
  console.error(`Failed to load configuration for environment: ${env}`);
  config = require('./default');
}

module.exports = config;