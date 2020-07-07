export const typeDefs = ["type GetChatMessagesResponse {\n  ok: Boolean!\n  error: String\n  messages: [Message]\n}\n\ntype Query {\n  GetChatMessages(chatId: Int!, requestTime: String): GetChatMessagesResponse\n  GetCustomToken(means: CustomTokenMeansOptions!, socialId: String!): GetCustomTokenResponse\n  GetMyProfile: GetMyProfileResponse!\n  GetUserList(requestTime: String!, means: String!, skip: Int!, take: Int!): GetUserListResponse!\n  user: User\n}\n\ntype Subscription {\n  MessageSubscription: Message\n}\n\ntype SendChatMessageResponse {\n  ok: Boolean!\n  error: String\n  message: Message\n}\n\ntype Mutation {\n  SendChatMessage(chatId: Int, receiveUserId: Int, text: String!): SendChatMessageResponse!\n  CompletePhoneVerification(phoneNumber: String!, key: String!, fbId: String, ggId: String, kkId: String): CompletePhoneVerificationResponse!\n  ReportMovement(lastLat: Float, lastLng: Float): ReportMovementResponse!\n  SetUserNotify(token: String!): SetUserNotifyResponse!\n  StartPhoneVerification(phoneNumber: String!): StartPhoneVerificationResponse\n}\n\ntype Chat {\n  id: Int!\n  users: [User!]!\n  messages: [Message!]\n  createdAt: String!\n  updatedAt: String\n}\n\ntype Message {\n  id: Int!\n  text: String!\n  userId: Int\n  chat: Chat!\n  chatId: Int\n  createdAt: String!\n  updatedAt: String\n}\n\ntype CompletePhoneVerificationResponse {\n  ok: Boolean!\n  error: String\n  userId: Int\n  token: String\n  isNew: Boolean\n}\n\ntype GetCustomTokenResponse {\n  ok: Boolean!\n  error: String\n  token: String\n}\n\nenum CustomTokenMeansOptions {\n  KAKAO\n}\n\ntype GetMyProfileResponse {\n  ok: Boolean!\n  error: String\n  user: User\n}\n\ntype GetUserListResponse {\n  ok: Boolean!\n  error: String\n  users: [User]\n}\n\ntype ReportMovementResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype SetUserNotifyResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype User {\n  id: Int!\n  nickName: String!\n  birth: String!\n  gender: String!\n  intro: String!\n  profilePhoto: [String]\n  phoneNumber: String!\n  verifiedPhoneNumber: Boolean!\n  isOnline: Boolean!\n  lastLng: Float\n  lastLat: Float\n  fbId: String\n  ggId: String\n  kkId: String\n  notifyId: String\n  chats: [Chat!]\n  createdAt: String!\n  updatedAt: String\n}\n\ntype StartPhoneVerificationResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype Verification {\n  id: Int!\n  target: String!\n  payload: String!\n  key: String!\n  verified: Boolean!\n  createdAt: String!\n  updatedAt: String\n}\n"];
/* tslint:disable */

export interface Query {
  GetChatMessages: GetChatMessagesResponse | null;
  GetCustomToken: GetCustomTokenResponse | null;
  GetMyProfile: GetMyProfileResponse;
  GetUserList: GetUserListResponse;
  user: User | null;
}

export interface GetChatMessagesQueryArgs {
  chatId: number;
  requestTime: string | null;
}

export interface GetCustomTokenQueryArgs {
  means: CustomTokenMeansOptions;
  socialId: string;
}

export interface GetUserListQueryArgs {
  requestTime: string;
  means: string;
  skip: number;
  take: number;
}

export interface GetChatMessagesResponse {
  ok: boolean;
  error: string | null;
  messages: Array<Message> | null;
}

export interface Message {
  id: number;
  text: string;
  userId: number | null;
  chat: Chat;
  chatId: number | null;
  createdAt: string;
  updatedAt: string | null;
}

export interface Chat {
  id: number;
  users: Array<User>;
  messages: Array<Message>;
  createdAt: string;
  updatedAt: string | null;
}

export interface User {
  id: number;
  nickName: string;
  birth: string;
  gender: string;
  intro: string;
  profilePhoto: Array<string> | null;
  phoneNumber: string;
  verifiedPhoneNumber: boolean;
  isOnline: boolean;
  lastLng: number | null;
  lastLat: number | null;
  fbId: string | null;
  ggId: string | null;
  kkId: string | null;
  notifyId: string | null;
  chats: Array<Chat>;
  createdAt: string;
  updatedAt: string | null;
}

export type CustomTokenMeansOptions = "KAKAO";

export interface GetCustomTokenResponse {
  ok: boolean;
  error: string | null;
  token: string | null;
}

export interface GetMyProfileResponse {
  ok: boolean;
  error: string | null;
  user: User | null;
}

export interface GetUserListResponse {
  ok: boolean;
  error: string | null;
  users: Array<User> | null;
}

export interface Mutation {
  SendChatMessage: SendChatMessageResponse;
  CompletePhoneVerification: CompletePhoneVerificationResponse;
  ReportMovement: ReportMovementResponse;
  SetUserNotify: SetUserNotifyResponse;
  StartPhoneVerification: StartPhoneVerificationResponse | null;
}

export interface SendChatMessageMutationArgs {
  chatId: number | null;
  receiveUserId: number | null;
  text: string;
}

export interface CompletePhoneVerificationMutationArgs {
  phoneNumber: string;
  key: string;
  fbId: string | null;
  ggId: string | null;
  kkId: string | null;
}

export interface ReportMovementMutationArgs {
  lastLat: number | null;
  lastLng: number | null;
}

export interface SetUserNotifyMutationArgs {
  token: string;
}

export interface StartPhoneVerificationMutationArgs {
  phoneNumber: string;
}

export interface SendChatMessageResponse {
  ok: boolean;
  error: string | null;
  message: Message | null;
}

export interface CompletePhoneVerificationResponse {
  ok: boolean;
  error: string | null;
  userId: number | null;
  token: string | null;
  isNew: boolean | null;
}

export interface ReportMovementResponse {
  ok: boolean;
  error: string | null;
}

export interface SetUserNotifyResponse {
  ok: boolean;
  error: string | null;
}

export interface StartPhoneVerificationResponse {
  ok: boolean;
  error: string | null;
}

export interface Subscription {
  MessageSubscription: Message | null;
}

export interface Verification {
  id: number;
  target: string;
  payload: string;
  key: string;
  verified: boolean;
  createdAt: string;
  updatedAt: string | null;
}
