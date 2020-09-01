import Chat from "../../../entities/Chat";
import User from "../../../entities/User";
import privateResolver from "../../../utils/privateResolver";
import { LeaveChatMutationArgs, LeaveChatResponse } from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";

const newChatMessage = "newChatMessage"
const resolvers: Resolvers = {
    Mutation: {
        LeaveChat: privateResolver(async (_, args: LeaveChatMutationArgs, { req, pubSub }): Promise<LeaveChatResponse> => {
            const user: User = req.user;
            const { id } = args
            try {
                if (user) {
                    const chat = await Chat.findOne({ id })
                    if (chat) {
                        if (chat.userIds.includes(user.id)) {

                            pubSub.publish(`${newChatMessage}.${chat.id}`, {
                                MessageSubscription: {
                                    userId: user.id,
                                    text: "",
                                    target: "LEAVE",
                                    createdAt: Date.now().toString()
                                }
                            })

                            chat.remove();

                            return {
                                ok: true,
                                error: null
                            }
                        } else {
                        return {
                            ok: false,
                            error: "You're not in this chat"
                        }
                    }
                    } else {
                        return {
                            ok: false,
                            error: "Cannot find this chat."
                        }
                    }
                } else {
                    return {
                        ok: false,
                        error: "Unauthorized."
                    }
                }
            } catch (error) {
                console.log(error);
                return {
                    ok: false,
                    error: null
                }
            }
        })
    }
}

export default resolvers;