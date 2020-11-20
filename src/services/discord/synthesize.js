const log = require('../../config/log');

const { TextToSpeechClient } = require('@google-cloud/text-to-speech');
const ttsClient = new TextToSpeechClient();

module.exports = (text, voice) => {
  return new Promise((resolve, reject) => {
    if (!voice) {
      voice = require('./voices').get('popon');
    }
    // Google TTS request
    const request = {
      input: { text },
      voice: voice.voice,
      audioConfig: voice.audioConfig,
    };

    // Performs the Text-to-Speech request
    ttsClient.synthesizeSpeech(request, (err, response) => {
      if (err) {
        log.error('[Speech] Could not synthesize speech.', request);
        reject(err);
        return;
      }

      resolve(response.audioContent);
    });
  });
};
