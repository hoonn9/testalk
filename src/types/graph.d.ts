export const typeDefs = ["type GetChatUserResponse {\n  ok: Boolean!\n  error: String\n  user: User\n}\n\ntype Query {\n  GetChatUser(id: Int!): GetChatUserResponse!\n  GetCommentList(id: Int!, skip: Int!, take: Int!, sort: SortTarget!): GetCommentListResponse!\n  GetILikeUserList(skip: Int!, take: Int!): GetILikeUserListResponse!\n  GetLikeMeUserList(requestTime: String!, skip: Int!, take: Int!): GetLikeMeUserListResponse!\n  GetPost(id: Int!): GetPostResponse!\n  GetPostList(requestTime: String!, means: String!, skip: Int!, take: Int!): GetPostListResponse!\n  GetCustomToken(means: CustomTokenMeansOptions!, socialId: String!): GetCustomTokenResponse!\n  GetMyChat: GetMyChatResponse!\n  GetMyProfile: GetMyProfileResponse!\n  GetUserList(requestTime: String!, means: GetUserListMeans!, skip: Int!, take: Int!): GetUserListResponse!\n  GetUserProfile(id: Int!): GetUserProfileResponse!\n}\n\ntype LeaveChatResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype Mutation {\n  LeaveChat(id: Int!): LeaveChatResponse!\n  SendChatMessage(chatId: Int, receiveUserId: Int, text: String!, sendTime: String!): SendChatMessageResponse!\n  AddComment(postId: Int!, parentId: Int, content: String!): AddCommentResponse!\n  TogglePostLike(id: Int!): TogglePostLikeResponse!\n  ToggleUserLike(id: Int!): ToggleUserLikeResponse!\n  UploadPost(title: String!, content: String!, postPhotos: [PhotoObject!]): UploadPostResponse\n  LoginCompletePhoneVerification(phoneNumber: String!, key: String!): LoginCompletePhoneVerificationResponse!\n  LoginStartPhoneVerification(phoneNumber: String!): LoginStartPhoneVerificationResponse\n  ReportMovement(lastLat: Float, lastLng: Float): ReportMovementResponse!\n  SetUserNotify(token: String!): SetUserNotifyResponse!\n  SignUpCompletePhoneVerification(phoneNumber: String!, key: String!, fbId: String, ggId: String, kkId: String, nickName: String!, gender: String!, birth: String!): SignUpCompletePhoneVerificationResponse!\n  SignUpStartPhoneVerification(phoneNumber: String!): SignUpStartPhoneVerificationResponse!\n  UpdateUserProfile(nickName: String!, intro: String!, profilePhoto: [PhotoObject!]!): UpdateUserProfileResponse!\n  FindVoiceUser(age: Int, distance: Float, gender: GenderTarget): FindVoiceUserResponse\n}\n\ntype MessageSubscribeResponse {\n  userId: Int!\n  chatId: Int!\n  text: String!\n  target: MessageTarget!\n  createdAt: String!\n}\n\nenum MessageTarget {\n  CHAT\n  LEAVE\n}\n\ntype Subscription {\n  MessageSubscription(chatId: Int!): MessageSubscribeResponse\n}\n\ntype SendChatMessageResponse {\n  ok: Boolean!\n  error: String\n  chatId: Int\n}\n\ntype Chat {\n  id: Int!\n  users: [UserChat!]!\n  userIds: [Int!]!\n  messages: [Message]\n  createdAt: String!\n  updatedAt: String\n}\n\ntype AddCommentResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype GetCommentListResponse {\n  ok: Boolean!\n  error: String\n  comments: [Comment]\n}\n\nenum SortTarget {\n  ASC\n  DESC\n}\n\ntype Comment {\n  id: Int!\n  parentId: Int\n  content: String!\n  user: User!\n  userId: Int!\n  post: Post!\n  postId: Int!\n  depth: Int!\n  seq: Int!\n  createdAt: String!\n  updatedAt: String\n}\n\ntype File {\n  id: Int!\n  user: User!\n  userId: Int!\n  post: Post\n  postId: Int\n  url: String!\n  key: String!\n  createdAt: String!\n  updatedAt: String\n}\n\ntype GetILikeUserListResponse {\n  ok: Boolean!\n  error: String\n  likes: [Like]\n}\n\ntype GetLikeMeUserListResponse {\n  ok: Boolean!\n  error: String\n  likes: [Like]\n}\n\ntype Like {\n  id: Int!\n  user: User!\n  userId: Int!\n  post: Post!\n  postId: Int!\n  likeUser: User!\n  likeUserId: Int!\n  createdAt: String!\n  updatedAt: String\n}\n\ntype TogglePostLikeResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype ToggleUserLikeResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype Message {\n  id: Int!\n  text: String!\n  userId: Int\n  chat: Chat!\n  chatId: Int\n  target: String!\n  createdAt: String!\n  updatedAt: String\n}\n\ntype GetPostResponse {\n  ok: Boolean!\n  error: String\n  post: Post\n  isLiked: Boolean\n}\n\ntype GetPostListResponse {\n  ok: Boolean!\n  error: String\n  posts: [Post]\n}\n\ntype Post {\n  id: Int!\n  title: String!\n  content: String!\n  userId: Int!\n  user: User!\n  files: [File!]\n  comments: [Comment!]\n  likes: [Like!]\n  readCount: Int!\n  likeCount: Int!\n  commentCount: Int!\n  createdAt: String!\n  updatedAt: String\n}\n\ntype UploadPostResponse {\n  ok: Boolean!\n  error: String\n}\n\nenum PhotoTarget {\n  upload\n  delete\n  upload\n  delete\n}\n\ninput PhotoObject {\n  url: String!\n  key: String!\n  target: PhotoTarget!\n  url: String!\n  key: String!\n  target: PhotoTarget!\n}\n\ntype GetCustomTokenResponse {\n  ok: Boolean!\n  error: String\n  token: String\n}\n\nenum CustomTokenMeansOptions {\n  KAKAO\n}\n\ntype GetMyChatResponse {\n  ok: Boolean!\n  error: String\n  chat: [Chat]\n}\n\ntype GetMyProfileResponse {\n  ok: Boolean!\n  error: String\n  user: User\n  likeCount: Int\n}\n\ntype GetUserListResponse {\n  ok: Boolean!\n  error: String\n  users: [User]\n  order: [Int]\n}\n\nenum GetUserListMeans {\n  login\n  distance\n  hot\n  join\n}\n\ntype GetUserProfileResponse {\n  ok: Boolean!\n  error: String\n  user: User\n  likeCount: Int\n  isLiked: Boolean\n}\n\ntype LoginCompletePhoneVerificationResponse {\n  ok: Boolean!\n  error: String\n  userId: Int\n  token: String\n}\n\ntype LoginStartPhoneVerificationResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype ReportMovementResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype SetUserNotifyResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype User {\n  id: Int!\n  nickName: String!\n  birth: String!\n  gender: String!\n  intro: String!\n  profilePhoto: [File!]\n  phoneNumber: String!\n  verifiedPhoneNumber: Boolean!\n  isOnline: Boolean!\n  lastLng: Float\n  lastLat: Float\n  fbId: String\n  ggId: String\n  kkId: String\n  notifyId: String\n  chats: [UserChat!]\n  voices: [UserVoice!]\n  files: [File!]\n  likes: [Like!]\n  doLikes: [Like!]\n  cash: Int!\n  posts: [Post!]\n  comments: [Comment!]\n  createdAt: String!\n  updatedAt: String\n}\n\ntype SignUpCompletePhoneVerificationResponse {\n  ok: Boolean!\n  error: String\n  userId: Int\n  token: String\n}\n\ntype SignUpStartPhoneVerificationResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype UpdateUserProfileResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype UserChat {\n  user: User!\n  userId: Int!\n  chat: Chat!\n  chatId: Int!\n  createdAt: String!\n  updatedAt: String\n}\n\ntype UserVoice {\n  user: User!\n  userId: Int!\n  voice: Voice!\n  voiceId: Int!\n  createdAt: String!\n  updatedAt: String\n}\n\ntype Verification {\n  id: Int!\n  target: String!\n  payload: String!\n  key: String!\n  verified: Boolean!\n  createdAt: String!\n  updatedAt: String\n}\n\ntype FindVoiceUserResponse {\n  ok: Boolean!\n  error: String\n}\n\nenum GenderTarget {\n  male\n  female\n}\n\ntype Voice {\n  id: Int!\n  users: [UserVoice!]!\n  userIds: [Int!]!\n  createdAt: String!\n  updatedAt: String\n}\n\ntype VoiceWait {\n  id: Int!\n  userId: Int!\n  birth: String!\n  lastLng: Float!\n  lastLat: Float!\n  gender: String!\n  createdAt: String!\n  updatedAt: String\n}\n"];
/* tslint:disable */

