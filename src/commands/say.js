const crypto = require('crypto');
const { Command } = require('sensum');

const speech = require('../services/discord/speech');
const dispatchers = require('../services/discord/dispatchers');

// TODO: Save in the database the amount of characters the guilds tts and limit it

const queue = {};

module.exports = new Command({
  name: '.',
  description: 'Say what you type in the connected voice channel.',
  delete: true,
  cooldown: 0,
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

    if (content.length >= 2048) {
      return message.channel.send('Whoa there. Try not to send more than 2048 characters at once.');
    }

    const addStreamToDispatchers = (stream) => {
      const dispatch = voiceConnection.play(stream, {
        seek: 0,
        volume: 1,
        bitrate: 96000,
      });
      dispatchers.add(dispatch);
      if (Object.values(queue).length) {
        dispatch.addListener('finish', () => {
          const [k, val] = Object.entries(queue);
          delete queue[k];
          speech(val).then(addStreamToDispatchers);
        });
      }
    };

    if (Object.values(queue).length) {
      queue[hash(content)] = content;
      return;
    }

    speech(content).then(addStreamToDispatchers);
  },
});

function hash(content) {
  return crypto.createHash('md5').update(content).digest('hex').toString('hex');
}
