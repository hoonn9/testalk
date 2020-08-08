import { Resolvers } from "../../../types/resolvers";
import { GetMyProfileResponse } from "../../../types/graph";
import privateResolver from "../../../utils/privateResolver";
import User from "../../../entities/User";

const resolvers: Resolvers = {
    Query: {
        GetMyProfile: privateResolver(async (_, __, { req }): Promise<GetMyProfileResponse> => {
            const user: User = req.user;
            return {
                ok: true,
                error: null,
                user,
                likeCount: user.likes.length
            }
        })
    }
}

export default resolvers;