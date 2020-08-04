import express, { Application } from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";

// Routes
import IndexRoutes from "./routes/index.routes";
import UserRoutes from "./routes/user.routes";
import JsonRoutes from "./routes/jsonData.routes";
import ApiRoutes from "./routes/api.routes";

import config from "./config/config";

export class App {

    private app: Application;

    constructor(private port?: number | string) {
        this.app = express();
        this.settings();
        this.middlewares();
        this.routes();
    }

    settings() {
        this.app.set('port', this.port || process.env.PORT || 4000);
        this.app.set('json spaces', 2);
        this.app.set('secretWordShh', config.jwtSecret);
    }

    middlewares() {
        this.app.use(morgan('dev'));
        this.app.use(cors());
        this.app.use(helmet());
        this.app.use(express.json());
    }

    routes() {
        this.app.use(IndexRoutes);
        // this.app.use('/setup', setupRoutes);
        this.app.use('/api', ApiRoutes);
        this.app.use('/api/user', UserRoutes);
        this.app.use('/api/json', JsonRoutes);
    }

    async listen() {
        await this.app.listen(this.app.get('port'));
        console.log('Server on port', this.app.get('port'));
        
    }
}