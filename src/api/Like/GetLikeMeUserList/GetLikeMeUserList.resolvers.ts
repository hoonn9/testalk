import { GetLikeMeUserListQueryArgs, GetLikeMeUserListResponse } from "../../../types/graph"
import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import User from "../../../entities/User";
import { format } from "date-fns"
import { getRepository, LessThan } from "typeorm";
import Like from "../../../entities/Like";
//const MoreThanDate = (timestamp: string) => MoreThan(format(new Date(parseInt(timestamp)), 'yyyy-MM-dd HH:mm:ss.SSSSSS'))
const LessThanDate = (timestamp: string) => {
    return LessThan(format(new Date(parseInt(timestamp)), 'yyyy-MM-dd HH:mm:ss.SSSSSS'))
}
const resolvers: Resolvers = {
    Query: {
        GetLikeMeUserList: privateResolver(async (_, args: GetLikeMeUserListQueryArgs, { req }): Promise<GetLikeMeUserListResponse> => {
            const user: User = req.user;
            const { requestTime, skip, take } = args;

            if (!user) {
                return {
                    ok: false,
                    error: "You have no authority.",
                    likes: null
                }
            }

            try {
                const likes = await getRepository(Like).find({
                    where: { userId: user.id, createdAt: LessThanDate(requestTime) },
                    skip,
                    take,
                    order: {
                        createdAt: "DESC",
                    },
                    relations: ["likeUser", "likeUser.profilePhoto"],
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