import { Resolvers } from '../../../types/resolvers';
import { RemoveVoiceWaitResponse } from '../../../types/graph';
import privateResolver from '../../../utils/privateResolver';
import User from '../../../entities/User';
import VoiceWait from '../../../entities/VoiceWait';

const resolvers: Resolvers = {
    Mutation: {
        RemoveVoiceWait: privateResolver(
            async (_, __, { req, pubSub }): Promise<RemoveVoiceWaitResponse> => {
                const user: User = req.user;
                if (!user) {
                    return {
                        ok: false,
                        error: 'Unauthorized.',
                    };
                }

                try {
                    await VoiceWait.delete({ userId: user.id });

                    return {
                        ok: true,
                        error: null,
                    };
                } catch (error) {
                    console.log(error);
                    return {
                        ok: false,
                        error: null,
                    };
                }
            }
        ),
    },
};

export default resolvers;
