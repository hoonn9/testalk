export const typeDefs = ["type GetChatMessagesResponse {\n  ok: Boolean!\n  error: String\n  messages: [Message]\n}\n\ntype Query {\n  GetChatMessages(chatId: Int!, requestTime: String): GetChatMessagesResponse!\n  GetChatUser(id: Int!): GetChatUserResponse!\n  GetCustomToken(means: CustomTokenMeansOptions!, socialId: String!): GetCustomTokenResponse!\n  GetMyChat: GetMyChatResponse!\n  GetMyProfile: GetMyProfileResponse!\n  GetUserList(requestTime: String!, means: String!, skip: Int!, take: Int!): GetUserListResponse!\n  GetUserProfile(id: Int!): GetUserProfileResponse!\n  user: User\n}\n\ntype GetChatUserResponse {\n  ok: Boolean!\n  error: String\n  user: User\n}\n\ntype LeaveChatResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype Mutation {\n  LeaveChat(id: Int!): LeaveChatResponse!\n  SendChatMessage(chatId: Int, receiveUserId: Int, text: String!): SendChatMessageResponse!\n  LoginCompletePhoneVerification(phoneNumber: String!, key: String!): LoginCompletePhoneVerificationResponse!\n  LoginStartPhoneVerification(phoneNumber: String!): LoginStartPhoneVerificationResponse\n  ReportMovement(lastLat: Float, lastLng: Float): ReportMovementResponse!\n  SetUserNotify(token: String!): SetUserNotifyResponse!\n  SignUpCompletePhoneVerification(phoneNumber: String!, key: String!, fbId: String, ggId: String, kkId: String, nickName: String!, gender: String!, birth: String!): SignUpCompletePhoneVerificationResponse!\n  SignUpStartPhoneVerification(phoneNumber: String!): SignUpStartPhoneVerificationResponse!\n  UpdateUserProfile(nickName: String!, intro: String!, profilePhoto: [String!]!): UpdateUserProfileResponse!\n}\n\ntype Subscription {\n  MessageSubscription: Message\n}\n\ntype SendChatMessageResponse {\n  ok: Boolean!\n  error: String\n  message: Message\n}\n\ntype Chat {\n  id: Int!\n  users: [User!]!\n  messages: [Message]\n  createdAt: String!\n  updatedAt: String\n}\n\ntype File {\n  id: Int!\n  user: User!\n  userId: Int!\n  url: String!\n  key: String!\n  createdAt: String!\n  updatedAt: String\n}\n\ntype Message {\n  id: Int!\n  text: String!\n  userId: Int\n  chat: Chat!\n  chatId: Int\n  target: String!\n  createdAt: String!\n  updatedAt: String\n}\n\ntype GetCustomTokenResponse {\n  ok: Boolean!\n  error: String\n  token: String\n}\n\nenum CustomTokenMeansOptions {\n  KAKAO\n}\n\ntype GetMyChatResponse {\n  ok: Boolean!\n  error: String\n  chat: [Chat]\n}\n\ntype GetMyProfileResponse {\n  ok: Boolean!\n  error: String\n  user: User\n}\n\ntype GetUserListResponse {\n  ok: Boolean!\n  error: String\n  users: [User]\n}\n\ntype GetUserProfileResponse {\n  ok: Boolean!\n  error: String\n  user: User\n}\n\ntype LoginCompletePhoneVerificationResponse {\n  ok: Boolean!\n  error: String\n  userId: Int\n  token: String\n}\n\ntype LoginStartPhoneVerificationResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype ReportMovementResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype SetUserNotifyResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype User {\n  id: Int!\n  nickName: String!\n  birth: String!\n  gender: String!\n  intro: String!\n  profilePhoto: [File!]\n  phoneNumber: String!\n  verifiedPhoneNumber: Boolean!\n  isOnline: Boolean!\n  lastLng: Float\n  lastLat: Float\n  fbId: String\n  ggId: String\n  kkId: String\n  notifyId: String\n  chats: [Chat!]\n  files: [File!]\n  createdAt: String!\n  updatedAt: String\n}\n\ntype SignUpCompletePhoneVerificationResponse {\n  ok: Boolean!\n  error: String\n  userId: Int\n  token: String\n}\n\ntype SignUpStartPhoneVerificationResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype UpdateUserProfileResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype Verification {\n  id: Int!\n  target: String!\n  payload: String!\n  key: String!\n  verified: Boolean!\n  createdAt: String!\n  updatedAt: String\n}\n"];
/* tslint:disable */

