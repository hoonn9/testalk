import { Resolvers } from '../../../types/resolvers';
import { LoginStartPhoneVerificationMutationArgs, LoginStartPhoneVerificationResponse } from '../../../types/graph';
import Verification from '../../../entities/Verification';
import { sendVerificationSMS } from '../../../utils/sendSMS';
const PHONE = 'PHONE';
const resolvers: Resolvers = {
    Mutation: {
        LoginStartPhoneVerification: async (
            _,
            args: LoginStartPhoneVerificationMutationArgs
        ): Promise<LoginStartPhoneVerificationResponse> => {
            const { phoneNumber } = args;
            try {
                const existingVerification = await Verification.findOne({
                    payload: phoneNumber,
                });
                if (existingVerification) {
                    existingVerification.remove();
                }
                const newVerification = await Verification.create({
                    payload: phoneNumber,
                    target: PHONE,
                }).save();
                await sendVerificationSMS(newVerification.payload, newVerification.key);
                return {
                    ok: true,
                    error: null,
                };
            } catch (error) {
                console.log(error);
                return {
                    ok: false,
                    error: null,
                };
            }
        },
    },
};

export default resolvers;
