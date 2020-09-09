import { Resolvers } from '../../../types/resolvers';
import { FindVoiceUserMutationArgs, FindVoiceUserResponse } from '../../../types/graph';
import privateResolver from '../../../utils/privateResolver';
import { getManager } from 'typeorm';
import User from '../../../entities/User';
import Voice from '../../../entities/Voice';
import UserVoice from '../../../entities/UserVoice';
import VoiceWait from '../../../entities/VoiceWait';
import { timestampConverter } from '../../../utils';

interface VoiceWaitProp {
    id: number;
    userId: number;
}

const newVoiceUser = 'newVoiceUser';

const resolvers: Resolvers = {
    Mutation: {
        FindVoiceUser: privateResolver(
            async (_, args: FindVoiceUserMutationArgs, { req, pubSub }): Promise<FindVoiceUserResponse> => {
                const { gender, age, distance } = args;
                const user: User = req.user;
                console.log(gender, age, distance);
                if (!user) {
                    return {
                        ok: false,
                        error: 'Unauthorized.',
                        channelName: null,
                    };
                }

                try {
                    let where = `WHERE "userId" != ${user.id} AND ("wantGender" = '${
                        user.gender
                    }' OR "wantGender" = 'any') 
                    AND calculate_distance(${user.lastLat}, ${
                        user.lastLng
                    }, "lastLat", "lastLng", 'M') < "wantDistance" 
                    AND ("wantAge" = '0 years' OR AGE(timestamp '${timestampConverter(
                        user.birth
                    )}') BETWEEN "wantAge" AND "wantAge" + '9 years')`;

                    if (gender || distance || age) {
                        const options: string[] = [];
                        where += ' AND ';

                        if (gender) {
                            if (gender === 'any') {
                                options.push(`(gender = 'male' OR gender = 'female')`);
                            } else {
                                options.push(`gender = '${gender}'`);
                            }
                        }

                        if (distance) {
                            options.push(
                                `calculate_distance(${user.lastLat}, ${user.lastLng}, "lastLat", "lastLng", 'M') < ${distance}`
                            );
                        }

                        if (age) {
                            options.push(`AGE(birth) BETWEEN '${age} years' AND '${age + 9} years'`);
                        }

                        for (let i = 0; i < options.length; i++) {
                            if (i !== options.length - 1) {
                                where += `${options[i]} AND `;
                            } else {
                                where += `${options[i]}`;
                            }
                        }
                    }

                    const voice: VoiceWaitProp[] = await getManager().query(`
                    SELECT id, "userId" FROM voice_wait ${where} ORDER BY id LIMIT 1;`);

                    if (voice.length > 0) {
                        // 찾음
                        const findUser = await User.findOne({ id: voice[0].userId });

                        if (findUser) {
                            await VoiceWait.delete({ id: voice[0].id });

                            const sortedIds = [user.id, findUser.id].sort();
                            const channelName = `${sortedIds[0]}:${sortedIds[1]}`;
                            const newVoice = await Voice.create({
                                userIds: sortedIds,
                                channelName: channelName,
                            }).save();

                            await UserVoice.create({ user: findUser, voice: newVoice }).save();
                            await UserVoice.create({ user: user, voice: newVoice }).save();

                            console.log(newVoice.channelName);
                            pubSub.publish(`${newVoiceUser}`, {
                                VoiceSubscription: {
                                    targetUserId: findUser.id,
                                    channelName: newVoice.channelName,
                                    createdAt: newVoice.createdAt,
                                },
                            });

                            return {
                                ok: true,
                                error: null,
                                channelName: channelName,
                            };
                        } else {
                            return {
                                ok: false,
                                error: 'cannot find user.',
                                channelName: null,
                            };
                        }
                    } else {
                        // 찾을 수 없음
                        const prevVoiceWait = await VoiceWait.findOne({ userId: user.id });

                        if (prevVoiceWait) {
                            prevVoiceWait.remove();
                        }

                        await VoiceWait.create({
                            userId: user.id,
                            birth: user.birth,
                            lastLng: user.lastLng,
                            lastLat: user.lastLat,
                            gender: user.gender,
                            wantGender: gender,
                            wantAge: age && age > 0 ? `${age} years` : `${0} years`,
                            wantDistance: distance && distance > 0 ? distance : 0,
                        }).save();

                        return {
                            ok: true,
                            error: null,
                            channelName: null,
                        };
                    }
                } catch (error) {
                    console.log(error);
                    return {
                        ok: false,
                        error: null,
                        channelName: null,
                    };
                }
            }
        ),
    },
};

export default resolvers;
