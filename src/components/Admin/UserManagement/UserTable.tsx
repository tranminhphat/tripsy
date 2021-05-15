import { IconButton, Tooltip } from "@material-ui/core";
import { GridColDef } from "@material-ui/data-grid";
import ClearIcon from "@material-ui/icons/Clear";
import EditIcon from "@material-ui/icons/Edit";
import { useUsers } from "hooks/queries/users";
import * as React from "react";
import DataTable from "../DataTable";

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
      width: 100,
      valueFormatter: ({ value }) => {
        const castValue = value as string[];
        return castValue.reduce((prev, curr, curIndex) => {
          const roleName =
            curr === "603275723be1c62dc86527b8" ? "Admin" : "User";
          if (curIndex !== castValue.length - 1) {
            return roleName + ",";
          }
          return roleName;
        }, "");
      },
    },
    {
      field: "options",
      headerName: "Options",
      width: 130,
      renderCell: () => (
        <div className="flex items-center">
          <IconButton>
            <Tooltip title="Edit user">
              <EditIcon />
            </Tooltip>
          </IconButton>
          <IconButton>
            <Tooltip title="Delete user">
              <ClearIcon />
            </Tooltip>
          </IconButton>
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
