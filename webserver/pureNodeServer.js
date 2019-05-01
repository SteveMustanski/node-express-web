const http = require('http');

function handler(req, res) {
  res.writeHead(200, { 'Content-type': 'text/plain' });
  res.write('Hello, this is the web server');
  res.end();
}

const server = http.createServer(handler);

server.listen(3000);
