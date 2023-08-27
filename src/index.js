const http = require('http');
const getUsers = require('./modules/users');

const hostname = '127.0.0.1';
const port = 3000;
const server = http.createServer((request, response) => {
  const url = new URL(request.url, 'http://127.0.0.1');
  const params = url.searchParams;
  console.log(url);
  if (params.has('hello')) {
    const helloName = params.get('hello');
    if (helloName) {
      response.statusCode = 200;
      response.statusMessage = 'OK';
      response.setHeader('Content-Type', 'text/plain');
      response.write(`Hello, ${helloName}`);
      response.end();
      return;
    } else {
      response.statusCode = 400;
      response.statusMessage = 'Error';
      response.setHeader('Content-Type', 'text/plain');
      response.write(`Enter a name`);
      response.end();
      return;
    }
  }
  if (params.has('users')) {
    response.statusCode = 200;
    response.statusMessage = 'OK';
    response.setHeader('Content-Type', 'application/json');
    response.write(getUsers());
    response.end();
    return;
  }
  console.log(params);
  if (!url.search) {
    console.log('Hello');
    response.statusCode = 200;
    response.statusMessage = 'OK';
    response.setHeader('Content-Type', 'text/plain');
    response.write('Hello, World!');
    response.end();
    return;
  }
  response.statusCode = 500;
  response.statusMessage = 'Error';
  response.end();
});

server.listen(port, hostname, () => {
  console.log(`Сервер запущен по адресу http://${hostname}:${port}/`);
});
