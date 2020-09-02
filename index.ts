import * as http from 'http';

const server = http.createServer();

server.on('request', ()=> {
    console.log('有人请求了')
})

server.listen(8888)



