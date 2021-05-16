import { GridColDef, GridValueGetterParams } from "@material-ui/data-grid";
import { useUsers } from "hooks/queries/users";
import * as React from "react";
import DataTable from "../DataTable";
import DeleteUserModal from "./DeleteUserModal";
import EditUserModal from "./EditUserModal";

interface Props {}

const UserTable: React.FC<Props> = () => {
  const { data: users } = useUsers();

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "firstName", headerName: "First name", width: 100 },
    { field: "lastName", headerName: "Last name", width: 100 },
    { field: "email", headerName: "Email", width: 190 },
    { field: "username", headerName: "Username", width: 100 },
    { field: "gender", headerName: "Gender", width: 100 },
    { field: "phoneNumber", headerName: "Phone number", width: 130 },
    {
      field: "role",
      headerName: "Role",
      width: 150,
      valueFormatter: ({ value }) => {
        const castValue = value as string[];
        return castValue
          .map((roleId) =>
            roleId === "603275723be1c62dc86527b8" ? "Admin" : "User"
          )
          .join(", ");
      },
    },
    {
      field: "options",
      headerName: "Options",
      width: 130,
      valueGetter: (params: GridValueGetterParams) => {
        return params.getValue("id");
      },
      renderCell: (params) => (
        <div className="flex items-center">
          <EditUserModal userId={params.value as string} />
          <DeleteUserModal userId={params.value as string} />
        </div>
      ),
    },
  ];
  const rows = users?.map((item) => ({
    id: item._id,
    firstName: item.firstName,
    lastName: item.lastName,
    email: item.email,
    username: item.username,
    gender: item.gender,
    phoneNumber: item.phoneNumber,
    role: item.roleId,
  }));
  return <div>{rows ? <DataTable rows={rows} columns={columns} /> : null}</div>;
};

export default UserTable;
