import { Resolvers } from '../../../types/resolvers';
import { FindVoiceUserMutationArgs, FindVoiceUserResponse } from '../../../types/graph';
import privateResolver from '../../../utils/privateResolver';
import { getManager } from 'typeorm';
import User from '../../../entities/User';
import Voice from '../../../entities/Voice';
import UserVoice from '../../../entities/UserVoice';
import VoiceWait from '../../../entities/VoiceWait';

interface VoiceWaitProp {
    id: number;
    userId: number;
}

const newVoiceUser = 'newVoiceUser';

const thisYear = (year: number) => {
    const date = new Date();
    console.log(date);
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);
    date.setFullYear(date.getFullYear() - year);
    return `${date.getFullYear()}-${
        date.getMonth() + 1
    }-${date.getDay()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
};

const resolvers: Resolvers = {
    Mutation: {
        FindVoiceUser: privateResolver(
            async (_, args: FindVoiceUserMutationArgs, { req, pubSub }): Promise<FindVoiceUserResponse> => {
                const { gender, age, distance } = args;
                const user: User = req.user;

                if (!user) {
                    return {
                        ok: false,
                        error: 'Unauthorized.',
                        channelName: null,
                    };
                }

                try {
                    let where = `WHERE "userId" != ${user.id} `;

                    if (gender || distance || age) {
                        const options: string[] = [];

                        if (gender) {
                            options.push(`gender = '${gender}'`);
                        }

                        if (distance) {
                            options.push(
                                `calculate_distance(${user.lastLng}, ${user.lastLat}, "lastLat", "lastLng", 'M') < ${distance}`
                            );
                        }

                        if (age) {
                            options.push(`birth BETWEEN '${thisYear(age)}'::timestamp AND '${thisYear(0)}'::timestamp`);
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
