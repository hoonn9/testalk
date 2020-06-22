import { withFilter } from "graphql-yoga";
import User from "../../../entities/User";
import Chat from "../../../entities/Chat";

const resolvers = {
    Subscription: {
        MessageSubscription: {
            subscribe: withFilter(
                (_, __, { pubSub }) => pubSub.asyncIterator("newChatMessage"),
                async (payload, _, { currentUser }) => {
                    console.log(currentUser);
                    console.log(payload);
                    const user: User = currentUser;
                    const {
                        MessageSubscription: { chatId }
                    } = payload;

                    try {
                        const chat = await Chat.findOne({ id: chatId }, { relations: ["users"] });
                        if (chat) {
                            for (let i = 0; i < chat.users.length; i++) {
                                if (user.id === chat.users[i].id) {
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