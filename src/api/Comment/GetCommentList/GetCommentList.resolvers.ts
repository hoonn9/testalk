import { GetCommentListQueryArgs, GetCommentListResponse } from "../../../types/graph"
import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import User from "../../../entities/User";
// import { getRepository, } from "typeorm";
import Comment from "../../../entities/Comment";

const resolvers: Resolvers = {
    Query: {
        GetCommentList: privateResolver(async (_, args: GetCommentListQueryArgs, { req }): Promise<GetCommentListResponse> => {
            const user: User = req.user;
            const { id, skip, take } = args;

            if (!user) {
                return {
                    ok: false,
                    error: "You have no authority.",
                    comments: null
                }
            }
            // .orderBy("(CASE WHEN comment.parentId IS NULL THEN comment.id ELSE comment.parentId END)")
            try {
                // const comments = await getRepository(Comment).createQueryBuilder("comment")
                //     .leftJoinAndSelect("comment.user", "user")
                //     .where("comment.postId = :postId", { postId: id })
                //     .skip(skip)
                //     .take(take)
                //     .getMany().then((e) => {
                //         console.log(e);
                //         return e;
                //     }).catch((e) => {
                //         console.log(e);
                //     });

                //const comments = await getManager().query(`SELECT "Comment"."id" FROM comment Comment WHERE "Comment"."postId" = ${id}`);

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