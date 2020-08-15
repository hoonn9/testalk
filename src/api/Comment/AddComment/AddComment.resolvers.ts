import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import { AddCommentMutationArgs, AddCommentResponse } from "../../../types/graph";
import User from "../../../entities/User";
import Comment from "../../../entities/Comment";
import Post from "../../../entities/Post";

const resolvers: Resolvers = {
    Mutation: {
        AddComment: privateResolver(async (_, args: AddCommentMutationArgs, { req }): Promise<AddCommentResponse> => {
            const user: User = req.user;
            const { postId, parentId, content } = args;

            if (user) {
                try {
                    const post = await Post.findOne({ id: postId })
                    if (parentId) {
                        await Comment.create({ post: post, parentId: parentId, user: user, content: content, depth: 1 }).save();
                    } else {
                        await Comment.create({ post: post, user: user, content: content, depth: 0 }).save();
                    }
                    return {
                        ok: true,
                        error: null
                    }
                } catch (error) {
                    return {
                        ok: false,
                        error: null
                    }
                }
            } else {
                return {
                    ok: false,
                    error: "Unauthorized."
                }
            }
        })
    }
}

export default resolvers;