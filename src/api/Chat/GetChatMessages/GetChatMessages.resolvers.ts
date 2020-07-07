import { GetChatMessagesQueryArgs, GetChatMessagesResponse } from "../../../types/graph"
import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import User from "../../../entities/User";
import { format } from "date-fns"
import { getRepository, MoreThan } from "typeorm";
import Chat from "../../../entities/Chat";

const MoreThanDate = (timestamp: string) => MoreThan(format(new Date(parseInt(timestamp)), 'yyyy-MM-dd HH:mm:ss.SSSSSS'))
//const LessThanDate = (timestamp: string) => LessThan(format(new Date(parseInt(timestamp)), 'yyyy-MM-dd HH:mm:ss.SSSSSS'))
const resolvers: Resolvers = {
    Query: {
        GetChatMessages: privateResolver(async (_, args: GetChatMessagesQueryArgs, { req }): Promise<GetChatMessagesResponse> => {
            const user: User = req.user;
            const { chatId, requestTime } = args;
            if (requestTime) {
                console.log("챗Id", chatId, "userId", user.id, "requestTime", new Date(parseInt(requestTime)))
            } else {
                console.log("챗Id", chatId, "userId", user.id, "requestTime", requestTime)
            }
            if (!user) {
                return {
                    ok: false,
                    error: "You have no authority.",
                    messages: null
                }
            }
            //console.log(MoreThanDate(requestTime));

            try {
                if (requestTime) {
                    // const chat = await getRepository(Chat).findOne({
                    //     relations: ["messages"],
                    //     where: {
                    //         messages: {
                    //             updatedAt
                    //                 : MoreThanDate(requestTime)
                    //         }
                    //     },
                    //     order: {
                    //         createdAt: "DESC"
                    //     }
                    // })
                    //console.log(users.find);

                    const chat = await getRepository(Chat).findOne({
                        relations: ["messages"],
                        join: { alias: "chat", innerJoin: { messages: "chat.messages" } },
                        where: qb => {
                            qb.where({
                                id: chatId
                            }).andWhere({ createdAt: MoreThanDate(requestTime) });

                        }
                    })
                    // const chat2 = await getRepository(Chat).findOne({
                    //     relations: ["messages"],
                    //     where: { id: chatId }
                    // })
                    // console.log(chat2);

                    // const chat = await getRepository(Chat).findOne({
                    //     relations: ["messages"],
                    //     where: { id: chatId, "chat.messages": { createdAt: MoreThanDate(requestTime) } }
                    // })
                    console.log("requestTime was ", chat);

                    if (chat) {
                        return {
                            ok: true,
                            error: null,
                            messages: chat.messages
                        }
                    } else {
                        return {
                            ok: false,
                            error: "Can not get user list",
                            messages: null
                        }
                    }
                } else {
                    const chat = await getRepository(Chat).findOne({
                        relations: ["messages"],
                        where: { id: chatId }
                    })
                    console.log("requestTime wasn't ", chat);
                    if (chat) {
                        return {
                            ok: true,
                            error: null,
                            messages: chat.messages
                        }
                    } else {
                        return {
                            ok: false,
                            error: "Can not get your chat",
                            messages: null
                        }
                    }

                }

            } catch (error) {
                return {
                    ok: false,
                    error: error.message,
                    messages: null
                }
            }
        })
    }
}

export default resolvers;