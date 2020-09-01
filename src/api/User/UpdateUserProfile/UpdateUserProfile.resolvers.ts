import { Resolvers } from "../../../types/resolvers";
import { UpdateUserProfileMutationArgs, UpdateUserProfileResponse } from "../../../types/graph";
import User from "../../../entities/User";
import privateResolver from "../../../utils/privateResolver";
import File from "../../../entities/File";
import { deleteObject } from "../../../upload";
import { ObjectIdentifier } from "aws-sdk/clients/s3";

interface FindPhotoProp {
    key: string;
}
const resolvers: Resolvers = {
    Mutation: {
        UpdateUserProfile: privateResolver(async (_, args: UpdateUserProfileMutationArgs, { req }): Promise<UpdateUserProfileResponse> => {
            const { nickName,
                intro,
                profilePhoto } = args;
            const user: User = req.user;
            try {
                if (user) {
                    user.nickName = nickName;
                    user.intro = intro;

                    const deletePhotos = profilePhoto.filter((photo) => photo.target === "delete");
                    const newPhotos = profilePhoto.filter((photo) => photo.target === "upload");
                    if (profilePhoto.length > 0) {
                        if (deletePhotos.length > 0) {
                            const deleteKeys: FindPhotoProp[] = [];
                            for(const e of deletePhotos) {
                                deleteKeys.push({
                                    key: e.key
                                })
                            }
                            const deleteUserPhotos = await File.find({ where: deleteKeys });
                            await File.remove(deleteUserPhotos);

                            const deleteObjects: ObjectIdentifier[] = []
                            for(const e of deletePhotos) {
                                deleteObjects.push({
                                    Key: e.key
                                })
                            }
                            deleteObject(deleteObjects);
                        }
                        for(const e of newPhotos) {
                            const newPhoto = await File.create({ user, url: e.url, key: e.key }).save();
                            user.profilePhoto.push(newPhoto);
                        }
                    }

                    user.save();

                    return {
                        ok: true,
                        error: null
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