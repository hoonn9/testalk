export const typeDefs = ["type CompletePhoneVerificationResponse {\n  ok: Boolean!\n  error: String\n  token: String\n}\n\ntype Mutation {\n  CompletePhoneVerification(phoneNumber: String!, key: String!): CompletePhoneVerificationResponse!\n  StartPhoneVerification(phoneNumber: String!): StartPhoneVerificationResponse\n}\n\ntype User {\n  id: Int!\n  nickName: String!\n  birth: String!\n  gender: String!\n  profilePhoto: [String]\n  phoneNumber: String!\n  verifiedPhoneNumber: Boolean!\n  isOnline: Boolean!\n  lastLng: Float\n  lastLat: Float\n  lastOrientation: Float\n  fbId: String\n  createdAt: String!\n  updatedAt: String\n}\n\ntype Query {\n  user: User\n}\n\ntype StartPhoneVerificationResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype Verification {\n  id: Int!\n  target: String!\n  payload: String!\n  key: String!\n  verified: Boolean!\n  createdAt: String!\n  updatedAt: String\n}\n"];
/* tslint:disable */

export interface Query {
  user: User | null;
}

export interface User {
  id: number;
  nickName: string;
  birth: string;
  gender: string;
  profilePhoto: Array<string> | null;
  phoneNumber: string;
  verifiedPhoneNumber: boolean;
  isOnline: boolean;
  lastLng: number | null;
  lastLat: number | null;
  lastOrientation: number | null;
  fbId: string | null;
  createdAt: string;
  updatedAt: string | null;
}

export interface Mutation {
  CompletePhoneVerification: CompletePhoneVerificationResponse;
  StartPhoneVerification: StartPhoneVerificationResponse | null;
}

export interface CompletePhoneVerificationMutationArgs {
  phoneNumber: string;
  key: string;
}

export interface StartPhoneVerificationMutationArgs {
  phoneNumber: string;
}

export interface CompletePhoneVerificationResponse {
  ok: boolean;
  error: string | null;
  token: string | null;
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
