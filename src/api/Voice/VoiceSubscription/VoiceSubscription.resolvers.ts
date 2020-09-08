import { withFilter } from 'graphql-yoga';
import User from '../../../entities/User';

const newVoiceUser = 'newVoiceUser';

const resolvers = {
    Subscription: {
        VoiceSubscription: {
            subscribe: withFilter(
                (_, __, { pubSub }) => pubSub.asyncIterator(`${newVoiceUser}`),
                async (payload, __, { currentUser }) => {
                    const user: User = currentUser;
                    const {
                        VoiceSubscription: { targetUserId },
                    } = payload;

                    try {
                        if (user.id === targetUserId) {
                            return true;
                        } else {
                            return false;
                        }
                    } catch (error) {
                        console.log(error);
                        return false;
                    }
                }
            ),
        },
    },
};

export default resolvers;
