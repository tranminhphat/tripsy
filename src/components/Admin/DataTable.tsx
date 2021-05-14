import { DataGrid, GridColDef } from "@material-ui/data-grid";
import * as React from "react";

interface Props {
  columns: GridColDef[];
  rows: any[];
}

const DataTable: React.FC<Props> = ({ columns, rows }) => {
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid rows={rows} columns={columns} pageSize={5} checkboxSelection />
    </div>
  );
};

export default DataTable;
