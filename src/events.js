const events = require('events');

class BotEvents extends events.EventEmitter {}

module.exports = new BotEvents();
