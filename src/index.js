require('dotenv').config();
require('./config/google');
const log = require('./config/log');
const Discord = require('./Discord');
const Web = require('./Web');
const events = require('./events');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/popon';

Discord();
Web();

events.on('kill', () => {
  process.exitCode = 0;
  log.info('[Process] Shutting down.');
});

process.on('SIGTERM', () => events.emit('kill'));
process.on('SIGINT', () => events.emit('kill'));
