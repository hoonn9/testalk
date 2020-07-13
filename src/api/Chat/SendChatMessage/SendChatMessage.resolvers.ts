import { Resolvers } from "../../../types/resolvers";
import { SendChatMessageMutationArgs, SendChatMessageResponse } from "../../../types/graph";
import User from "../../../entities/User";
import Chat from "../../../entities/Chat";
import privateResolver from "../../../utils/privateResolver";
import Message from "../../../entities/Message";
import { sendFCM } from "../../../utils/sendFCM";

const resolvers: Resolvers = {
    Mutation: {
        SendChatMessage: privateResolver(async (_, args: SendChatMessageMutationArgs, { req, pubSub }): Promise<SendChatMessageResponse> => {
            const { chatId, receiveUserId, text } = args;
            const user: User = req.user;
            try {
                if (chatId) {
                    const chat = await Chat.findOne({ id: chatId }, { relations: ["users"] })
                    console.log(chat)
                    if (chat) {
                        for (let i = 0; i < chat.users.length; i++) {
                            if (user.id === chat.users[i].id) {

                                const message = await Message.create({
                                    text,
                                    userId: user.id,
                                    chat
                                }).save();
                                pubSub.publish("newChatMessage", {
                                    MessageSubscription: message
                                })
                                console.log("Message createdAt:", message.createdAt);
                                for (let j = 0; j < chat.users.length; j++) {
                                    if (j !== i) {
                                        sendFCM({
                                            nickName: user.nickName,
                                            chatId: chat.id.toString(),
                                            messageId: message.id.toString(),
                                            userId: message.userId.toString(),
                                            receiveUserId: receiveUserId?.toString() || "",
                                            content: message.text,
                                            createdAt: new Date(message.createdAt).getTime().toString()
                                        }, chat.users[j].notifyId).then((response) => {
                                            //성공
                                        }).catch((error) => {
                                            //실패
                                        })
                                    }
                                }
                                return {
                                    ok: true,
                                    error: null,
                                    message
                                }
                            }
                        }
                        return {
                            ok: false,
                            error: "Unauthorized",
                            message: null
                        }
                    } else {
                        return {
                            ok: false,
                            error: "This Chat is not founded.",
                            message: null
                        }
                    }
                } else if (receiveUserId) {
                    const receiveUser = await User.findOne({ id: receiveUserId })
                    if (receiveUser) {
                        const chat = await Chat.create({ users: [user, receiveUser] }).save();

                        const message = await Message.create({
                            text,
                            userId: user.id,
                            chat
                        }).save();
                        pubSub.publish("newChatMessage", {
                            MessageSubscription: message
                        })

                        sendFCM({
                            nickName: user.nickName,
                            chatId: chat.id.toString(),
                            messageId: message.id.toString(),
                            userId: message.userId.toString(),
                            receiveUserId: receiveUserId?.toString() || "",
                            content: message.text,
                            createdAt: new Date(message.createdAt).getTime().toString()
                        }, receiveUser.notifyId).then((response) => {
                            //성공
                        }).catch((error) => {
                            //실패
                        })

                        return {
                            ok: true,
                            error: null,
                            message
                        }
                    } else {
                        return {
                            ok: false,
                            error: "receive user is not founded",
                            message: null
                        }
                    }
                } else {
                    return {
                        ok: false,
                        error: "it's wrong requested.",
                        message: null
                    }
                }
            } catch (error) {
                return {
                    ok: false,
                    error: error.message,
                    message: null
                }
            }

        })
    }
}

export default resolvers;