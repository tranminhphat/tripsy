import { FileReaderResultType } from "types";

interface IRegisterForm {
  firstName: string;
  lastName: string;
  username: string;
  password?: string;
  gender: string;
  dateOfBirth: string;
  phoneNumber: string;
  address: string;
  roles?: string[];
  avatarBase64?: FileReaderResultType;
  introduction?: string;
}

export default IRegisterForm;
