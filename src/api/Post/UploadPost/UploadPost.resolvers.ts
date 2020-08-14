import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import { UploadPostMutationArgs, UploadPostResponse } from "../../../types/graph";
import User from "../../../entities/User";
import Post from "../../../entities/Post";

const resolvers: Resolvers = {
    Mutation: {
        UploadPost: privateResolver(async (_, args: UploadPostMutationArgs, { req }): Promise<UploadPostResponse> => {
            const user: User = req.user;
            const { title, content } = args;

            if (user) {
                try {
                    await Post.create({ user: user, title: title, content: content }).save();
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