export interface Query {
  GetChatUser: GetChatUserResponse;
  GetCommentList: GetCommentListResponse;
  GetILikeUserList: GetILikeUserListResponse;
  GetLikeMeUserList: GetLikeMeUserListResponse;
  GetPost: GetPostResponse;
  GetPostList: GetPostListResponse;
  GetCustomToken: GetCustomTokenResponse;
  GetMyChat: GetMyChatResponse;
  GetMyProfile: GetMyProfileResponse;
  GetUserList: GetUserListResponse;
  GetUserProfile: GetUserProfileResponse;
}

export interface GetChatUserQueryArgs {
  id: number;
}

export interface GetCommentListQueryArgs {
  id: number;
  skip: number;
  take: number;
  sort: SortTarget;
}

export interface GetILikeUserListQueryArgs {
  skip: number;
  take: number;
}

export interface GetLikeMeUserListQueryArgs {
  requestTime: string;
  skip: number;
  take: number;
}

export interface GetPostQueryArgs {
  id: number;
}

export interface GetPostListQueryArgs {
  requestTime: string;
  means: string;
  skip: number;
  take: number;
}

export interface GetCustomTokenQueryArgs {
  means: CustomTokenMeansOptions;
  socialId: string;
}

export interface GetUserListQueryArgs {
  requestTime: string;
  means: GetUserListMeans;
  skip: number;
  take: number;
}

