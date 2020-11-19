const log = require('../config/log');
const clearVoiceChannels = require('../services/discord/clearVoiceChannels');

module.exports = (bot) => {
  log.info(`[Discord] Logged in as ${bot.user.tag}!`);

  bot.user.setActivity('>>help', { type: 'PLAYING' });
  clearVoiceChannels(bot);
};
