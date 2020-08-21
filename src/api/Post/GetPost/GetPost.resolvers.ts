import { GetPostQueryArgs, GetPostResponse } from "../../../types/graph"
import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import User from "../../../entities/User";
import Post from "../../../entities/Post";
import Like from "../../../entities/Like";

const resolvers: Resolvers = {
    Query: {
        GetPost: privateResolver(async (_, args: GetPostQueryArgs, { req }): Promise<GetPostResponse> => {
            const user: User = req.user;
            const { id } = args;

            if (!user) {
                return {
                    ok: false,
                    error: "You have no authority.",
                    post: null,
                    isLiked: null
                }
            }

            try {
                const post = await Post.findOne({ id: id }, { relations: ["user", "user.profilePhoto", "files"] })
                if (post) {
                    const isLike = await Like.findOne({ likeUserId: user.id, postId: id });
                    post.readCount += 1;
                    post.save();
                    if (isLike) {
                        return {
                            ok: true,
                            error: null,
                            post,
                            isLiked: true
                        }
                    } else {
                        return {
                            ok: true,
                            error: null,
                            post,
                            isLiked: false
                        }
                    }

                } else {
                    return {
                        ok: false,
                        error: "Can not get post",
                        post: null,
                        isLiked: null
                    }
                }

            } catch (error) {
                return {
                    ok: false,
                    error: "Can not get post",
                    post: null,
                    isLiked: null
                }
            }
        })
    }
}

export default resolvers;