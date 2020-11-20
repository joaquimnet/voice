const clearVoiceChannels = require('../services/discord/clearVoiceChannels');

module.exports = (bot) => {
  bot.logger.info(`[Discord] Logged in as ${bot.user.tag}!`);

  bot.user.setActivity('>>help', { type: 'PLAYING' });
  clearVoiceChannels(bot);
};
