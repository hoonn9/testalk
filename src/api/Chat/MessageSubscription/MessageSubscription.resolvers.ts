import { withFilter } from "graphql-yoga";
import User from "../../../entities/User";
import Chat from "../../../entities/Chat";
import { MessageSubscriptionSubscriptionArgs } from "../../../types/graph"

const newChatMessage = "newChatMessage"

const resolvers = {
    Subscription: {
        MessageSubscription: {
            subscribe: withFilter(
                (_, args: MessageSubscriptionSubscriptionArgs, { pubSub }) => pubSub.asyncIterator(`${newChatMessage}.${args.chatId}`),
                async (_, args: MessageSubscriptionSubscriptionArgs, { currentUser }) => {
                    const user: User = currentUser;
                    // const {
                    //     MessageSubscription: { chatId }
                    // } = payload;

                    try {
                        const chat = await Chat.findOne({ id: args.chatId });
                        if (chat) {
                            for (const e of chat.userIds) {
                                if (user.id === e) {
                                    return true;
                                }
                            }
                            return false;
                        } else {
                            return false;
                        }
                    } catch (error) {
                        console.log(error);
                        return false;
                    }
                }
            )
        }
    }
}

export default resolvers;