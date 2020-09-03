import * as http from 'http';
import {IncomingMessage, ServerResponse} from 'http';

const server = http.createServer();

server.on('request', (request: IncomingMessage, response: ServerResponse)=> {
    console.log('有人请求了')
    console.log(request.method);
    console.log(request.url);
    console.log(request.headers);
    const array = []
    request.on('data', chunk => {
        array.push(chunk)
    })
    request.on('end', ()=> {
        const body = Buffer.concat(array).toString();
        console.log(body, 'body');
        response.statusCode = 404
        response.setHeader('xxx', 'yyy')
        response.setHeader('Content-Type', 'image/img')
        response.write('1\n')
        response.end()
    })
})

server.listen(8888)



