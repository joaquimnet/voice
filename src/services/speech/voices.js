const merge = require('deepmerge');

const voices = new Map();

const defaultVoice = {
  voice: { languageCode: 'en-US', name: 'en-US-Wavenet-B' },
  audioConfig: {
    audioEncoding: 'LINEAR16',
    pitch: '1.0',
    speakingRate: '1.0',
    sampleRateHertz: '96000',
  },
};

voices.set('default', defaultVoice);

voices.set(
  'popon',
  merge(defaultVoice, {
    voice: { name: 'en-US-Wavenet-F' },
    audioConfig: {
      pitch: '2.00',
      speakingRate: '1.11',
    },
  })
);

voices.set(
  'male',
  merge(defaultVoice, {
    voice: { name: 'en-US-Wavenet-B' },
  })
);

module.exports = voices;
