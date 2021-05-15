import { getCurrentUser, getUserById, getUsers } from "api/users";
import { IUser } from "interfaces/users/user.interface";
import { useQuery } from "react-query";
import { UserFieldType } from "types";

export const useUsers = () => {
  return useQuery<IUser[]>(["users"], async () => {
    const {
      data: { users },
    } = await getUsers();
    return users;
  });
};

export const useUser = (userId: string) => {
  return useQuery<IUser>(
    ["users", userId],
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
