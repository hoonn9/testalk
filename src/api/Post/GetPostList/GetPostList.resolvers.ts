import { GetPostListQueryArgs, GetPostListResponse } from "../../../types/graph"
import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import User from "../../../entities/User";
import { format } from "date-fns"
import { getRepository, LessThan } from "typeorm";
import Post from "../../../entities/Post";
//const MoreThanDate = (timestamp: string) => MoreThan(format(new Date(parseInt(timestamp)), 'yyyy-MM-dd HH:mm:ss.SSSSSS'))
const LessThanDate = (timestamp: string) => LessThan(format(new Date(parseInt(timestamp)), 'yyyy-MM-dd HH:mm:ss.SSSSSS'))
const resolvers: Resolvers = {
    Query: {
        GetPostList: privateResolver(async (_, args: GetPostListQueryArgs, { req }): Promise<GetPostListResponse> => {
            const user: User = req.user;
            const { requestTime, skip, take } = args;

            if (!user) {
                return {
                    ok: false,
                    error: "You have no authority.",
                    posts: null
                }
            }

            try {
                const posts = await getRepository(Post).find({
                    where: { updatedAt: LessThanDate(requestTime) },
                    skip,
                    take,
                    order: {
                        updatedAt: "DESC",
                    },
                    relations: ["files", "user"],
                })
                if (posts) {
                    return {
                        ok: true,
                        error: null,
                        posts
                    }
                } else {
                    return {
                        ok: false,
                        error: "Can not get post list",
                        posts: null
                    }
                }

            } catch (error) {
                return {
                    ok: false,
                    error: "Can not get post list",
                    posts: null
                }
            }
        })
    }
}

export default resolvers;