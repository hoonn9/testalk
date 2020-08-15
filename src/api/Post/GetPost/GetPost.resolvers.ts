import { GetPostQueryArgs, GetPostResponse } from "../../../types/graph"
import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import User from "../../../entities/User";
import Post from "../../../entities/Post";

const resolvers: Resolvers = {
    Query: {
        GetPost: privateResolver(async (_, args: GetPostQueryArgs, { req }): Promise<GetPostResponse> => {
            const user: User = req.user;
            const { id } = args;

            if (!user) {
                return {
                    ok: false,
                    error: "You have no authority.",
                    post: null
                }
            }

            try {
                const post = await Post.findOne({ id: id }, { relations: ["user", "comments", "comments.user"] })
                if (post) {
                    return {
                        ok: true,
                        error: null,
                        post
                    }
                } else {
                    return {
                        ok: false,
                        error: "Can not get post",
                        post: null
                    }
                }

            } catch (error) {
                return {
                    ok: false,
                    error: "Can not get post",
                    post: null
                }
            }
        })
    }
}

export default resolvers;