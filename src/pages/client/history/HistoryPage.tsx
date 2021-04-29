import { Paper, Tab, Tabs, Typography } from "@material-ui/core";
import MyTabPanel from "components/Shared/MyTabPanel";
import MainLayout from "layouts/MainLayout";
import * as React from "react";
import ActivityHistoryTab from "./ActivityHistoryTab";
import HostingHistoryTab from "./HostingHistoryTab";

interface Props {}

const HistoryPage: React.FC<Props> = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };
  return (
    <MainLayout>
      <div className="my-8 max-w-6xl mx-auto">
        <Typography className="text-3xl text-secondary font-bold">
          Lịch sử
        </Typography>
        <div>
          <Paper className="mt-4 shadow-none">
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="primary"
              textColor="primary"
            >
              <Tab className="outline-none" label="Hoạt động bạn tham gia" />
              <Tab className="outline-none" label="Hoạt động bạn tổ chức" />
            </Tabs>
          </Paper>
          <MyTabPanel value={value} index={0}>
            <ActivityHistoryTab />
          </MyTabPanel>
          <MyTabPanel value={value} index={1}>
            <HostingHistoryTab />
          </MyTabPanel>
        </div>
      </div>
    </MainLayout>
  );
};

export default HistoryPage;
