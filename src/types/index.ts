export type AlertType = "success" | "info" | "warning" | "error" | undefined;

export type FileReaderResultType = string | ArrayBuffer | null;

export type UserFieldType =
  | "_id"
  | "firstName"
  | "lastName"
  | "email"
  | "username"
  | "gender"
  | "dateOfBirth"
  | "phoneNumber"
  | "address"
  | "roleId"
  | "profileId"
  | "avatarUrl"
  | "isEmailVerified"
  | "isIdVerified";

export type ExperienceFieldType = "_id" | "theme" | "title" | "language";
