import dotenv from "dotenv";
dotenv.config();
import { Options } from "graphql-yoga";
import { createConnection } from "typeorm";
import app from "./app";
import ConnectionOptions from "./ormConfig";
import decodeJWT from "./utils/decodeJWT";


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
            //console.log(connectionParams);
            const token = connectionParams["X-JWT"];
            if (token) {
                const user = await decodeJWT(token);
                if (user) {
                    return {
                        currentUser: user
                    }
                }
                throw new Error("User not found");
            }
            throw new Error("Token not found");
        }
    }
}

const handleAppStat = ({port}): void => {
    console.log(`starting on port ${port}`);
    //(<any> process).send('ready') || function () {}
};

createConnection(ConnectionOptions).then(async () => {
    await app.start(appOptions, handleAppStat);
    // process.on("SIGINT", () => {
    //     server.close();
    //     process.exit();
    // })
    
}).catch((error) => console.log(error));
