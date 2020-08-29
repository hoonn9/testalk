import { GraphQLServer } from "graphql-yoga";
import {PostgresPubSub} from "graphql-postgres-subscriptions";
import cors from "cors";
import helmet from "helmet";
import logger from "morgan";
import schema from "./schema"
import { NextFunction, Response } from "express";
import decodeJWT from "./utils/decodeJWT";
import firebase from "firebase-admin";
import { uploadController } from "./upload";
import { Client } from "pg"
//import {Cluster} from "cluster";
import {cpus} from "os"

const firebaseAccount = require("../testalk-2b9dc-firebase-adminsdk-icfhw-1122c70469.json");

class App {
    public app: GraphQLServer;
    public client: Client = new Client({
        user:process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        host: process.env.DB_ENDPOINT,
        database:  "testalk",
        port: 5432,
    });
    public pubSub: PostgresPubSub;
    public numCpus = cpus.length;

    constructor() {
        console.log(this.numCpus);
        this.dbConnection();
        this.pubSub = new PostgresPubSub({client: this.client});
        this.app = new GraphQLServer({
            schema,
            context: req => {
                const { connection: { context = null } = {} } = req;
                return {
                    req: req.request,
                    pubSub: this.pubSub,
                    ...context
                }
            }
        });
        
        this.middlewares();
        firebase.initializeApp({
            credential: firebase.credential.cert(firebaseAccount)
        });
    }

    private dbConnection = async (): Promise<void> => {
        await this.client.connect();
    }

    private middlewares = (): void => {
        this.app.express.use(cors());
        this.app.express.use(logger("dev"));
        this.app.express.use(helmet());
        this.app.express.use(this.jwt);
        this.app.express.post("/api/upload", uploadController);
    }

    private jwt = async (req, res: Response, next: NextFunction): Promise<void> => {
        // const testToken = createJWT(14);
        // console.log(testToken);
        const token = req.get("X-JWT");
        if (token) {
            const user = await decodeJWT(token);
            if (user) {
                req.user = user;
            } else {
                req.user = undefined;
            }
        }
        next();
    }

    // private errorHandler = (err, req, res, next) => {
    //     if (res.headersSent) {
    //         return next(err);
    //     }
    //     const { status } = err;
    //     res.status(status).json(err);
    // };
}

export default new App().app;