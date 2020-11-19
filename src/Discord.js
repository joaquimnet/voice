module.exports = () => {
  // Node libraries
  const path = require('path');

  // Discord
  const Client = require('@ponatech/bot').BotClient;

  // Config
  const log = require('./config/log');
  const botConfig = require('./config/command');
  const events = require('./events');

  const speech = require('./services/speech/speech');
  const dispatchers = require('./services/discord/dispatchers');

  // Create an instance of a Discord client
  const client = new Client(botConfig);

  client.login(process.env.TOKEN);

  events.on('kill', () => {
    log.info('[Discord] Shutting down.');
    client.destroy();
  });
};
