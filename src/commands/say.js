const { Command } = require('@ponatech/bot');

const speech = require('../services/discord/speech');
const dispatchers = require('../services/discord/dispatchers');

// TODO: Save in the database the amount of characters the guilds tts and limit it

module.exports = new Command({
  name: '.',
  description: 'Say what you type in the connected voice channel.',
  run(bot, message, { content }) {
    if (message.channel.type !== 'text') return;

    // Get author's voice channel
    const voiceState = message.guild.voiceStates.cache.get(message.member.id);
    const voiceChannel = voiceState
      ? message.guild.channels.cache.get(voiceState.channelID)
      : undefined;

    if (!voiceChannel) {
      return message.channel.send('Please join a voice channel first.');
    }

    voiceChannel.join();

    const voiceConnection = message.client.voice.connections.get(message.guild.id);

    if (!voiceConnection) {
      return message.channel.send('I am not connected to any voice channel. Use >>voice join');
    }

    if (content.length >= 300) {
      return message.channel.send('Whoa there. Try not to send more than 300 characters at once.');
    }

    speech(content).then((stream) =>
      dispatchers.add(
        voiceConnection.play(stream, {
          seek: 0,
          volume: 1,
          bitrate: 96000,
        }),
      ),
    );
  },
});
