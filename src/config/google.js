const path = require('path');
const fs = require('fs');
const log = require('./log');

const windows = process.platform === 'win32';
const filename = path.join(windows ? './' : '/tmp', 'tts.json');

if (!process.env.GOOGLE_CREDENTIALS) {
  log.getLogger('critical').error('GOOGLE_CREDENTIALS Not Found');
  process.exit(1);
}

log.info('[Google] Creating credentials file.');

writeCredentialsFile();

process.env['GOOGLE_APPLICATION_CREDENTIALS'] = filename;

process.on('beforeExit', () => {
  deleteFileIfItExists();
});

function writeCredentialsFile() {
  const json = JSON.parse(process.env.GOOGLE_CREDENTIALS);
  const data = JSON.stringify(json, null, 2);
  fs.writeFileSync(filename, data);
}

function deleteFileIfItExists() {
  if (fs.existsSync(filename)) {
    fs.unlinkSync(filename);
    log.debug('[Google] Deleting credentials file.');
  }
}
