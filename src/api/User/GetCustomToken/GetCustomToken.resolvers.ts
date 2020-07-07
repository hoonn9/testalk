import { GetCustomTokenQueryArgs, GetCustomTokenResponse } from "../../../types/graph"
import { Resolvers } from "../../../types/resolvers";
import User from "../../../entities/User";
import { createCustomToken } from "../../../utils/createCustomToken";

const resolvers: Resolvers = {
    Query: {
        GetCustomToken: async (_, args: GetCustomTokenQueryArgs): Promise<GetCustomTokenResponse> => {
            const { means, socialId } = args;
            try {
                if (means === "KAKAO") {
                    const user = await User.findOne({ kkId: socialId })

                    if (user) {
                        const token = await createCustomToken(user.kkId).then((token) => token).catch((error) => {
                            console.log(error);
                        });
                        if (token) {
                            return {
                                ok: true,
                                error: null,
                                token
                            }
                        } else {
                            return {
                                ok: false,
                                error: null,
                                token: null
                            }
                        }
                    } else {
                        return {
                            ok: false,
                            error: null,
                            token: null
                        }
                    }
                } else {
                    return {
                        ok: false,
                        error: null,
                        token: null
                    }
                }

            } catch (error) {
                return {
                    ok: false,
                    error: null,
                    token: null
                }
            }
        }
    }
}

export default resolvers;