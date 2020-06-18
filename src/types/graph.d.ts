export const typeDefs = ["type CompletePhoneVerificationResponse {\n  ok: Boolean!\n  error: String\n  token: String\n}\n\ntype Mutation {\n  CompletePhoneVerification(phoneNumber: String!, key: String!, nickName: String!, gender: String!, birth: String!): CompletePhoneVerificationResponse!\n  ReportMovement(lastLat: Float, lastLng: Float): ReportMovementResponse!\n  StartPhoneVerification(phoneNumber: String!): StartPhoneVerificationResponse\n}\n\ntype GetMyProfileResponse {\n  ok: Boolean!\n  error: String\n  user: User\n}\n\ntype Query {\n  GetMyProfile: GetMyProfileResponse!\n  GetUserList(requestTime: String!, means: String!, skip: Int!, take: Int!): GetUserListResponse!\n  user: User\n}\n\ntype GetUserListResponse {\n  ok: Boolean!\n  error: String\n  users: [User]\n}\n\ntype ReportMovementResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype User {\n  id: Int!\n  nickName: String!\n  birth: String!\n  gender: String!\n  intro: String!\n  profilePhoto: [String]\n  phoneNumber: String!\n  verifiedPhoneNumber: Boolean!\n  isOnline: Boolean!\n  lastLng: Float\n  lastLat: Float\n  fbId: String\n  createdAt: String!\n  updatedAt: String\n}\n\ntype StartPhoneVerificationResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype Verification {\n  id: Int!\n  target: String!\n  payload: String!\n  key: String!\n  verified: Boolean!\n  createdAt: String!\n  updatedAt: String\n}\n"];
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
  createdAt: string;
  updatedAt: string | null;
}

export interface GetUserListResponse {
  ok: boolean;
  error: string | null;
  users: Array<User> | null;
}

export interface Mutation {
  CompletePhoneVerification: CompletePhoneVerificationResponse;
  ReportMovement: ReportMovementResponse;
  StartPhoneVerification: StartPhoneVerificationResponse | null;
}

export interface CompletePhoneVerificationMutationArgs {
  phoneNumber: string;
  key: string;
  nickName: string;
  gender: string;
  birth: string;
}

export interface ReportMovementMutationArgs {
  lastLat: number | null;
  lastLng: number | null;
}

export interface StartPhoneVerificationMutationArgs {
  phoneNumber: string;
}

export interface CompletePhoneVerificationResponse {
  ok: boolean;
  error: string | null;
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

export interface Verification {
  id: number;
  target: string;
  payload: string;
  key: string;
  verified: boolean;
  createdAt: string;
  updatedAt: string | null;
}
