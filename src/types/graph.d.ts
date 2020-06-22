export const typeDefs = ["type Subscription {\n  MessageSubscription: Message\n}\n\ntype SendChatMessageResponse {\n  ok: Boolean!\n  error: String\n  message: Message\n}\n\ntype Mutation {\n  SendChatMessage(chatId: Int, receiveUserId: Int!, text: String!): SendChatMessageResponse!\n  CompletePhoneVerification(phoneNumber: String!, key: String!, nickName: String!, gender: String!, birth: String!, fbId: String, ggId: String): CompletePhoneVerificationResponse!\n  ReportMovement(lastLat: Float, lastLng: Float): ReportMovementResponse!\n  StartPhoneVerification(phoneNumber: String!): StartPhoneVerificationResponse\n}\n\ntype Chat {\n  id: Int!\n  users: [User!]!\n  createdAt: String!\n  updatedAt: String\n}\n\ntype Message {\n  id: Int!\n  text: String!\n  userId: Int\n  chatId: Int\n  createdAt: String!\n  updatedAt: String\n}\n\ntype CompletePhoneVerificationResponse {\n  ok: Boolean!\n  error: String\n  userId: Int\n  token: String\n}\n\ntype GetMyProfileResponse {\n  ok: Boolean!\n  error: String\n  user: User\n}\n\ntype Query {\n  GetMyProfile: GetMyProfileResponse!\n  GetUserList(requestTime: String!, means: String!, skip: Int!, take: Int!): GetUserListResponse!\n  user: User\n}\n\ntype GetUserListResponse {\n  ok: Boolean!\n  error: String\n  users: [User]\n}\n\ntype ReportMovementResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype User {\n  id: Int!\n  nickName: String!\n  birth: String!\n  gender: String!\n  intro: String!\n  profilePhoto: [String]\n  phoneNumber: String!\n  verifiedPhoneNumber: Boolean!\n  isOnline: Boolean!\n  lastLng: Float\n  lastLat: Float\n  fbId: String\n  ggId: String\n  chats: [Chat!]\n  createdAt: String!\n  updatedAt: String\n}\n\ntype StartPhoneVerificationResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype Verification {\n  id: Int!\n  target: String!\n  payload: String!\n  key: String!\n  verified: Boolean!\n  createdAt: String!\n  updatedAt: String\n}\n"];
/* tslint:disable */

export interface Query {
  GetMyProfile: GetMyProfileResponse;
  GetUserList: GetUserListResponse;
  user: User | null;
}

export interface GetUserListQueryArgs {
  requestTime: string;
  means: string;
  skip: number;
  take: number;
}

export interface GetMyProfileResponse {
  ok: boolean;
  error: string | null;
  user: User | null;
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
  chats: Array<Chat>;
  createdAt: string;
  updatedAt: string | null;
}

export interface Chat {
  id: number;
  users: Array<User>;
  createdAt: string;
  updatedAt: string | null;
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
  StartPhoneVerification: StartPhoneVerificationResponse | null;
}

export interface SendChatMessageMutationArgs {
  chatId: number | null;
  receiveUserId: number;
  text: string;
}

export interface CompletePhoneVerificationMutationArgs {
  phoneNumber: string;
  key: string;
  nickName: string;
  gender: string;
  birth: string;
  fbId: string | null;
  ggId: string | null;
}

export interface ReportMovementMutationArgs {
  lastLat: number | null;
  lastLng: number | null;
}

export interface StartPhoneVerificationMutationArgs {
  phoneNumber: string;
}

export interface SendChatMessageResponse {
  ok: boolean;
  error: string | null;
  message: Message | null;
}

export interface Message {
  id: number;
  text: string;
  userId: number | null;
  chatId: number | null;
  createdAt: string;
  updatedAt: string | null;
}

export interface CompletePhoneVerificationResponse {
  ok: boolean;
  error: string | null;
  userId: number | null;
  token: string | null;
}

export interface ReportMovementResponse {
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
