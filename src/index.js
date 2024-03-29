require('tinv')();
require('./config/google');

const log = require('./config/log');
const Bot = require('./services/discord/bot');
const Web = require('./services/web');
const events = require('./events');

// TODO: queue speech

Bot();
Web();

events.on('kill', () => {
  process.exitCode = 0;
  log.info('[Process] Shutting down.');
});

process.on('SIGTERM', () => events.emit('kill'));
process.on('SIGINT', () => events.emit('kill'));

// you have no reason to let the in between stop you
