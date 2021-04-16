import { getUserById } from "api/users";
import { useQuery } from "react-query";

const useUser = (userId: string) => {
  return useQuery(["user", userId], async () => {
    const { data: user } = await getUserById(userId);
    return user;
  });
};

export default useUser;
