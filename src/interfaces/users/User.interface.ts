export interface IUser {
  _id?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  username?: string;
  gender?: string;
  phoneNumber?: string;
  dateOfBirth?: string;
  address?: string;
  avatarUrl?: string;
  roldId?: string;
  profileId?: string;
  payoutAccountId?: string;
  isEmailVerified?: boolean;
  isPhoneVerified?: boolean;
  isPayOutEnabled?: boolean;
}
