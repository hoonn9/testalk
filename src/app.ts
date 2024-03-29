import { GraphQLServer } from 'graphql-yoga';
import cors from 'cors';
import helmet from 'helmet';
import logger from 'morgan';
import schema from './schema';
import { NextFunction, Response } from 'express';
import decodeJWT from './utils/decodeJWT';
import firebase from 'firebase-admin';
import { uploadController } from './upload';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import Redis from 'ioredis';
import { generateRtcToken } from './utils/voiceCall';

const firebaseAccount = require('../testalk-2b9dc-firebase-adminsdk-icfhw-1122c70469.json');
const redisOptions = {
    host: process.env.REDIS_HOST_NAME,
    port: parseInt(process.env.REDIS_PORT ? process.env.REDIS_PORT : '6379', 10),
    retryStrategy: (times) => {
        // reconnect after
        return Math.min(times * 50, 2000);
    },
};
class App {
    public app: GraphQLServer;
    public pubSub: RedisPubSub;

    constructor() {
        this.pubSub = new RedisPubSub({
            publisher: new Redis(redisOptions),
            subscriber: new Redis(redisOptions),
        });
        this.app = new GraphQLServer({
            schema,
            context: (req) => {
                const { connection: { context = null } = {} } = req;
                return {
                    req: req.request,
                    pubSub: this.pubSub,
                    ...context,
                };
            },
        });

        this.middlewares();
        firebase.initializeApp({
            credential: firebase.credential.cert(firebaseAccount),
        });
    }

    private middlewares = (): void => {
        this.app.express.use(cors());
        this.app.express.use(logger('dev'));
        this.app.express.use(helmet());
        this.app.express.use(this.jwt);
        this.app.express.get('/healthCheck', this.healthCheckHandler);
        this.app.express.post('/api/upload', uploadController);
        this.app.express.get('/generateRtcToken', generateRtcToken);
    };

    private jwt = async (req, res: Response, next: NextFunction): Promise<void> => {
        // const testToken = createJWT(14);
        // console.log(testToken);
        const token = req.get('X-JWT');
        if (token) {
            const user = await decodeJWT(token);
            if (user) {
                req.user = user;
            } else {
                req.user = undefined;
            }
        }
        next();
    };

    private healthCheckHandler = (req, res: Response): void => {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write('Health check page');
        res.end();
    };

    // private errorHandler = (err, req, res, next) => {
    //     if (res.headersSent) {
    //         return next(err);
    //     }
    //     const { status } = err;
    //     res.status(status).json(err);
    // };
}

export default new App().app;
