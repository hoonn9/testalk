import { Resolvers } from "../../../types/resolvers";
import { SignUpCompletePhoneVerificationMutationArgs, SignUpCompletePhoneVerificationResponse } from "../../../types/graph";
import Verification from "../../../entities/Verification";
import User from "../../../entities/User";
import createJWT from "../../../utils/createJWT";

const resolvers: Resolvers = {
    Mutation: {
        SignUpCompletePhoneVerification: async (_, args: SignUpCompletePhoneVerificationMutationArgs): Promise<SignUpCompletePhoneVerificationResponse> => {
            const { phoneNumber, key, fbId, ggId, kkId, nickName, birth, gender } = args;
            console.log(birth);
            try {
                const verification = await Verification.findOne({ payload: phoneNumber, key });
                if (!verification) {
                    return {
                        ok: false,
                        error: "Verification key not valid",
                        userId: null,
                        token: null,
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
                }
            }

            try {
                const user = await User.create({ phoneNumber, nickName, birth, gender, isOnline: false });
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
                if (user) {
                    return {
                        ok: true,
                        error: null,
                        userId: user.id,
                        token,
                    }
                } else {
                    return {
                        ok: false,
                        error: null,
                        userId: null,
                        token: null,
                    }
                }
            } catch (error) {
                console.log(error);
                return {
                    ok: false,
                    error: error.message,
                    userId: null,
                    token: null,
                }
            }
        }
    }
}

export default resolvers;