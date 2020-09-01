import { GetUserProfileQueryArgs, GetUserProfileResponse } from "../../../types/graph"
import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import User from "../../../entities/User";
import Like from "../../../entities/Like";

const resolvers: Resolvers = {
    Query: {
        GetUserProfile: privateResolver(async (_, args: GetUserProfileQueryArgs, { req }): Promise<GetUserProfileResponse> => {
            const user: User = req.user;
            const { id } = args
            try {
                if (user) {
                    const getUser = await User.findOne({ id: id }, { relations: ["profilePhoto", "likes"] });
                    if (getUser) {

                        const isLike = await Like.findOne({ likeUserId: user.id, userId: id });
                        if (isLike) {
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
                                likeCount: getUser.likes.length,
                                isLiked: true
                            }
                        } else {
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
                                likeCount: getUser.likes.length,
                                isLiked: false
                            }
                        }

                    } else {
                        return {
                            ok: false,
                            error: "Cannot find this user.",
                            user: null,
                            likeCount: null,
                            isLiked: null
                        }
                    }

                } else {
                    return {
                        ok: false,
                        error: "Unauthorized.",
                        user: null,
                        likeCount: null,
                        isLiked: null
                    }
                }
            } catch (error) {
                console.log(error);
                return {
                    ok: false,
                    error: null,
                    user: null,
                    likeCount: null,
                    isLiked: null
                }
            }
        })
    }
}

export default resolvers;