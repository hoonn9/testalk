import { GetCommentListQueryArgs, GetCommentListResponse } from "../../../types/graph"
import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import User from "../../../entities/User";
import Comment from "../../../entities/Comment";

const resolvers: Resolvers = {
    Query: {
        GetCommentList: privateResolver(async (_, args: GetCommentListQueryArgs, { req }): Promise<GetCommentListResponse> => {
            const user: User = req.user;
            const { id, skip, take, sort } = args;

            if (!user) {
                return {
                    ok: false,
                    error: "You have no authority.",
                    comments: null
                }
            }
            try {
                if (sort === "ASC") {
                    const comments = await Comment.find({ where: { postId: id }, order: { parentId: "ASC", seq: "ASC" }, relations: ["user"], skip: skip, take: take })

                    if (comments) {
                        return {
                            ok: true,
                            error: null,
                            comments
                        }
                    } else {
                        return {
                            ok: false,
                            error: "Can not get comment list",
                            comments: null
                        }
                    }
                } else {
                    const comments = await Comment.find({ where: { postId: id }, order: { parentId: "DESC", seq: "ASC" }, relations: ["user"], skip: skip, take: take })

                    if (comments) {
                        return {
                            ok: true,
                            error: null,
                            comments
                        }
                    } else {
                        return {
                            ok: false,
                            error: "Can not get comment list",
                            comments: null
                        }
                    }
                }

            } catch (error) {
                return {
                    ok: false,
                    error: "Can not get comment list",
                    comments: null
                }
            }
        })
    }
}

export default resolvers;