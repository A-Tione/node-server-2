import * as http from 'http';
import {IncomingMessage, ServerResponse} from 'http';
import * as fs from 'fs';
import * as p from 'path'; // 正确处理系统文件路径

const server = http.createServer();
const publicDir = p.resolve(__dirname, 'public'); // 当前文件路径

server.on('request', (request: IncomingMessage, response: ServerResponse)=> {
    const {method, url, headers} = request;
    switch (url) {
        case '/index.html':
            fs.readFile(p.resolve(publicDir, 'index.html'), (err, data) => {
                if (err) throw err;
                response.end(data.toString());
            })
            break;
        case '/style.css':
            fs.readFile(p.resolve(publicDir, 'style.css'), (err, data) => {
                if (err) throw err
                response.end(data.toString())
            })
            break;
        case '/main.js':
            fs.readFile(p.resolve(publicDir, 'main.js'), (err, data) => {
                if (err) throw err
                response.end(data.toString())
            })
            break;
    }
})

server.listen(8888)



