import { Typography } from "@material-ui/core";
import LocalActivityOutlinedIcon from "@material-ui/icons/LocalActivityOutlined";
import PermIdentityOutlinedIcon from "@material-ui/icons/PermIdentityOutlined";
import PieChartOutlinedIcon from "@material-ui/icons/PieChartOutlined";
import WorkOutlineIcon from "@material-ui/icons/WorkOutline";
import TransactionTab from "components/Admin/DashBoard/TransactionTab";
import MyLoadingIndicator from "components/Shared/MyLoadingIndicator";
import { useActivities } from "hooks/queries/activities";
import { useExperiences } from "hooks/queries/experiences";
import { useUsers } from "hooks/queries/users";
import * as React from "react";

interface Props {}

const DashBoard: React.FC<Props> = () => {
  const { data: experiences } = useExperiences();
  const { data: activities } = useActivities();
  const { data: users } = useUsers();

  return (
    <>
      {experiences && activities && users ? (
        <>
          <div className="grid md:grid-cols-4 lg:grid-cols-12 gap-2">
            <div className="md:col-span-2 lg:col-span-3">
              <div className="bg-white p-4 flex items-center justify-between rounded-sm">
                <div>
                  <div>
                    <Typography
                      className="text-3xl font-bold mb-1"
                      style={{ color: "#e62265" }}
                    >
                      {experiences.length}
                    </Typography>
                  </div>
                  <div>
                    <Typography>New Experiences</Typography>
                  </div>
                </div>
                <div>
                  <WorkOutlineIcon
                    style={{ width: 60, height: 60, color: "#e62265" }}
                  />
                </div>
              </div>
            </div>
            <div className="md:col-span-2 lg:col-span-3">
              <div className="bg-white p-4 flex items-center justify-between rounded-sm">
                <div>
                  <div>
                    <Typography
                      className="text-3xl font-bold mb-1"
                      style={{ color: "#229e8f" }}
                    >
                      {users.length}
                    </Typography>
                  </div>
                  <div>
                    <Typography>New Users</Typography>
                  </div>
                </div>
                <div>
                  <PermIdentityOutlinedIcon
                    style={{ width: 60, height: 60, color: "#229e8f" }}
                  />
                </div>
              </div>
            </div>
            <div className="md:col-span-2 lg:col-span-3">
              <div className="bg-white p-4 flex items-center justify-between rounded-sm">
                <div>
                  <div>
                    <Typography
                      className="text-3xl font-bold mb-1"
                      style={{ color: "#ff5720" }}
                    >
                      {activities.length}
                    </Typography>
                  </div>
                  <div>
                    <Typography>New Activities</Typography>
                  </div>
                </div>
                <div>
                  <LocalActivityOutlinedIcon
                    style={{ width: 60, height: 60, color: "#ff5720" }}
                  />
                </div>
              </div>
            </div>
            <div className="md:col-span-2 lg:col-span-3">
              <div className="bg-white p-4 flex items-center justify-between rounded-sm">
                <div>
                  <div>
                    <Typography
                      className="text-3xl font-bold mb-1"
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
                    style={{ width: 60, height: 60, color: "#14b8d2" }}
                  />
                </div>
              </div>
            </div>
            <div className="mt-4 lg:col-span-6">
              <TransactionTab />
            </div>
          </div>
        </>
      ) : (
        <div className="mx-auto">
          <MyLoadingIndicator width={300} height={300} />
        </div>
      )}
    </>
  );
};

export default DashBoard;
