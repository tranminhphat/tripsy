import InsertThemeModal from "components/Admin/ThemeManagement/InsertThemeModal";
import ThemeTable from "components/Admin/ThemeManagement/ThemeTable";
import * as React from "react";

interface Props {}

const ThemeManagement: React.FC<Props> = () => {
  return (
    <>
      <div className="flex justify-end">
        <InsertThemeModal />
      </div>
      <div className="mt-4 bg-white border shadow-lg border-gray-200 p-2">
        <ThemeTable />
      </div>
    </>
  );
};

export default ThemeManagement;