export interface GetUserProfileQueryArgs {
  id: number;
}

export interface GetChatUserResponse {
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
  chats: Array<UserChat>;
  voices: Array<UserVoice>;
  files: Array<File>;
  likes: Array<Like>;
  doLikes: Array<Like>;
  cash: number;
  posts: Array<Post>;
  comments: Array<Comment>;
  createdAt: string;
  updatedAt: string | null;
}

export interface File {
  id: number;
  user: User;
  userId: number;
  post: Post | null;
  postId: number | null;
  url: string;
  key: string;
  createdAt: string;
  updatedAt: string | null;
}

export interface Post {
  id: number;
  title: string;
  content: string;
  userId: number;
  user: User;
  files: Array<File>;
  comments: Array<Comment>;
  likes: Array<Like>;
  readCount: number;
  likeCount: number;
  commentCount: number;
  createdAt: string;
  updatedAt: string | null;
}

export interface Comment {
  id: number;
  parentId: number | null;
  content: string;
  user: User;
  userId: number;
  post: Post;
  postId: number;
  depth: number;
  seq: number;
  createdAt: string;
  updatedAt: string | null;
}

export interface Like {
  id: number;
  user: User;
  userId: number;
  post: Post;
  postId: number;
  likeUser: User;
  likeUserId: number;
  createdAt: string;
  updatedAt: string | null;
}

export interface UserChat {
  user: User;
  userId: number;
  chat: Chat;
  chatId: number;
  createdAt: string;
  updatedAt: string | null;
}

