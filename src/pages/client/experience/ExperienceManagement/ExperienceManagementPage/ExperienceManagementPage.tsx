import MainLayout from "layouts/MainLayout";
import * as React from "react";
import HostingListTab from "./HostingListTab";

interface Props {}

const ExperienceManagementPage: React.FC<Props> = () => {
  return (
    <MainLayout withSearchBar={false}>
      <div className="mt-6">
        <HostingListTab />
      </div>
    </MainLayout>
  );
};

export default ExperienceManagementPage;
