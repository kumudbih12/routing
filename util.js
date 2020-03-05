'use strict';

/* eslint-disable import/no-extraneous-dependencies */

const path = require('path');
var bodyParser = require('body-parser');
var axios = require('axios');

module.exports = {
  setup(config) {
    const defaults = { mode: 'development', plugins: [], devServer: {} };

    const result = Object.assign(defaults, config);
    const before = function before(app) {
      app.use(bodyParser.json());
      app.use(
        bodyParser.urlencoded({
          extended: true
        })
      );
      app.get('/src/assets/*', (req, res) => {
        const filename = path.join(__dirname, '/src/', req.path);
        res.sendFile(filename);
      });
      app.post('/api*', async function(req, res, next) {
        const sNewUrl = 'http://localhost:3001' + req.url;
        const oOptions = {
          method: 'post',
          url: sNewUrl,
          data: req.body
        };
        const oProxiedResponse = await axios.request(oOptions);

        res.json(oProxiedResponse.data);
      });
    };

    if (result.devServer.before) {
      const proxy = result.devServer.before;
      result.devServer.before = function replace(app) {
        before(app);
        proxy(app);
      };
    } else {
      result.devServer.before = before;
    }

    const output = {
      path: path.dirname(module.parent.filename)
    };

    if (result.output) {
      Object.assign(result.output, output);
    } else {
      result.output = output;
    }

    return result;
  }
};
