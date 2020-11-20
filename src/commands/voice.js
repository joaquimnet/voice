const { Command } = require('@ponatech/bot');

module.exports = new Command({
  name: 'voice',
  description: 'Makes Voice join or leave a voice channel.',
  usage: '[join|leave]',
  guildOnly: true,
  run(bot, message, { args }) {
    const gId = message.channel.guild.id;
    const conns = message.client.voice.connections;

    const voiceState = message.guild.voiceStates.cache.get(message.member.id);
    const userChannel = voiceState
      ? message.guild.channels.cache.get(voiceState.channelID)
      : undefined;
    const botChannel = conns.get(gId);

    const hasArg = args[0] ? true : false;
    const isJoin = ['join', 'start'].includes(args[0]);
    const isLeave = ['leave', 'stop'].includes(args[0]);

    const userIsInAVoiceChannel = userChannel || false;
    const botIsInAVoiceChannel = botChannel || false;

    let isSameChannel = false;
    if (userChannel && botChannel) {
      isSameChannel = userChannel.id === botChannel.id;
    }

    function error() {
      message.channel.send(
        "I could not join the voice channel. It is full or I don't have permission to join it.",
      );
      console.error(
        '[Speech] Could not join voice channel. ' + userChannel.id + ' / ' + userChannel.guild.id,
      );
    }

    // If has arguments
    if (hasArg && isJoin) {
      if (userIsInAVoiceChannel) {
        if (isSameChannel) return;
        userChannel.join().catch(error);
        return;
      } else {
        return message.channel.send('Please, join a voice channel first.');
      }
    }
    if (hasArg && isLeave) {
      if (botIsInAVoiceChannel) {
        return conns.get(gId).disconnect();
      } else {
        return message.channel.send('Voice is not in any voice channel.');
      }
    }
    // If has no arguments or is not join or leave
    if (userIsInAVoiceChannel) {
      if (botIsInAVoiceChannel) {
        if (isSameChannel) {
          return conns.get(gId).disconnect();
        } else {
          return userChannel.join().catch(error);
        }
      } else {
        return userChannel.join().catch(error);
      }
    }
    // If no arguments and user is not in a channel
    if (botIsInAVoiceChannel) {
      return conns.get(gId).disconnect();
    } else {
      return message.channel.send('Neither you or Voice are in a channel.');
    }
  },
});
