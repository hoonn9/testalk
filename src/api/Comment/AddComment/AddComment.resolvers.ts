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
                    if (post) {
                        if (parentId) {
                            const comments = await Comment.find({ postId: postId, parentId: parentId });
                            if (comments) {
                                await Comment.create({ post: post, parentId: parentId, user: user, content: content, depth: 1, seq: comments.length + 2 }).save();
                            } else {
                                await Comment.create({ post: post, parentId: parentId, user: user, content: content, depth: 1, seq: 2 }).save();

                            }
                        } else {
                            const comment = await Comment.create({ post: post, user: user, content: content, depth: 0, seq: 1 });
                            comment.save();
                        }
                        return {
                            ok: true,
                            error: null
                        }
                    } else {
                        return {
                            ok: false,
                            error: null
                        }
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