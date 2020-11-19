const events = require('../../events');

module.exports = client => {
  for (const connection of client.voice.connections.values()) {
    if (connection.channel) {
      connection.channel.leave();
    }
    connection.disconnect();
  }

  function leaveFromEmpty() {
    for (const connection of client.voice.connections.values()) {
      if (connection.channel.members.size - 1 === 0) connection.disconnect();
    }
  }

  const interval = setInterval(leaveFromEmpty, 2 * 60 * 1000);

  process.on('exit', code => {
    for (const connection of client.voice.connections.values()) {
      if (connection.channel.members.size - 1 === 0) connection.disconnect();
    }
  });

  events.on('kill', () => clearInterval(interval));
};
