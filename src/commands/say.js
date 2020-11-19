const { Command } = require('@ponatech/bot');
const speech = require('../services/speech/speech');
const { prefix } = require('../config/command');
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

    // Check if it exists
    if (!voiceChannel) {
      return message.channel.send('Please join a voice channel first.');
    }

    // Join it
    voiceChannel.join();

    // Get the voice connection
    const voiceConnection = message.client.voice.connections.get(message.guild.id);

    if (voiceConnection) {
      if (content.length >= 300) {
        return message.channel.send(
          'Whoa there. Try not to send more than 300 characters at once.',
        );
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

      // Construct the request
    } else {
      return message.channel.send('I am not connected to any voice channel. Use >>voice join');
    }
  },
});
