import { Resolvers } from "../../../types/resolvers";
import { SendChatMessageMutationArgs, SendChatMessageResponse } from "../../../types/graph";
import User from "../../../entities/User";
import Chat from "../../../entities/Chat";
import privateResolver from "../../../utils/privateResolver";
import { sendFCM } from "../../../utils/sendFCM";
import UserChat from "../../../entities/UserChat";
import { In } from "typeorm";
const firstMessageCash = 40;
const resolvers: Resolvers = {
    Mutation: {
        SendChatMessage: privateResolver(async (_, args: SendChatMessageMutationArgs, { req, pubSub }): Promise<SendChatMessageResponse> => {
            const { chatId, receiveUserId, text, sendTime } = args;
            const user: User = req.user;

            try {
                // 자기 자신에게
                if (user.id === receiveUserId) {
                    return {
                        ok: false,
                        error: null,
                        chatId: null
                    }
                }

                if (chatId && receiveUserId) {
                    const chat = await Chat.findOne({ id: chatId })

                    if (chat) {
                        if (chat.userIds.includes(user.id) && chat.userIds.includes(receiveUserId)) {
                            
                            const receiveUser = await User.findOne({id: receiveUserId});
                            if (receiveUser) {

                                pubSub.publish("newChatMessage", {
                                    MessageSubscription: {
                                        userId: user.id,
                                        chatId: chat.id,
                                        text: text,
                                        target: "CHAT",
                                        createdAt: sendTime
                                    }
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
                                    createdAt: sendTime,
                                }, receiveUser.notifyId).then((response) => {
                                    //성공
                                }).catch((error) => {
                                    //실패
                                })
                            } else {
                                return {
                                    ok: false,
                                    error: null,
                                    chatId: null
                                }
                            }
                            return {
                                ok: true,
                                error: null,
                                chatId: chat.id
                            }
                        } else {
                            return {
                                ok: false,
                                error: null,
                                chatId: null
                            }
                        }

                    } else {
                        return {
                            ok: false,
                            error: "This Chat is not founded.",
                            chatId: null
                        }
                    }
                } else if (receiveUserId) {
                    const receiveUser = await User.findOne({ id: receiveUserId})

                    if (receiveUser) {
                        const findChat = await Chat.findOne({userIds: In([`{${user.id}, ${receiveUserId}}`])});
                        if (findChat) {
                            pubSub.publish("newChatMessage", {
                                MessageSubscription: {
                                    userId: user.id,
                                    chatId: findChat.id,
                                    text: text,
                                    target: "CHAT",
                                    createdAt: sendTime
                                }
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
                                chatId: findChat.id.toString(),
                                content: text,
                                createdAt:sendTime
                            }, receiveUser.notifyId).then((response) => {
                                //성공
                            }).catch((error) => {
                                //실패
                            })

                            return {
                                ok: true,
                                error: null,
                                chatId: findChat.id
                            }
                        } else {

                            if (user.cash >= firstMessageCash) {
                                user.cash -= firstMessageCash;
                                user.save();

                                const chat = await Chat.create({userIds: [user.id, receiveUser.id]}).save();
                                await UserChat.create({ user: receiveUser, chat: chat }).save()
                                await UserChat.create({ user: user, chat: chat }).save()
                                //chat.users.push(userChat)
                                //chat.save()

                                pubSub.publish("newChatMessage", {
                                    MessageSubscription: {
                                        userId: user.id,
                                        chatId: chat.id,
                                        text: text,
                                        target: "CHAT",
                                        createdAt: sendTime
                                    }
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
                                    createdAt:sendTime
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