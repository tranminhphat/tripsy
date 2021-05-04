import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";
import AssignmentTwoToneIcon from "@material-ui/icons/AssignmentTwoTone";
import MonetizationOnTwoToneIcon from "@material-ui/icons/MonetizationOnTwoTone";
import WorkTwoToneIcon from "@material-ui/icons/WorkTwoTone";
import NoDataIcon from "assets/images/icons/no-data.svg";
import MyLoadingIndicator from "components/Shared/MyLoadingIndicator";
import toWeekDayString from "helpers/toWeekDayString";
import { useActivities } from "hooks/queries/activities";
import { useExperiences } from "hooks/queries/experiences";
import { useBalance } from "hooks/queries/stripes";
import { useCurrentUser } from "hooks/queries/users";
import MainLayout from "layouts/MainLayout";
import * as React from "react";
import { Link } from "react-router-dom";

interface Props {}

const DashboardPage: React.FC<Props> = () => {
  const { data: user } = useCurrentUser();
  const { data: experiences } = useExperiences({ hostId: user?._id });
  const { data: activities } = useActivities(
    {
      "experience.hostId": user?._id,
      status: "0",
    },
    "+date.dateObject.unix"
  );
  const { data: balance } = useBalance(user?.payoutAccountId!);
  return (
    <MainLayout>
      {user && experiences && activities && balance ? (
        <div className="my-8 max-w-6xl mx-auto">
          <Typography className="text-3xl text-secondary font-bold">
            Bảng điều khiển
          </Typography>
          <div className="grid lg:grid-cols-12 lg:gap-4 mt-4">
            <div className="mt-4 lg:col-span-4 lg:mt-0">
              <Link to="/user/experience-hosting">
                <div className="shadow-lg p-4 border border-gray-200 rounded-sm">
                  <div className="flex justify-between">
                    <div className="flex flex-col">
                      <Typography className="self-center text-4xl font-semibold text-secondary">
                        {experiences.length}
                      </Typography>
                      <Typography className="text-2xl text-gray-500">
                        Trải nghiệm
                      </Typography>
                    </div>
                    <WorkTwoToneIcon
                      style={{ width: 80, height: 80 }}
                      className="text-secondary"
                    />
                  </div>
                </div>
              </Link>
            </div>
            <div className="mt-4 lg:col-span-4 lg:mt-0">
              <div className="shadow-lg p-4 border border-gray-200 rounded-sm">
                <div className="flex justify-between">
                  <div className="flex flex-col">
                    <Typography className="self-center text-4xl font-semibold text-secondary">
                      {activities.length}
                    </Typography>
                    <Typography className="text-2xl text-gray-500">
                      Hoạt động
                    </Typography>
                  </div>
                  <AssignmentTwoToneIcon
                    style={{ width: 80, height: 80 }}
                    className="text-secondary"
                  />
                </div>
              </div>
            </div>
            <div className="mt-4 lg:col-span-4 lg:mt-0">
              <div className="shadow-lg p-4 border border-gray-200 rounded-sm">
                <div className="flex justify-between">
                  <div className="flex flex-col">
                    <Typography className="self-center text-4xl font-semibold text-secondary">
                      {new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                      }).format((balance.available[0].amount as number) / 100)}
                    </Typography>
                    <Typography className="text-2xl text-gray-500">
                      Thu nhập
                    </Typography>
                  </div>
                  <MonetizationOnTwoToneIcon
                    style={{ width: 80, height: 80 }}
                    className="text-secondary"
                  />
                </div>
              </div>
            </div>
            <div className="mt-4 lg:col-span-8 lg:mt-0">
              <div className="shadow-lg p-4 border border-gray-200 rounded-sm">
                <div className="mb-4">
                  <Typography className="text-2xl text-gray-500">
                    Hoạt động gần đây
                  </Typography>
                </div>
                {activities.length !== 0 ? (
                  <TableContainer component={Paper}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Trải nghiệm</TableCell>
                          <TableCell align="right">Ngày diễn ra</TableCell>
                          <TableCell align="right">
                            Số lượng khách tham gia
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {activities.slice(0, 5).map((activity) => (
                          <TableRow key={activity._id}>
                            <TableCell component="th" scope="row">
                              {activity.experience?.title}
                            </TableCell>
                            <TableCell align="right">
                              {activity.date.dateObject.day}/
                              {activity.date.dateObject.month}/
                              {activity.date.dateObject.year}
                            </TableCell>
                            <TableCell align="right">
                              {activity.listOfGuestId.length}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                ) : (
                  <div className="mt-4">
                    <div className="flex flex-col items-center justify-center text-center">
                      <img
                        src={NoDataIcon}
                        width={150}
                        height={150}
                        alt="no data"
                      />
                      <p className="mt-8 text-xl text-gray-500">
                        Không có dữ liệu
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="mt-4 lg:col-span-4 lg:mt-0">
              <div className="shadow-lg p-4 border border-gray-200 rounded-sm">
                <div className="mb-4">
                  <Typography className="text-2xl text-gray-500">
                    Hoạt động sắp diễn ra
                  </Typography>
                </div>
                <div className="flex items-center justify-between">
                  {activities[0] ? (
                    <>
                      <div>
                        <img
                          className="rounded-md"
                          height={180}
                          width={150}
                          src={activities[0].experience?.photoGallery![0].url}
                          alt="upcoming experience"
                        />
                      </div>
                      <div className="flex flex-col justify-between text-center">
                        <Typography className="font-semibold text-2xl">
                          {activities[0].experience?.title}
                        </Typography>
                        <Typography className="text-lg text-gray-500">
                          {toWeekDayString(
                            activities[0].date.dateObject.weekDay
                          )}
                          , {activities[0].date.dateObject.day}/
                          {activities[0].date.dateObject.month}/
                          {activities[0].date.dateObject.year}
                        </Typography>
                        <Link
                          to={`/user/experience-hosting/${activities[0].experienceId}/activation/${activities[0]._id}`}
                        >
                          <Typography className="underline mt-4">
                            Đi đến hoạt động
                          </Typography>
                        </Link>
                      </div>
                    </>
                  ) : (
                    <div className="mx-auto">
                      <div className="flex flex-col items-center justify-center text-center">
                        <img
                          src={NoDataIcon}
                          width={150}
                          height={150}
                          alt="no data"
                        />
                        <p className="mt-8 text-xl text-gray-500">
                          Không có dữ liệu
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <MyLoadingIndicator width={200} height={200} />
      )}
    </MainLayout>
  );
};

export default DashboardPage;
