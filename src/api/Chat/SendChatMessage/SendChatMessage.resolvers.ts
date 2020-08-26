import { Resolvers } from "../../../types/resolvers";
import { SendChatMessageMutationArgs, SendChatMessageResponse } from "../../../types/graph";
import User from "../../../entities/User";
import Chat from "../../../entities/Chat";
import privateResolver from "../../../utils/privateResolver";
import Message from "../../../entities/Message";
import { sendFCM } from "../../../utils/sendFCM";
import UserChat from "../../../entities/UserChat";
const firstMessageCash = 40;
const resolvers: Resolvers = {
    Mutation: {
        SendChatMessage: privateResolver(async (_, args: SendChatMessageMutationArgs, { req, pubSub }): Promise<SendChatMessageResponse> => {
            const { chatId, receiveUserId, text, sendTime } = args;
            const user: User = req.user;
            try {
                if (chatId) {
                    const chat = await Chat.findOne({ id: chatId }, { relations: ["users", "users.user"] })
                    if (chat) {
                        for (let i = 0; i < chat.users.length; i++) {
                            if (user.id === chat.users[i].userId) {

                                pubSub.publish("newChatMessage", {
                                    MessageSubscription: {
                                        userId: user.id,
                                        chatId: chat.id,
                                        text: text,
                                        target: "CHAT",
                                        createdAt: sendTime
                                    }
                                })
                                for (let j = 0; j < chat.users.length; j++) {
                                    if (j !== i) {
                                        const profilePhoto = user.profilePhoto.length > 0 ? user.profilePhoto[0].url : "";
                                        const userData = {
                                            userId: user.id.toString(),
                                            nickName: user.nickName,
                                            birth: user.birth,
                                            gender: user.gender,
                                            profilePhoto,
                                        }
                                        sendFCM({
                                            user: JSON.stringify(userData),
                                            chatId: chat.id.toString(),
                                            content: text,
                                            createdAt: new Date(sendTime).getTime().toString()
                                        }, chat.users[j].user.notifyId).then((response) => {
                                            //성공
                                        }).catch((error) => {
                                            //실패
                                        })
                                    }
                                }
                                return {
                                    ok: true,
                                    error: null,
                                    chatId: chat.id
                                }
                            }
                        }
                        return {
                            ok: false,
                            error: "Unauthorized",
                            chatId: null
                        }
                    } else {
                        return {
                            ok: false,
                            error: "This Chat is not founded.",
                            chatId: null
                        }
                    }
                } else if (receiveUserId) {
                    const receiveUser = await User.findOne({ id: receiveUserId })
                    if (receiveUser) {
                        if (user.cash >= firstMessageCash) {
                            user.cash -= firstMessageCash;
                            user.save();

                            const chat = await Chat.create().save();
                            await UserChat.create({ user: receiveUser, chat: chat }).save()
                            await UserChat.create({ user: user, chat: chat }).save()
                            //chat.users.push(userChat)
                            //chat.save()

                            const message = await Message.create({
                                text,
                                userId: user.id,
                                chat
                            });
                            pubSub.publish("newChatMessage", {
                                MessageSubscription: message
                            })
                            const profilePhoto = user.profilePhoto.length > 0 ? user.profilePhoto[0].url : "";
                            const userData = {
                                userId: user.id.toString(),
                                nickName: user.nickName,
                                birth: user.birth,
                                gender: user.gender,
                                profilePhoto,
                            }
                            sendFCM({
                                user: JSON.stringify(userData),
                                chatId: chat.id.toString(),
                                content: text,
                                createdAt: new Date(sendTime).getTime().toString()
                            }, receiveUser.notifyId).then((response) => {
                                //성공
                            }).catch((error) => {
                                //실패
                            })

                            return {
                                ok: true,
                                error: null,
                                chatId: chat.id
                            }
                        } else {
                            return {
                                ok: true,
                                error: "캐시가 부족합니다.",
                                chatId: null
                            }
                        }
                    } else {
                        return {
                            ok: false,
                            error: "receive user is not founded",
                            chatId: null
                        }
                    }
                } else {
                    return {
                        ok: false,
                        error: "it's wrong requested.",
                        chatId: null
                    }
                }
            } catch (error) {
                console.log(error);
                return {
                    ok: false,
                    error: null,
                    chatId: null
                }
            }

        })
    }
}

export default resolvers;