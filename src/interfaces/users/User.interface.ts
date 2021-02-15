interface IUserResponse {
  _id: string;
  fullName: string;
  email: string;
  username: string;
  avatarUrl?: string;
  isVerified: boolean;
}

export default IUserResponse;
