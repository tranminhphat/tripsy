import { DataGrid, GridColDef } from "@material-ui/data-grid";
import * as React from "react";

interface Props {
  columns: GridColDef[];
  rows: any[];
}

const DataTable: React.FC<Props> = ({ columns, rows }) => {
  return (
    <div style={{ height: 500, width: "100%" }}>
      <DataGrid
        className="border-none"
        rows={rows}
        columns={columns}
        pageSize={10}
      />
    </div>
  );
};

export default DataTable;
