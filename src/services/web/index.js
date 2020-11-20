module.exports = () => {
  const log = require('../../config/log');

  const events = require('../../events');

  const express = require('express');
  const bodyParser = require('body-parser');
  const cors = require('cors');

  const port = process.env.PORT || 3000;

  const app = express();

  app.use(bodyParser.json());
  app.use(cors());

  app.get('*', (req, res) => {
    res.send('Voice!');
  });

  const server = app.listen(port, () => {
    log.info('[Web] Express server listening at port ' + port);
  });

  events.on('kill', () => {
    log.info('[Web] Shutting down.');
    server.close();
  });
};
