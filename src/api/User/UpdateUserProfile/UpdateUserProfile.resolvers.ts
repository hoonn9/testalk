import { Resolvers } from "src/types/resolvers";
import { UpdateUserProfileMutationArgs, UpdateUserProfileResponse } from "../../../types/graph";
import User from "../../../entities/User";
import privateResolver from "../../../utils/privateResolver";
import File from "../../../entities/File";
//import File from "src/entities/File";
const resolvers: Resolvers = {
    Mutation: {
        UpdateUserProfile: privateResolver(async (_, args: UpdateUserProfileMutationArgs, { req }): Promise<UpdateUserProfileResponse> => {
            console.log("check");
            const { nickName,
                intro,
                profilePhoto } = args;
            const user: User = req.user;
            try {
                if (user) {
                    user.nickName = nickName;
                    user.intro = intro;

                    for (let i = 0; i < profilePhoto.length; i++) {
                        const newPhoto = await File.create({ user, url: profilePhoto[i], key: "" }).save();
                        user.profilePhoto.push(newPhoto);
                    }
                    user.save();

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