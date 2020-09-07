import { Resolvers } from '../../../types/resolvers';
import { FindVoiceUserMutationArgs, FindVoiceUserResponse } from '../../../types/graph';
import privateResolver from '../../../utils/privateResolver';
// import Voice from '../../../entities/Voice';
// import VoiceWait from '../../../entities/VoiceWait';
import { getManager } from 'typeorm';
import User from '../../../entities/User';

const thisYear = (year) => {
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
            async (_, args: FindVoiceUserMutationArgs, { req }): Promise<FindVoiceUserResponse> => {
                const { gender, age, distance } = args;
                const user: User = req.user;
                try {
                    const voice = await getManager().query(`
                    SELECT id FROM voice_wait WHERE gender = '${gender}' 
                    AND calculate_distance(${user.lastLng}, ${user.lastLat}, "lastLat", "lastLng", 'M') < ${distance} 
                    AND birth BETWEEN '${thisYear(age)}'::timestamp AND '${thisYear(0)}'::timestamp;`);
                    console.log(voice);

                    if (voice.length > 0) {
                        // 찾음
                    } else {
                        // 찾을 수 없음
                    }

                    return {
                        ok: false,
                        error: null,
                    };
                } catch (error) {
                    console.log(error);
                    return {
                        ok: false,
                        error: null,
                    };
                }
            }
        ),
    },
};

export default resolvers;
