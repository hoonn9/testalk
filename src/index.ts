import dotenv from "dotenv";
dotenv.config();
import { Options } from "graphql-yoga";
import { createConnection } from "typeorm";
import app from "./app";
import ConnectionOptions from "./ormConfig";


const PORT: number | string = process.env.PORT || 4000;
const PLAYGROUND_ENDPOINT: string = "/playground";
const SUBSCRIPTION_ENDPOINT: string = "/subscription"
const GRAPHQL_ENDPOINT: string = "/graphql";

const appOptions: Options = {
    port: PORT,
    playground: PLAYGROUND_ENDPOINT,
    endpoint: GRAPHQL_ENDPOINT,
    subscriptions: {
        path: SUBSCRIPTION_ENDPOINT,
        onConnect: async connectionParams => {

        }
    }
}

const handleAppStat = () => console.log(`starting on port ${PORT}`);

createConnection(ConnectionOptions).then(() => {
    app.start(appOptions, handleAppStat);
}).catch((error) => console.log(error));