export interface Query {
  GetChatMessages: GetChatMessagesResponse;
  GetChatUser: GetChatUserResponse;
  GetCustomToken: GetCustomTokenResponse;
  GetMyChat: GetMyChatResponse;
  GetMyProfile: GetMyProfileResponse;
  GetUserList: GetUserListResponse;
  GetUserProfile: GetUserProfileResponse;
  user: User | null;
}

export interface GetChatMessagesQueryArgs {
  chatId: number;
  requestTime: string | null;
}

export interface GetChatUserQueryArgs {
  id: number;
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

export interface GetUserProfileQueryArgs {
  id: number;
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
  target: string;
  createdAt: string;
  updatedAt: string | null;
}

export interface Chat {
  id: number;
  users: Array<User>;
  messages: Array<Message> | null;
  createdAt: string;
  updatedAt: string | null;
}

export interface User {
  id: number;
  nickName: string;
  birth: string;
  gender: string;
  intro: string;
  profilePhoto: Array<File>;
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
  files: Array<File>;
  createdAt: string;
  updatedAt: string | null;
}

export interface File {
  id: number;
  user: User;
  userId: number;
  url: string;
  key: string;
  createdAt: string;
  updatedAt: string | null;
}

export interface GetChatUserResponse {
  ok: boolean;
  error: string | null;
  user: User | null;
}

export type CustomTokenMeansOptions = "KAKAO";

export interface GetCustomTokenResponse {
  ok: boolean;
  error: string | null;
  token: string | null;
}

export interface GetMyChatResponse {
  ok: boolean;
  error: string | null;
  chat: Array<Chat> | null;
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

export interface GetUserProfileResponse {
  ok: boolean;
  error: string | null;
  user: User | null;
}

export interface Mutation {
  LeaveChat: LeaveChatResponse;
  SendChatMessage: SendChatMessageResponse;
  LoginCompletePhoneVerification: LoginCompletePhoneVerificationResponse;
  LoginStartPhoneVerification: LoginStartPhoneVerificationResponse | null;
  ReportMovement: ReportMovementResponse;
  SetUserNotify: SetUserNotifyResponse;
  SignUpCompletePhoneVerification: SignUpCompletePhoneVerificationResponse;
  SignUpStartPhoneVerification: SignUpStartPhoneVerificationResponse;
  UpdateUserProfile: UpdateUserProfileResponse;
}

export interface LeaveChatMutationArgs {
  id: number;
}

export interface SendChatMessageMutationArgs {
  chatId: number | null;
  receiveUserId: number | null;
  text: string;
}

export interface LoginCompletePhoneVerificationMutationArgs {
  phoneNumber: string;
  key: string;
}

export interface LoginStartPhoneVerificationMutationArgs {
  phoneNumber: string;
}

export interface ReportMovementMutationArgs {
  lastLat: number | null;
  lastLng: number | null;
}

export interface SetUserNotifyMutationArgs {
  token: string;
}

export interface SignUpCompletePhoneVerificationMutationArgs {
  phoneNumber: string;
  key: string;
  fbId: string | null;
  ggId: string | null;
  kkId: string | null;
  nickName: string;
  gender: string;
  birth: string;
}

export interface SignUpStartPhoneVerificationMutationArgs {
  phoneNumber: string;
}

export interface UpdateUserProfileMutationArgs {
  nickName: string;
  intro: string;
  profilePhoto: Array<string>;
}

export interface LeaveChatResponse {
  ok: boolean;
  error: string | null;
}

export interface SendChatMessageResponse {
  ok: boolean;
  error: string | null;
  message: Message | null;
}

export interface LoginCompletePhoneVerificationResponse {
  ok: boolean;
  error: string | null;
  userId: number | null;
  token: string | null;
}

export interface LoginStartPhoneVerificationResponse {
  ok: boolean;
  error: string | null;
}

export interface ReportMovementResponse {
  ok: boolean;
  error: string | null;
}

export interface SetUserNotifyResponse {
  ok: boolean;
  error: string | null;
}

export interface SignUpCompletePhoneVerificationResponse {
  ok: boolean;
  error: string | null;
  userId: number | null;
  token: string | null;
}

export interface SignUpStartPhoneVerificationResponse {
  ok: boolean;
  error: string | null;
}

export interface UpdateUserProfileResponse {
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
