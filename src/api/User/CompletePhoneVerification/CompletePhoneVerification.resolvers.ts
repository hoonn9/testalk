import { Resolvers } from "../../../types/resolvers";
import { CompletePhoneVerificationMutationArgs, CompletePhoneVerificationResponse } from "../../../types/graph";
import Verification from "../../../entities/Verification";
import User from "../../../entities/User";
import createJWT from "../../../utils/createJWT";

const resolvers: Resolvers = {
    Mutation: {
        CompletePhoneVerification: async (_, args: CompletePhoneVerificationMutationArgs): Promise<CompletePhoneVerificationResponse> => {
            const { phoneNumber, key, nickName, gender, birth, fbId, ggId } = args;
            try {
                console.log(phoneNumber, key);
                const verification = await Verification.findOne({ payload: phoneNumber, key });
                if (!verification) {
                    return {
                        ok: false,
                        error: "Verification key not valid",
                        userId: null,
                        token: null
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
                    token: null
                }
            }

            try {
                const user = await User.findOne({ phoneNumber });
                if (user) {
                    user.verifiedPhoneNumber = true;
                    user.save();
                    const token = createJWT(user.id);
                    return {
                        ok: true,
                        error: null,
                        userId: user.id,
                        token
                    }
                } else {
                    const user = await User.create({ phoneNumber, nickName, gender, birth, profilePhoto: [""], isOnline: false });
                    user.verifiedPhoneNumber = true;
                    if (fbId) {
                        user.fbId = fbId;
                    }
                    if (ggId) {
                        user.ggId = ggId;
                    }
                    user.save();
                    const token = createJWT(user.id);
                    return {
                        ok: true,
                        error: null,
                        userId: user.id,
                        token
                    }
                }
            } catch (error) {
                return {
                    ok: false,
                    error: error.message,
                    userId: null,
                    token: null
                }
            }
        }
    }
}

export default resolvers;