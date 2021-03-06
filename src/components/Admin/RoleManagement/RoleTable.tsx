import { GridColDef, GridValueGetterParams } from "@material-ui/data-grid";
import { useRoles } from "hooks/queries/roles";
import * as React from "react";
import DataTable from "../DataTable";
import DeleteRoleModal from "./DeleteRoleModal";
import EditRoleModal from "./EditRoleModal";

interface Props {}

const RoleTable: React.FC<Props> = () => {
  const { data: roles } = useRoles();

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 400 },
    { field: "roleName", headerName: "Role name", width: 500 },
    {
      field: "options",
      headerName: "Options",
      width: 130,
      valueGetter: (params: GridValueGetterParams) => {
        return params.getValue("id");
      },
      renderCell: (params) => (
        <div className="flex items-center">
          <EditRoleModal roleId={params.value as string} />
          <DeleteRoleModal roleId={params.value as string} />
        </div>
      ),
    },
  ];
  const rows = roles?.map((item) => ({
    id: item._id,
    roleName: item.roleName,
  }));
  return <div>{rows ? <DataTable rows={rows} columns={columns} /> : null}</div>;
};

export default RoleTable;
