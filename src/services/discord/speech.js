const { Duplex } = require('stream');

const log = require('../../config/log');
const synthesize = require('./synthesize');

async function speech(text) {
  const audioContent = await synthesize(text);

  log.debug('Speech Synthesized:', text);

  const stream = new Duplex({ objectMode: false });
  stream._read = function() {
    this.push(audioContent);
    this.push(null);
  };

  return stream;
}

module.exports = speech;
