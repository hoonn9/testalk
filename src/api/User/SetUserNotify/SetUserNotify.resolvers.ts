import { Resolvers } from "../../../types/resolvers";
import { SetUserNotifyMutationArgs, SetUserNotifyResponse } from "../../../types/graph";
import privateResolver from "../../../utils/privateResolver";
import User from "../../../entities/User";

const resolvers: Resolvers = {
    Mutation: {
        SetUserNotify: privateResolver(async (_, args: SetUserNotifyMutationArgs, { req }): Promise<SetUserNotifyResponse> => {
            const user: User = req.user;
            const { token } = args;
            try {
                await User.update({ id: user.id }, { notifyId: token })
                return {
                    ok: true,
                    error: null
                }
            } catch (error) {
                return {
                    ok: false,
                    error: error.message
                }
            }
        })
    }
}

export default resolvers;