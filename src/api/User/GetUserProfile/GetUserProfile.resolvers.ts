import { GetUserProfileQueryArgs, GetUserProfileResponse } from "../../../types/graph"
import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import User from "../../../entities/User";

const resolvers: Resolvers = {
    Query: {
        GetUserProfile: privateResolver(async (_, args: GetUserProfileQueryArgs, { req }): Promise<GetUserProfileResponse> => {
            const { user } = req;
            try {
                if (user) {
                    const getUser = await User.findOne({ id: args.id }, { relations: ["profilePhoto", "likes"] });
                    if (getUser) {
                        return {
                            ok: true,
                            error: null,
                            user: Object.assign({}, getUser, {
                                phoneNumber: "",
                                verifiedPhoneNumber: "",
                                fbId: null,
                                ggId: null,
                                kkId: null,
                                notifyId: null,
                                chats: null,
                                createdAt: null,
                                updatedAt: null,
                                likes: null
                            }),
                            likeCount: getUser.likes.length
                        }
                    } else {
                        return {
                            ok: false,
                            error: "Cannot find this user.",
                            user: null,
                            likeCount: null
                        }
                    }

                } else {
                    return {
                        ok: false,
                        error: "Unauthorized.",
                        user: null,
                        likeCount: null
                    }
                }
            } catch (error) {
                return {
                    ok: false,
                    error: null,
                    user: null,
                    likeCount: null
                }
            }
        })
    }
}

export default resolvers;