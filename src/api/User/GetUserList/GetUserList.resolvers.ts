import { GetUserListQueryArgs, GetUserListResponse } from "../../../types/graph"
import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import User from "../../../entities/User";
import { format } from "date-fns"
import { getRepository, LessThan } from "typeorm";
//const MoreThanDate = (timestamp: string) => MoreThan(format(new Date(parseInt(timestamp)), 'yyyy-MM-dd HH:mm:ss.SSSSSS'))
const LessThanDate = (timestamp: string) => LessThan(format(new Date(parseInt(timestamp)), 'yyyy-MM-dd HH:mm:ss.SSSSSS'))
const resolvers: Resolvers = {
    Query: {
        GetUserList: privateResolver(async (_, args: GetUserListQueryArgs, { req }): Promise<GetUserListResponse> => {
            const user: User = req.user;
            const { requestTime, skip, take } = args;
            console.log(skip, take)
            // console.log(requestTime);
            // console.log(new Date(parseInt(requestTime)));

            if (!user) {
                return {
                    ok: false,
                    error: "You have no authority.",
                    users: null
                }
            }
            //console.log(MoreThanDate(requestTime));

            try {
                const users = await getRepository(User).find({
                    where: { updatedAt: LessThanDate(requestTime) },
                    skip,
                    take,
                    order: {
                        updatedAt: "DESC",
                    },
                    relations: ["profilePhoto"],
                })

                //console.log(users.find);
                if (users) {
                    return {
                        ok: true,
                        error: null,
                        users
                    }
                } else {
                    return {
                        ok: false,
                        error: "Can not get user list",
                        users: null
                    }
                }

            } catch (error) {
                return {
                    ok: false,
                    error: "Can not get user list",
                    users: null
                }
            }
        })
    }
}

export default resolvers;