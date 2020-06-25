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
            // console.log(requestTime);
            // console.log(new Date(parseInt(requestTime)));

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
                    console.log(chat);

                    if (chat) {
                        return {
                            ok: true,
                            error: null,
                            messages: null
                        }
                    } else {
                        return {
                            ok: false,
                            error: "Can not get user list",
                            messages: null
                        }
                    }
                } else {
                    return {
                        ok: true,
                        error: null,
                        messages: null
                    }
                }

            } catch (error) {
                console.log(error);
                return {
                    ok: false,
                    error: "Can not get user list",
                    messages: null
                }
            }
        })
    }
}

export default resolvers;