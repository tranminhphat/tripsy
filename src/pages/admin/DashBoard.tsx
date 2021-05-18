import { Typography } from "@material-ui/core";
import LocalActivityOutlinedIcon from "@material-ui/icons/LocalActivityOutlined";
import PermIdentityOutlinedIcon from "@material-ui/icons/PermIdentityOutlined";
import PieChartOutlinedIcon from "@material-ui/icons/PieChartOutlined";
import WorkOutlineIcon from "@material-ui/icons/WorkOutline";
import * as React from "react";

interface Props {}

const DashBoard: React.FC<Props> = () => {
  return (
    <div className="grid md:grid-cols-4 lg:grid-cols-12 gap-2">
      <div className="md:col-span-2 lg:col-span-3">
        <div className="bg-white p-4 flex items-center justify-between rounded-sm">
          <div>
            <div>
              <Typography
                className="text-2xl font-bold mb-1"
                style={{ color: "#e62265" }}
              >
                278
              </Typography>
            </div>
            <div>
              <Typography>New Experiences</Typography>
            </div>
          </div>
          <div>
            <WorkOutlineIcon
              style={{ width: 50, height: 50, color: "#e62265" }}
            />
          </div>
        </div>
      </div>
      <div className="md:col-span-2 lg:col-span-3">
        <div className="bg-white p-4 flex items-center justify-between rounded-sm">
          <div>
            <div>
              <Typography
                className="text-2xl font-bold mb-1"
                style={{ color: "#229e8f" }}
              >
                141
              </Typography>
            </div>
            <div>
              <Typography>New Users</Typography>
            </div>
          </div>
          <div>
            <PermIdentityOutlinedIcon
              style={{ width: 50, height: 50, color: "#229e8f" }}
            />
          </div>
        </div>
      </div>
      <div className="md:col-span-2 lg:col-span-3">
        <div className="bg-white p-4 flex items-center justify-between rounded-sm">
          <div>
            <div>
              <Typography
                className="text-2xl font-bold mb-1"
                style={{ color: "#ff5720" }}
              >
                243
              </Typography>
            </div>
            <div>
              <Typography>New Activities</Typography>
            </div>
          </div>
          <div>
            <LocalActivityOutlinedIcon
              style={{ width: 50, height: 50, color: "#ff5720" }}
            />
          </div>
        </div>
      </div>
      <div className="md:col-span-2 lg:col-span-3">
        <div className="bg-white p-4 flex items-center justify-between rounded-sm">
          <div>
            <div>
              <Typography
                className="text-2xl font-bold mb-1"
                style={{ color: "#14b8d2" }}
              >
                64,78%
              </Typography>
            </div>
            <div>
              <Typography>Good Feedback</Typography>
            </div>
          </div>
          <div>
            <PieChartOutlinedIcon
              style={{ width: 50, height: 50, color: "#14b8d2" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
