module.exports = {
  name: 'guilds',
  description: 'List the guilds the bot is in.',
  hidden: true,
  admin: true,
  execute(message, args) {
    message.client.guilds.cache.map(g => {
      message.channel.send(g.name);
    });
  },
};
