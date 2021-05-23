import { GridColDef, GridValueGetterParams } from "@material-ui/data-grid";
import { useThemes } from "hooks/queries/themes";
import * as React from "react";
import DataTable from "../DataTable";
import DeleteThemeModal from "./DeleteThemeModal";
import EditThemeModal from "./EditThemeModal";

interface Props {}

const RoleTable: React.FC<Props> = () => {
  const { data: themes } = useThemes();

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 400 },
    { field: "themeName", headerName: "Theme name", width: 500 },
    {
      field: "options",
      headerName: "Options",
      width: 130,
      valueGetter: (params: GridValueGetterParams) => {
        return params.getValue("id");
      },
      renderCell: (params) => (
        <div className="flex items-center">
          <EditThemeModal themeId={params.value as string} />
          <DeleteThemeModal themeId={params.value as string} />
        </div>
      ),
    },
  ];
  const rows = themes?.map((item) => ({
    id: item._id,
    themeName: item.value,
  }));
  return <div>{rows ? <DataTable rows={rows} columns={columns} /> : null}</div>;
};

export default RoleTable;
