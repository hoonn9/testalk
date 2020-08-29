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

                    try {
                        const chat = await Chat.findOne({ id: chatId });
                        if (chat) {
                            for (let i = 0; i < chat.userIds.length; i++) {
                                if (user.id === chat.userIds[i]) {
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