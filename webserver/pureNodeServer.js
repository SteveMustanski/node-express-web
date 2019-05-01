const http = require('http');
const url = require('url');

function handler(req, res) {
  const parsedUrl = url.parse(req.url, true);

  if (parsedUrl.pathname === '/') {
    res.writeHead(200, { 'Content-type': 'text/plain' });
    res.write('Hello, this is the web server');
    res.end();
  } else if (parsedUrl.pathname === '/time') {
    res.writeHead(200, { 'Content-type': 'text/plain' });
    res.write(new Date().toString());
    res.end();
  } else {
    res.writeHead(404, { 'Content-type': 'text/plain' });
    res.write('404, page not found!');
    res.end();
  }
}

const server = http.createServer(handler);

server.listen(3000);
