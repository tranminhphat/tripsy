import InsertUserModal from "components/Admin/UserManagement/InsertUserModal";
import UserTable from "components/Admin/UserManagement/UserTable";
import * as React from "react";

interface Props {}

const UserManagement: React.FC<Props> = () => {
  return (
    <>
      <div className="flex justify-end">
        <InsertUserModal />
      </div>
      <div className="mt-4 bg-white border shadow-lg border-gray-200 p-2">
        <UserTable />
      </div>
    </>
  );
};

export default UserManagement;
