import { getRoleById, getRoles } from "api/roles";
import IRole from "interfaces/roles/role.interface";
import { useQuery } from "react-query";

export const useRoles = () => {
  return useQuery<IRole[]>(["roles"], async () => {
    const {
      data: { roles },
    } = await getRoles();
    return roles;
  });
};

export const useRole = (id: string) => {
  return useQuery<IRole>(
    ["roles", id],
    async () => {
      const {
        data: { role },
      } = await getRoleById(id);
      return role;
    },
    { enabled: !!id }
  );
};
