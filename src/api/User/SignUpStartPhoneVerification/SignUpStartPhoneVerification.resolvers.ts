import { Resolvers } from "../../../types/resolvers";
import { SignUpStartPhoneVerificationMutationArgs, SignUpStartPhoneVerificationResponse } from "../../../types/graph";
import Verification from "../../../entities/Verification";
import { sendVerificationSMS } from "../../../utils/sendSMS";
import User from "../../../entities/User";
const PHONE = "PHONE"
const resolvers: Resolvers = {
    Mutation: {
        SignUpStartPhoneVerification: async (_, args: SignUpStartPhoneVerificationMutationArgs): Promise<SignUpStartPhoneVerificationResponse> => {
            const { phoneNumber } = args;
            try {
                const existingUser = await User.findOne({ phoneNumber });
                if (existingUser) {
                    return {
                        ok: false,
                        error: "이미 사용중인 번호에요. 기존 회원은 초기 화면에서 기존 회원 로그인을 해주세요!\nThe phone number has already been used."
                    }
                } else {
                    const existingVerification = await Verification.findOne({ payload: phoneNumber });
                    if (existingVerification) {
                        existingVerification.remove();
                    }
                    const newVerification = await Verification.create({ payload: phoneNumber, target: PHONE }).save();
                    await sendVerificationSMS(newVerification.payload, newVerification.key);
                    return {
                        ok: true,
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
        }
    }
}

export default resolvers;