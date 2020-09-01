import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import { TogglePostLikeMutationArgs, TogglePostLikeResponse } from "../../../types/graph";
import User from "../../../entities/User";
import Like from "../../../entities/Like";
import Post from "../../../entities/Post";



const resolvers: Resolvers = {
    Mutation: {
        TogglePostLike: privateResolver(async (_, args: TogglePostLikeMutationArgs, { req }): Promise<TogglePostLikeResponse> => {
            const likeUser: User = req.user;
            const { id } = args;
            try {
                const post = await Post.findOne({ id });
                if (post) {
                    const existingLike = await Like.findOne({ likeUserId: likeUser.id, postId: id });

                    if (existingLike) {
                        existingLike.remove();
                        post.likeCount -= 1;
                        post.save();
                        return {
                            ok: true,
                            error: null
                        }
                    } else {
                        await Like.create({ post: post, likeUser: likeUser }).save();
                        post.likeCount += 1;
                        post.save();
                        return {
                            ok: true,
                            error: null
                        }
                    }
                } else {
                    return {
                        ok: false,
                        error: "Not founded this post"
                    }
                }
            } catch (error) {
                console.log(error);
                return {
                    ok: false,
                    error: null
                }
            }
        })
    }
}

export default resolvers;