export interface Chat {
  id: number;
  users: Array<UserChat>;
  userIds: Array<number>;
  messages: Array<Message> | null;
  createdAt: string;
  updatedAt: string | null;
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

export interface UserVoice {
  user: User;
  userId: number;
  voice: Voice;
  voiceId: number;
  createdAt: string;
  updatedAt: string | null;
}

export interface Voice {
  id: number;
  users: Array<UserVoice>;
  userIds: Array<number>;
  createdAt: string;
  updatedAt: string | null;
}

export type SortTarget = "ASC" | "DESC";

export interface GetCommentListResponse {
  ok: boolean;
  error: string | null;
  comments: Array<Comment> | null;
}

export interface GetILikeUserListResponse {
  ok: boolean;
  error: string | null;
  likes: Array<Like> | null;
}

export interface GetLikeMeUserListResponse {
  ok: boolean;
  error: string | null;
  likes: Array<Like> | null;
}

export interface GetPostResponse {
  ok: boolean;
  error: string | null;
  post: Post | null;
  isLiked: boolean | null;
}

export interface GetPostListResponse {
  ok: boolean;
  error: string | null;
  posts: Array<Post> | null;
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
  likeCount: number | null;
}

export type GetUserListMeans = "login" | "distance" | "hot" | "join";

export interface GetUserListResponse {
  ok: boolean;
  error: string | null;
  users: Array<User> | null;
  order: Array<number> | null;
}

export interface GetUserProfileResponse {
  ok: boolean;
  error: string | null;
  user: User | null;
  likeCount: number | null;
  isLiked: boolean | null;
}

export interface Mutation {
  LeaveChat: LeaveChatResponse;
  SendChatMessage: SendChatMessageResponse;
  AddComment: AddCommentResponse;
  TogglePostLike: TogglePostLikeResponse;
  ToggleUserLike: ToggleUserLikeResponse;
  UploadPost: UploadPostResponse | null;
  LoginCompletePhoneVerification: LoginCompletePhoneVerificationResponse;
  LoginStartPhoneVerification: LoginStartPhoneVerificationResponse | null;
  ReportMovement: ReportMovementResponse;
  SetUserNotify: SetUserNotifyResponse;
  SignUpCompletePhoneVerification: SignUpCompletePhoneVerificationResponse;
  SignUpStartPhoneVerification: SignUpStartPhoneVerificationResponse;
  UpdateUserProfile: UpdateUserProfileResponse;
  FindVoiceUser: FindVoiceUserResponse | null;
}

export interface LeaveChatMutationArgs {
  id: number;
}

export interface SendChatMessageMutationArgs {
  chatId: number | null;
  receiveUserId: number | null;
  text: string;
  sendTime: string;
}

export interface AddCommentMutationArgs {
  postId: number;
  parentId: number | null;
  content: string;
}

export interface TogglePostLikeMutationArgs {
  id: number;
}

export interface ToggleUserLikeMutationArgs {
  id: number;
}

export interface UploadPostMutationArgs {
  title: string;
  content: string;
  postPhotos: Array<PhotoObject>;
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
  profilePhoto: Array<PhotoObject>;
}

export interface FindVoiceUserMutationArgs {
  age: number | null;
  distance: number | null;
  gender: GenderTarget | null;
}

export interface LeaveChatResponse {
  ok: boolean;
  error: string | null;
}

export interface SendChatMessageResponse {
  ok: boolean;
  error: string | null;
  chatId: number | null;
}

export interface AddCommentResponse {
  ok: boolean;
  error: string | null;
}

export interface TogglePostLikeResponse {
  ok: boolean;
  error: string | null;
}

export interface ToggleUserLikeResponse {
  ok: boolean;
  error: string | null;
}

export interface PhotoObject {
  url: string;
  key: string;
  target: PhotoTarget;
}

export type PhotoTarget = "upload" | "delete";

export interface UploadPostResponse {
  ok: boolean;
  error: string | null;
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

export type GenderTarget = "male" | "female";

export interface FindVoiceUserResponse {
  ok: boolean;
  error: string | null;
}

export interface Subscription {
  MessageSubscription: MessageSubscribeResponse | null;
}

export interface MessageSubscriptionSubscriptionArgs {
  chatId: number;
}

export interface MessageSubscribeResponse {
  userId: number;
  chatId: number;
  text: string;
  target: MessageTarget;
  createdAt: string;
}

export type MessageTarget = "CHAT" | "LEAVE";

export interface Verification {
  id: number;
  target: string;
  payload: string;
  key: string;
  verified: boolean;
  createdAt: string;
  updatedAt: string | null;
}

export interface VoiceWait {
  id: number;
  userId: number;
  birth: string;
  lastLng: number;
  lastLat: number;
  gender: string;
  createdAt: string;
  updatedAt: string | null;
}
