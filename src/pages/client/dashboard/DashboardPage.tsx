import { Typography } from "@material-ui/core";
import MainLayout from "layouts/MainLayout";
import * as React from "react";

interface Props {}

const DashboardPage: React.FC<Props> = () => {
  return (
    <MainLayout>
      <div className="my-8 max-w-6xl mx-auto">
        <Typography className="text-3xl text-secondary font-bold">
          Bảng điều khiển
        </Typography>
      </div>
    </MainLayout>
  );
};

export default DashboardPage;
