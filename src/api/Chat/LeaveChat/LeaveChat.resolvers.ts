import { Resolvers } from "../../../types/resolvers";
import { LeaveChatMutationArgs, LeaveChatResponse } from "../../../types/graph";
import privateResolver from "../../../utils/privateResolver";
import User from "../../../entities/User";
import Chat from "../../../entities/Chat";

const resolvers: Resolvers = {
    Mutation: {
        LeaveChat: privateResolver(async (_, args: LeaveChatMutationArgs, { req }): Promise<LeaveChatResponse> => {
            const user: User = req.user;
            const { id } = args
            try {
                if (user) {
                    const chat = await Chat.findOne({ id }, { relations: ["users"] })
                    if (chat) {
                        for (let i = 0; i < chat.users.length; i++) {
                            if (user.id === chat.users[i].id) {
                                chat.remove();
                                return {
                                    ok: true,
                                    error: null
                                }
                            }
                        }
                        return {
                            ok: false,
                            error: "You're not in this chat"
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
                return {
                    ok: false,
                    error: null
                }
            }
        })
    }
}

export default resolvers;