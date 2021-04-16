import { getCurrentUser } from "api/users";
import { IUser } from "interfaces/users/user.interface";
import { useQuery } from "react-query";
import { UserFieldType } from "types";

const useCurrentUser = (fieldsArray?: UserFieldType[]) => {
  return useQuery<IUser>("currentUser", async () => {
    const {
      data: { user },
    } = await getCurrentUser(fieldsArray);

    return user;
  });
};

export default useCurrentUser;
