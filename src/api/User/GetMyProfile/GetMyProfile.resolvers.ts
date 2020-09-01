import { Resolvers } from "../../../types/resolvers";
import { GetMyProfileResponse } from "../../../types/graph";
import privateResolver from "../../../utils/privateResolver";
import User from "../../../entities/User";

const resolvers: Resolvers = {
    Query: {
        GetMyProfile: privateResolver(async (_, __, { req }): Promise<GetMyProfileResponse> => {
            const user: User = req.user;
            try {
                if (user) {
                    return {
                        ok: true,
                        error: null,
                        user,
                        likeCount: user.likes.length
                    }
                } else {
                    return {
                        ok: false,
                        error: null,
                        user: null,
                        likeCount: null
                    }
                }
            } catch (error) {
                console.log(error);
                return {
                    ok: false,
                    error: null,
                    user: null,
                    likeCount: null
                }
            }
            
        })
    }
}

export default resolvers;