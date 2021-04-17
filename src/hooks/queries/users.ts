import { getCurrentUser, getUserById } from "api/users";
import { IUser } from "interfaces/users/user.interface";
import { useQuery } from "react-query";
import { UserFieldType } from "types";

export const useUser = (userId: string) => {
  return useQuery(
    ["user", userId],
    async () => {
      const { data: user } = await getUserById(userId);
      return user;
    },
    {
      enabled: !!userId,
    }
  );
};

export const useCurrentUser = (fieldsArray?: UserFieldType[]) => {
  return useQuery<IUser>("currentUser", async () => {
    const {
      data: { user },
    } = await getCurrentUser(fieldsArray);

    return user;
  });
};
