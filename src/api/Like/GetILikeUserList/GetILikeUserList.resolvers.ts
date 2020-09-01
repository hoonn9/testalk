import { GetILikeUserListQueryArgs, GetILikeUserListResponse } from "../../../types/graph"
import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import User from "../../../entities/User";
import { getRepository } from "typeorm";
import Like from "../../../entities/Like";

const resolvers: Resolvers = {
    Query: {
        GetILikeUserList: privateResolver(async (_, args: GetILikeUserListQueryArgs, { req }): Promise<GetILikeUserListResponse> => {
            const user: User = req.user;
            const { skip, take } = args;

            if (!user) {
                return {
                    ok: false,
                    error: "You have no authority.",
                    likes: null
                }
            }

            try {
                const likes = await getRepository(Like).find({
                    where: { likeUserId: user.id },
                    skip,
                    take,
                    order: {
                        createdAt: "DESC",
                    },
                    relations: ["user", "user.profilePhoto"],
                })
                if (likes) {
                    return {
                        ok: true,
                        error: null,
                        likes
                    }
                } else {
                    return {
                        ok: false,
                        error: "Can not get user list",
                        likes: null
                    }
                }

            } catch (error) {
                console.log(error);
                return {
                    ok: false,
                    error: "Can not get user list",
                    likes: null
                }
            }
        })
    }
}

export default resolvers;