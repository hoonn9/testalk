import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import { ToggleUserLikeMutationArgs, ToggleUserLikeResponse } from "../../../types/graph";
import User from "../../../entities/User";
import Like from "../../../entities/Like";



const resolvers: Resolvers = {
    Mutation: {
        ToggleUserLike: privateResolver(async (_, args: ToggleUserLikeMutationArgs, { req }): Promise<ToggleUserLikeResponse> => {
            const likeUser: User = req.user;
            const { id } = args;
            try {
                const existingLike = await Like.findOne({ likeUserId: likeUser.id, userId: id });

                if (existingLike) {
                    existingLike.remove();

                    return {
                        ok: true,
                        error: null
                    }
                } else {
                    const user = await User.findOne({ id });
                    await Like.create({ user: user, likeUser: likeUser }).save();

                    return {
                        ok: true,
                        error: null
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