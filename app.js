const http = require('http');
const fs = require('fs');
const path = require('path');

const hostname = '127.0.0.1';
const port = 3001;

const server = http.createServer((req, res) => {
  // Serve static files from the /public directory
  if (req.url.match("\.css$")) {
      const cssPath = path.join(__dirname, 'public', req.url);
      fs.readFile(cssPath, (err, data) => {
          if (err) {
              console.error('Error serving CSS file:', err.message);
              res.writeHead(404, {"Content-Type": "text/plain"});
              res.end("CSS file not found.");
              return;
          }
          res.writeHead(200, {"Content-Type": "text/css"});
          res.end(data);
      });
  } else if (req.url.match("\.js$")) {
      const jsPath = path.join(__dirname, 'public', req.url);
      fs.readFile(jsPath, (err, data) => {
          if (err) {
              console.error('Error serving JS file:', err.message);
              res.writeHead(404, {"Content-Type": "text/plain"});
              res.end("JS file not found.");
              return;
          }
          res.writeHead(200, {"Content-Type": "application/javascript"});
          res.end(data);
      });
  } else if (req.url === '/') {
      // Adjusted to serve index.html from the /public directory
      const indexPath = path.join(__dirname, 'public', 'index.html');
      fs.readFile(indexPath, (err, data) => {
          if (err) {
              console.error('Error reading index.html:', err.message);
              res.statusCode = 500;
              res.setHeader('Content-Type', 'text/plain');
              res.end('Error loading index.html. Please check the server logs for more details.');
              return;
          }
          res.statusCode = 200;
          res.setHeader('Content-Type', 'text/html');
          res.end(data);
      });
  } else {
      console.log(`Request for ${req.url} not found.`);
      res.statusCode = 404;
      res.setHeader('Content-Type', 'text/plain');
      res.end('Not Found');
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});