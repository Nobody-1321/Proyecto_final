import http from 'http2';
import fs from 'fs';
import { Server } from './presentation/server';
import { envs} from './config/envs';
import { AppRoutes } from './presentation/routes';


(async () => {
    main();
}
)();

function main() {
    console.log('Hello World');
    const server = new Server({
        PORT: envs.PORT,
        routes: AppRoutes.routes(),
        PUBLIC_PATH: envs.PUBLIC_PATH
    });
    server.start();
}






/*
const server = http.createSecureServer({
    key: fs.readFileSync('./keys/server.key'),
    cert: fs.readFileSync('./keys/server.crt')
}, (req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello World');
});

server.listen(8000, () => {
    console.log('server is listening on 8443');
}); 

*/