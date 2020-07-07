import { Resolvers } from "../../../types/resolvers";
import { CompletePhoneVerificationMutationArgs, CompletePhoneVerificationResponse } from "../../../types/graph";
import Verification from "../../../entities/Verification";
import User from "../../../entities/User";
import createJWT from "../../../utils/createJWT";

const resolvers: Resolvers = {
    Mutation: {
        CompletePhoneVerification: async (_, args: CompletePhoneVerificationMutationArgs): Promise<CompletePhoneVerificationResponse> => {
            const { phoneNumber, key, fbId, ggId, kkId } = args;
            try {
                console.log(phoneNumber, key);
                const verification = await Verification.findOne({ payload: phoneNumber, key });
                if (!verification) {
                    return {
                        ok: false,
                        error: "Verification key not valid",
                        userId: null,
                        token: null,
                        isNew: null
                    }
                } else {
                    verification.verified = true;
                    verification.save()
                }
            } catch (error) {
                return {
                    ok: false,
                    error: error.message,
                    userId: null,
                    token: null,
                    isNew: null
                }
            }

            try {
                const user = await User.findOne({ phoneNumber });
                if (user) {
                    if (ggId) {
                        user.verifiedPhoneNumber = true;
                        user.ggId = ggId;
                        user.save();
                        const token = createJWT(user.id);
                        return {
                            ok: true,
                            error: null,
                            userId: user.id,
                            token,
                            isNew: false
                        }
                    } else if (fbId) {
                        user.verifiedPhoneNumber = true;
                        user.fbId = fbId;
                        user.save();
                        const token = createJWT(user.id);
                        return {
                            ok: true,
                            error: null,
                            userId: user.id,
                            token,
                            isNew: false
                        }
                    } else if (kkId) {
                        user.verifiedPhoneNumber = true;
                        user.kkId = kkId;
                        user.save();
                        const token = createJWT(user.id);
                        return {
                            ok: true,
                            error: null,
                            userId: user.id,
                            token,
                            isNew: false
                        }
                    } else {
                        return {
                            ok: false,
                            error: "means select failed.",
                            userId: null,
                            token: null,
                            isNew: null
                        }
                    }
                } else {
                    const user = await User.create({ phoneNumber, profilePhoto: [""], isOnline: false });
                    user.verifiedPhoneNumber = true;
                    if (ggId) {
                        user.ggId = ggId;
                    } else if (fbId) {
                        user.fbId = fbId;
                    } else if (kkId) {
                        user.kkId = kkId;
                    }
                    user.save();
                    const token = createJWT(user.id);
                    return {
                        ok: true,
                        error: null,
                        userId: user.id,
                        token,
                        isNew: true
                    }
                }
            } catch (error) {
                return {
                    ok: false,
                    error: error.message,
                    userId: null,
                    token: null,
                    isNew: null
                }
            }
        }
    }
}

export default resolvers;