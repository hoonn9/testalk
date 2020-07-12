import { GetMyChatResponse } from "../../../types/graph"
import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import User from "../../../entities/User";

const resolvers: Resolvers = {
    Query: {
        GetMyChat: privateResolver(async (_, __, { req }): Promise<GetMyChatResponse> => {
            const { user } = req;
            try {
                if (user) {
                    const my = await User.findOne({ id: user.id }, { relations: ["chats"] });
                    console.log(my)
                    if (my) {
                        return {
                            ok: true,
                            error: null,
                            chat: my.chats
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