export interface IUserResponse {
  _id?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  username?: string;
  gender?: string;
  phoneNumber?: string;
  dateOfBirth?: string;
  address?: string;
  roldId?: string;
  avatarUrl?: string;
  introduction?: string;
  isVerified?: boolean;
}

export interface IDisplayedUserData {
  email: boolean;
  gender: boolean;
  phoneNumber: boolean;
  dateOfBirth: boolean;
  address: boolean;
}

export interface IUpdateUserData {
  gender?: string;
  phoneNumber?: string;
  address?: string;
}
