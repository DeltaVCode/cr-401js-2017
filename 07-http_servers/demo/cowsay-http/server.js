'use strict';

const http = require('http');
const PORT = process.env.PORT || 3000;
const url = require('url');
const querystring = require('querystring');

const server = http.createServer((req, res) => {
  console.log('req.url', req.url);
  console.log('req.method', req.method);

  req.url = url.parse(req.url);
  console.log('url', req.url);

  req.url.query = querystring.parse(req.url.query);
  console.log('qs', req.url.query);

  bodyParser(req, (err, body) => {
    if (err) {
      res.writeHead(500);
      res.write(err.toString());
      return res.end();
    }

    console.log('body', body);

    if (!processBody(body, req, res)) return;

    console.log('obj', req.body);

    if (req.method === 'POST' && req.url.pathname === '/echo') {
      res.writeHead(200, {
        'Content-Type': 'application/json',
      });
      res.write(JSON.stringify(req.body));
      res.end();
    }

    res.writeHead(200, {
      'Content-Type': 'text/plain',
    });
    res.write(req.url.href);
    res.end();
  })
});

server.listen(PORT, () => {
  console.log(`HTTP listening on ${PORT}`);
})

function bodyParser(req, callback) {
  switch (req.method) {
    case 'POST':
    case 'PUT':
      let body = '';
      req.on('data', buf => {
        body += buf.toString();
      });
      req.on('end', () => callback(null, body));
      req.on('error', err => callback(err));
      break;
    default:
      if (req.url.path.startsWith('/error')) {
        return callback(new Error('oh noes'));
      }

      req.body = null;
      callback(null, null);
  }
}

function processBody(body, req, res) {
    const reqContentType = req.headers['content-type'];
    switch (reqContentType) {
      case 'application/json':
        console.log('json', body);
        try {
          req.body = JSON.parse(body);
        } catch (err) {
          res.writeHead(400);
          res.write(err.message);
          return res.end();
        }
        return true;

      case 'text/plain':
        /*
        res.writeHead(200, {
          'Content-Type': 'text/plain',
        });
        res.write(body);
        return res.end();
        */
        req.body = body;
        return true;

      default:
        console.warn(
          `Unexpected content-type: ${reqContentType}`);
        res.writeHead(400);
        return res.end();
    }
}
