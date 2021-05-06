const { BotClient: Client, defaultCommands } = require('sensum');

const log = require('../../config/log');
const botConfig = require('../../config/config');
const events = require('../../events');

module.exports = () => {
  const client = new Client(botConfig);
  defaultCommands.forEach((cmd) => client.loadCommand(cmd));

  client.logger = log;

  client.login(process.env.TOKEN);

  events.on('kill', () => {
    log.info('[Discord] Shutting down.');
    client.destroy();
  });
};
