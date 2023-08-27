//  Запуск сервера HTTP ( GET,POST)

const http = require('http');
const url = require('url');
const { parse } = require('querystring');

http
  .createServer((request, response) => {
    console.log('Server work');
    if (request.method === 'GET') {
      //GET - получить и обработать
      let urlRequest = url.parse(request.url, true);
      console.log(urlRequest.query.test); // Получили параметр
      response.end('Blah blah');
    } else {
      //POST
      let body = '';
      request.on('data', (chunk) => {
        body += chunk.toString();
      });
      request.on('end', () => {
        let params = parse(body);
        console.log(params);
        console.log(params.lox);
        response.end('ok');
      });
    }
  })
  .listen(3000);
