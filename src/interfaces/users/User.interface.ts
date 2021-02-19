interface IUserResponse {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  gender: string;
  phoneNumber: string;
  dateOfBirth?: string;
  address?: string;
  avatarUrl?: string;
  isVerified: boolean;
}

export default IUserResponse;
