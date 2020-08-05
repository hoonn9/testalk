import { Resolvers } from "src/types/resolvers";
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
                            const deleteKeys: Array<FindPhotoProp> = [];
                            for (let i = 0; i < deletePhotos.length; i++) {
                                deleteKeys.push({
                                    key: deletePhotos[i].key
                                })
                            }
                            const deleteUserPhotos = await File.find({ where: deleteKeys });
                            await File.remove(deleteUserPhotos);

                            const deleteObjects: Array<ObjectIdentifier> = []
                            for (let i = 0; i < deletePhotos.length; i++) {
                                deleteObjects.push({
                                    Key: deletePhotos[i].key
                                })
                            }
                            deleteObject(deleteObjects);
                        }

                        for (let i = 0; i < newPhotos.length; i++) {
                            const newPhoto = await File.create({ user, url: newPhotos[i].url, key: newPhotos[i].key }).save();
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