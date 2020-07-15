import { Resolvers } from "../../../types/resolvers";
import { LoginCompletePhoneVerificationMutationArgs, LoginCompletePhoneVerificationResponse } from "../../../types/graph";
import Verification from "../../../entities/Verification";
import User from "../../../entities/User";
import createJWT from "../../../utils/createJWT";

const resolvers: Resolvers = {
    Mutation: {
        LoginCompletePhoneVerification: async (_, args: LoginCompletePhoneVerificationMutationArgs): Promise<LoginCompletePhoneVerificationResponse> => {
            const { phoneNumber, key } = args;
            try {
                console.log(phoneNumber, key);
                const verification = await Verification.findOne({ payload: phoneNumber, key });
                if (!verification) {
                    return {
                        ok: false,
                        error: "인증 번호가 올바르지 않습니다.",
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
                    error: null,
                    userId: null,
                    token: null,
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
                        token,
                    }
                } else {
                    return {
                        ok: false,
                        error: "이 번호로 가입된 계정이 없어요. 회원 가입을 진행해주세요.",
                        userId: null,
                        token: null,
                    }
                }
            } catch (error) {
                return {
                    ok: false,
                    error: null,
                    userId: null,
                    token: null,
                }
            }
        }
    }
}

export default resolvers;