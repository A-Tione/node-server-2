import * as http from 'http';
import {IncomingMessage, ServerResponse} from 'http';
import * as fs from 'fs';
import * as p from 'path'; // 正确处理系统文件路径
import * as url from 'url'; // 处理url字符转相关api

const server = http.createServer();
const publicDir = p.resolve(__dirname, 'public'); // 当前文件路径
let cacheAge = 365 * 86400 // 可控制缓存时间

server.on('request', (request: IncomingMessage, response: ServerResponse)=> {
    const {method, url: path, headers} = request; // url重命名为path字段
    const {pathname, search} = url.parse(path); // pathname获取url路径的部分 search获取url序列化查询部分

    if (method === 'POST') {
        response.statusCode = 405
        response.end()
        return
    }
    let filename = pathname.substr(1);
    if (filename === '') {
        filename = 'index.html'
    }
    fs.readFile(p.resolve(publicDir, filename), (err, data) => {
        if (err) {
            console.log(err,'err');
            if (err.errno === -2) {
                response.statusCode = 404;
                fs.readFile(p.resolve(publicDir, '404.html'), (err1, data1) => {
                    response.end(data1);
                })
            } else {
                response.statusCode = 500;
                response.setHeader('content-type', 'text/html; charset=utf-8')
                response.end('服务器繁忙，请稍后再试');
            }
        } else {
            response.setHeader(`Cache-Control`, `public, max-age=${cacheAge}`)
            response.end(data)
        }
    })
})

server.listen(8888)



