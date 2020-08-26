import { withFilter } from "graphql-yoga";
import User from "../../../entities/User";
import Chat from "../../../entities/Chat";

const resolvers = {
    Subscription: {
        MessageSubscription: {
            subscribe: withFilter(
                (_, __, { pubSub }) => pubSub.asyncIterator("newChatMessage"),
                async (payload, _, { currentUser }) => {
                    const user: User = currentUser;
                    const {
                        MessageSubscription: { chatId }
                    } = payload;
                    console.log("check");

                    try {
                        const chat = await Chat.findOne({ id: chatId }, { relations: ["users"] });
                        if (chat) {
                            for (let i = 0; i < chat.users.length; i++) {
                                if (user.id === chat.users[i].userId) {
                                    return true;
                                }
                            }
                            return false;
                        } else {
                            return false;
                        }
                    } catch (error) {
                        return false;
                    }
                }
            )
        }
    }
}

export default resolvers;