import { Resolvers } from "../../../types/resolvers";
import { ReportMovementResponse } from "../../../types/graph";
import privateResolver from "../../../utils/privateResolver";
import User from "../../../entities/User";
import cleanNullArgs from "../../../utils/cleanNullArgs";

const resolvers: Resolvers = {
    Mutation: {
        ReportMovement: privateResolver(async (_, args, { req }): Promise<ReportMovementResponse> => {
            const user: User = req.user;
            const notNull = cleanNullArgs(args);

            try {
                await User.update({ id: user.id }, { ...notNull })
                return {
                    ok: true,
                    error: null
                }
            } catch (error) {
                console.log(error);
                return {
                    ok: false,
                    error: error.message
                }
            }
        })
    }
}

export default resolvers;