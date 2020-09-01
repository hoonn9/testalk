import { GetMyChatResponse } from "../../../types/graph"
import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import User from "../../../entities/User";
import Chat from "../../../entities/Chat";

const resolvers: Resolvers = {
    Query: {
        GetMyChat: privateResolver(async (_, __, { req }): Promise<GetMyChatResponse> => {
            const { user } = req;
            try {
                if (user) {
                    const my = await User.findOne({ id: user.id }, { relations: ["chats", "chats.chat"] });

                    if (my) {
                        const chats: Chat[] = []
                        const len = my.chats.length
                        for (let i = 0; i < len; i++) {
                            chats.push(my.chats[i].chat)
                        }

                        return {
                            ok: true,
                            error: null,
                            chat: chats
                        }

                    } else {
                        return {
                            ok: false,
                            error: "Cannot find this user.",
                            chat: null
                        }
                    }

                } else {
                    return {
                        ok: false,
                        error: "Unauthorized.",
                        chat: null
                    }
                }
            } catch (error) {
                console.log(error);
                return {
                    ok: false,
                    error: null,
                    chat: null
                }
            }
        })
    }
}

export default resolvers;