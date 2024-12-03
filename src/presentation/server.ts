import express, { Router } from 'express';
import path from 'path';

interface Options {
    PORT: number;
    routes: Router;
    PUBLIC_PATH: string;
}

export class Server {

    private app = express();
    private readonly port: number;
    private readonly publicPath: string;
    private readonly routes: Router;

    constructor(private options: Options) {
        const { PORT, routes, PUBLIC_PATH } = options;
        this.port = PORT;
        this.routes = routes;
        this.publicPath = PUBLIC_PATH
    }

    async start() {
        
        this.app.use(express.json());

        this.app.use(this.routes);

        this.app.listen(this.port, () => {
            console.log('server is listening on 3000');
        });

    }
}    