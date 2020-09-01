import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import { UploadPostMutationArgs, UploadPostResponse } from "../../../types/graph";
import User from "../../../entities/User";
import Post from "../../../entities/Post";
import File from "../../../entities/File";

const resolvers: Resolvers = {
    Mutation: {
        UploadPost: privateResolver(async (_, args: UploadPostMutationArgs, { req }): Promise<UploadPostResponse> => {
            const user: User = req.user;
            const { title, content, postPhotos } = args;
            
            try {
                if (user) {
                    try {
                        // const files: Array<File> = []
                        const post = await Post.create({ user: user, title: title, content: content }).save();
                        if (postPhotos.length > 0) {
                            const newPhotos = postPhotos.filter((photo) => photo.target === "upload");
                            for (const e of newPhotos) {
                                const newPhoto = await File.create({ post, url: e.url, key: e.key }).save();
                                post.files.push(newPhoto);
                            }
                            post.save();
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