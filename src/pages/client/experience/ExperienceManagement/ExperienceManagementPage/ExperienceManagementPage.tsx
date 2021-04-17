import { Tab, Tabs } from "@material-ui/core";
import MyTabPanel from "components/Shared/MyTabPanel";
import MainLayout from "layouts/MainLayout";
import * as React from "react";
import ExperienceListTab from "./ExperienceListTab";
import HostingListTab from "./HostingListTab";

interface Props {}

const ExperienceManagementPage: React.FC<Props> = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <MainLayout withSearchBar={false}>
      <div className="mt-6">
        <Tabs
          TabIndicatorProps={{
            style: { backgroundColor: "#0062cc" },
          }}
          value={value}
          onChange={handleChange}
        >
          <Tab
            className={`focus:outline-none text-lg ${
              value === 0 ? "text-primary" : null
            }`}
            label="Trải nghiệm"
          />
          <Tab
            className={`focus:outline-none text-lg ${
              value === 1 ? "text-primary" : null
            }`}
            label="Hoạt động của bạn"
          />
        </Tabs>
        <MyTabPanel value={value} index={0}>
          <ExperienceListTab />
        </MyTabPanel>
        <MyTabPanel value={value} index={1}>
          <HostingListTab />
        </MyTabPanel>
      </div>
    </MainLayout>
  );
};

export default ExperienceManagementPage;
