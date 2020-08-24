import { GetUserListQueryArgs, GetUserListResponse } from "../../../types/graph"
import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import User from "../../../entities/User";
import { format } from "date-fns"
import { getRepository, LessThan, getManager, In } from "typeorm";

interface DistanceQueryProp {
    User__id: number
}

//const MoreThanDate = (timestamp: string) => MoreThan(format(new Date(parseInt(timestamp)), 'yyyy-MM-dd HH:mm:ss.SSSSSS'))
const LessThanDate = (timestamp: string) => LessThan(format(new Date(parseInt(timestamp)), 'yyyy-MM-dd HH:mm:ss.SSSSSS'))
const resolvers: Resolvers = {
    Query: {
        GetUserList: privateResolver(async (_, args: GetUserListQueryArgs, { req }): Promise<GetUserListResponse> => {
            const user: User = req.user;
            const { requestTime, skip, take, means } = args;

            if (!user) {
                return {
                    ok: false,
                    error: "You have no authority.",
                    users: null,
                    order: null
                }
            }

            try {
                let users: User[] | null = null;
                if (means === "login") {
                    users = await getRepository(User).find({
                        where: { updatedAt: LessThanDate(requestTime) },
                        skip,
                        take,
                        order: {
                            updatedAt: "DESC",
                        },
                        relations: ["profilePhoto"],
                    })
                    //0.01 == 1.1km
                } else if (means === "distance") {
                    const distanceUserIds: DistanceQueryProp[] = await getManager().query(`
                        SELECT "User"."id" AS "User__id", "lastLng", "lastLat",
                        calculate_distance(${user.lastLat}, ${user.lastLng}, "lastLat", "lastLng", 'M') 
                        FROM "user" "User" ORDER BY "calculate_distance" LIMIT ${take} OFFSET ${skip};`);

                    const userIdArray: number[] = []

                    for (let i = 0; i < distanceUserIds.length; i++) {
                        console.log(distanceUserIds[i].User__id);
                        userIdArray.push(distanceUserIds[i].User__id);

                    }
                    if (distanceUserIds && distanceUserIds.length > 0) {

                        users = await getRepository(User).find({
                            where: { id: In(userIdArray) },
                            relations: ["profilePhoto"],
                        })

                        return {
                            ok: true,
                            error: null,
                            users,
                            order: userIdArray
                        }
                    } else {
                        return {
                            ok: true,
                            error: null,
                            users,
                            order: null
                        }
                    }
                } else if (means === "hot") {

                } else if (means === "join") {

                }
                if (users) {
                    return {
                        ok: true,
                        error: null,
                        users,
                        order: null
                    }
                } else {
                    return {
                        ok: false,
                        error: "Can not get user list",
                        users: null,
                        order: null
                    }
                }

            } catch (error) {
                return {
                    ok: false,
                    error: "Can not get user list",
                    users: null,
                    order: null
                }
            }
        })
    }
}

export default resolvers;