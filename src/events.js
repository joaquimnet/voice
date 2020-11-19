const events = require('events');

class BotEvents extends events.EventEmitter {}

const botEvents = new BotEvents();

module.exports = botEvents;
