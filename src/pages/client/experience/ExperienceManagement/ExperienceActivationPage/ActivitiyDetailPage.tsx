import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";
import { getReceipts } from "api/receipt";
import {
  createRefund,
  createTransfer,
  getCheckoutSessionById,
} from "api/stripe";
import MyLoadingIndicator from "components/Shared/MyLoadingIndicator";
import { startTimeOptions } from "constants/index";
import AlertContext from "contexts/AlertContext";
import currencyFormatter from "helpers/currencyFormatter";
import toWeekDayString from "helpers/toWeekDayString";
import { useDeleteActivity } from "hooks/mutations/activities";
import { useDeleteReceipt } from "hooks/mutations/receipts";
import { useActivities } from "hooks/queries/activities";
import IActivity from "interfaces/activity/activity.interface";
import MainLayout from "layouts/MainLayout";
import * as React from "react";
import { useContext } from "react";
import { DateObject } from "react-multi-date-picker";
import { useHistory, useParams } from "react-router-dom";

interface Props {}

const ActivityDetailPage: React.FC<Props> = () => {
  const { activityId } = useParams<{ activityId: string }>();
  const history = useHistory();
  const { data: activity } = useActivities({ _id: activityId });
  const deleteActivity = useDeleteActivity();
  const deleteReceipt = useDeleteReceipt();
  const { alert } = useContext(AlertContext);

  const handleCancelActivity = async (activity: IActivity) => {
    if (activity.listOfGuestId.length === 0) {
      deleteActivity.mutate({ activityId: activity._id });
    } else {
      for (let i = 0; i < activity.listOfGuestId.length; i++) {
        const { data: receipt } = await getReceipts({
          activityId: activity._id,
          guestId: activity.listOfGuestId[i],
        });

        const {
          data: { session },
        } = await getCheckoutSessionById(receipt[0].checkOutSessionId);
        if (session.payment_intent) {
          await createRefund(session.payment_intent);
          deleteReceipt.mutate({ receiptId: receipt[0]._id });
          deleteActivity.mutate({ activityId: activity._id });
        }
      }
    }

    alert("success", "Xóa hoạt động thành công");
    history.goBack();
  };

  const handleCompleteActivity = async (activityId: string) => {
    await createTransfer(activityId);
    deleteActivity.mutate({ activityId });
  };

  const canActivityCancel = (unixTime: number, listOfGuest: string[]) => {
    const today = new DateObject();
    return unixTime - today.unix < 86400 * 14 || listOfGuest.length === 0;
  };

  const isActivityEnd = (unixTime: number) => {
    const today = new DateObject();
    return today.unix > unixTime;
  };

  return (
    <MainLayout withSearchBar={false}>
      <div className="container mx-auto my-4">
        {activity ? (
          <>
            <div className="flex items-center justify-between">
              <Typography className="text-3xl text-secondary font-bold">
                Chi tiết hoạt động
              </Typography>
              {!(
                isActivityEnd(activity[0]?.date.dateObject.unix) &&
                activity[0]?.listOfGuestId.length !== 0
              ) ? (
                <div
                  className={`${
                    !canActivityCancel(
                      activity[0]?.date.dateObject.unix,
                      activity[0]?.listOfGuestId
                    )
                      ? "cursor-not-allowed"
                      : ""
                  }`}
                >
                  <Button
                    onClick={() => handleCancelActivity(activity[0])}
                    variant="outlined"
                    className={`${
                      !canActivityCancel(
                        activity[0]?.date.dateObject.unix,
                        activity[0]?.listOfGuestId
                      )
                        ? "text-white pointer-events-none bg-gray-400"
                        : "border border-danger text-danger font-semibold outline-none hover:bg-danger hover:text-white"
                    }`}
                  >
                    Hủy hoạt động này
                  </Button>
                </div>
              ) : (
                <Button
                  onClick={() =>
                    handleCompleteActivity(activity[0]._id as string)
                  }
                  variant="outlined"
                  className="border border-primary text-primary font-semibold outline-none hover:bg-primary hover:text-white"
                >
                  Hoàn thành
                </Button>
              )}
            </div>
            <div className="mt-4">
              <div className="grid grid-col-1 lg:grid-cols-2 lg:gap-16">
                <div className="lg:col-span-1">
                  <Typography className="text-xl font-semibold text-gray-500">
                    Trải nghiệm
                  </Typography>
                  <hr className="my-2" />
                  <div className="flex items-center justify-between">
                    <Typography className="font-semibold">Tên:</Typography>
                    <Typography>{activity[0]?.experience?.title}</Typography>
                  </div>
                  <div className="flex items-center justify-between">
                    <Typography className="font-semibold">Chủ đề:</Typography>
                    <Typography>{activity[0]?.experience?.theme}</Typography>
                  </div>
                  <div className="flex items-center justify-between">
                    <Typography className="font-semibold">Địa điểm:</Typography>
                    <Typography>
                      {activity[0]?.experience?.address?.street},
                      {activity[0]?.experience?.address?.ward},
                      {activity[0]?.experience?.address?.district},
                      {activity[0]?.experience?.address?.city}
                    </Typography>
                  </div>
                  <div className="flex items-center justify-between">
                    <Typography className="font-semibold">
                      Số lượng khách:
                    </Typography>
                    <Typography>
                      {activity[0]?.experience?.groupSize} người
                    </Typography>
                  </div>
                  <div className="flex items-center justify-between">
                    <Typography className="font-semibold">Giá:</Typography>
                    <Typography>
                      {currencyFormatter(
                        activity[0]?.experience?.pricing
                          ?.individualPrice as number
                      )}{" "}
                      / 1 người
                    </Typography>
                  </div>
                </div>
                <div className="lg:col-span-1">
                  <Typography className="text-xl font-semibold text-gray-500">
                    Thời điểm
                  </Typography>
                  <hr className="my-2" />
                  <div className="flex items-center justify-between">
                    <Typography className="font-semibold">
                      Ngày diễn ra:
                    </Typography>
                    <Typography>
                      {" "}
                      {toWeekDayString(activity[0]?.date.dateObject.weekDay)},
                      ngày {activity[0]?.date.dateObject.day}/
                      {activity[0]?.date.dateObject.month}/
                      {activity[0]?.date.dateObject.year}
                    </Typography>
                  </div>
                  <div className="flex items-center justify-between">
                    <Typography className="font-semibold">
                      Thời lượng:
                    </Typography>
                    <Typography>
                      {activity[0].experience?.duration} tiếng
                    </Typography>
                  </div>
                  <div className="flex items-center justify-between">
                    <Typography className="font-semibold">
                      Giờ bắt đầu:
                    </Typography>
                    <Typography>
                      {
                        startTimeOptions[activity[0]?.date.startTimeIdx - 1]
                          .text
                      }
                    </Typography>
                  </div>
                  <div className="flex items-center justify-between">
                    <Typography className="font-semibold">
                      Giờ kết thúc:
                    </Typography>
                    <Typography>
                      {startTimeOptions[activity[0]?.date.endTimeIdx - 1].text}
                    </Typography>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <Typography className="text-xl font-semibold text-gray-500">
                  Khách tham gia
                </Typography>
                <hr className="my-2" />
                {activity[0].guestsInfo.length !== 0 ? (
                  <TableContainer component={Paper}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Họ và Tên</TableCell>
                          <TableCell align="right">Tuổi</TableCell>
                          <TableCell align="right">Giới tính</TableCell>
                          <TableCell align="right">Địa chỉ email</TableCell>
                          <TableCell align="right">Số điện thoại</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {activity[0].guestsInfo.map((info) => (
                          <TableRow key={info._id}>
                            <TableCell component="th" scope="row">
                              {info.lastName} {info.firstName}
                            </TableCell>
                            <TableCell align="right">
                              {new Date().getFullYear() -
                                Number(info.dateOfBirth?.substr(0, 4))}
                            </TableCell>
                            <TableCell align="right">
                              {info.gender === "male" ? "Nam" : "Nữ"}
                            </TableCell>
                            <TableCell align="right">{info.email}</TableCell>
                            <TableCell align="right">
                              {info.phoneNumber}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                ) : (
                  <div className="text-center mt-4">
                    <Typography>Hoạt động chưa có khách tham gia</Typography>
                  </div>
                )}
              </div>
            </div>
          </>
        ) : (
          <MyLoadingIndicator />
        )}
      </div>
    </MainLayout>
  );
};

export default ActivityDetailPage;
