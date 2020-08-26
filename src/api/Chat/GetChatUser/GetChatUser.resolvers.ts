import { GetChatUserQueryArgs, GetChatUserResponse } from "../../../types/graph"
import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import User from "../../../entities/User";
import Chat from "../../../entities/Chat";

const resolvers: Resolvers = {
    Query: {
        GetChatUser: privateResolver(async (_, args: GetChatUserQueryArgs, { req }): Promise<GetChatUserResponse> => {
            const user: User = req.user;
            const { id } = args;
            try {
                if (user) {
                    const chat = await Chat.findOne({ id }, { relations: ["users", "users.user", "users.user.profilePhoto"] });
                    if (chat) {
                        let isInChat = false;
                        let other: User | null = null;
                        for (let i = 0; i < chat.users.length; i++) {
                            if (user.id === chat.users[i].userId) {
                                isInChat = true;
                            } else {
                                other = chat.users[i].user
                            }
                        }
                        if (isInChat) {
                            if (other) {
                                return {
                                    ok: true,
                                    error: null,
                                    user: Object.assign({}, other, {
                                        phoneNumber: "",
                                        verifiedPhoneNumber: "",
                                        fbId: null,
                                        ggId: null,
                                        kkId: null,
                                        notifyId: null,
                                        chats: null,
                                        createdAt: null,
                                        updatedAt: null
                                    })
                                }
                            } else {
                                return {
                                    ok: true,
                                    error: null,
                                    user: null
                                }
                            }
                        } else {
                            return {
                                ok: true,
                                error: "You can't access this chat.",
                                user: null
                            }
                        }

                    } else {
                        return {
                            ok: true,
                            error: "Cannot found this chat.",
                            user: null
                        }
                    }
                } else {
                    return {
                        ok: false,
                        error: "Unauthorized.",
                        user: null
                    }
                }
            } catch (error) {
                return {
                    ok: false,
                    error: null,
                    user: null
                }
            }
        })
    }
}

export default resolvers;