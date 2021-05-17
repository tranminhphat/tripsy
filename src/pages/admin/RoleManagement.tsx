import InsertRoleModal from "components/Admin/RoleManagement/InsertRoleModal";
import RoleTable from "components/Admin/RoleManagement/RoleTable";
import * as React from "react";

interface Props {}

const RoleManagement: React.FC<Props> = () => {
  return (
    <>
      <div className="flex justify-end">
        <InsertRoleModal />
      </div>
      <div className="mt-4 bg-white border shadow-lg border-gray-200 p-2">
        <RoleTable />
      </div>
    </>
  );
};

export default RoleManagement;
