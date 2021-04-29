import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
} from "@material-ui/core";
import RateReviewIcon from "@material-ui/icons/RateReview";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import NoDataIcon from "assets/images/icons/no-data.svg";
import ExperienceReviewModal from "components/Modals/ExperienceReviewModal";
import UserReviewModal from "components/Modals/UserReviewModal";
import MyLoadingIndicator from "components/Shared/MyLoadingIndicator";
import toWeekDayString from "helpers/toWeekDayString";
import { useReceipts } from "hooks/queries/receipts";
import { useCurrentUser } from "hooks/queries/users";
import * as React from "react";
import { useState } from "react";

interface Props {}

const ActivityHistoryTab: React.FC<Props> = () => {
  const [openUserReviewModal, setOpenUserReviewModal] = useState(false);
  const [openExperienceReviewModal, setOpenExperienceReviewModal] = useState(
    false
  );
  const { data: currentUser } = useCurrentUser();
  const { data: receipts } = useReceipts({
    guestId: currentUser?._id,
    status: "finished",
  });
  return (
    <div className="mt-4">
      {receipts ? (
        receipts.length !== 0 ? (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Tên trải nghiệm</TableCell>
                  <TableCell align="right">Ngày diễn ra</TableCell>
                  <TableCell align="right">Thời gian</TableCell>
                  <TableCell align="right">Người tổ chức</TableCell>
                  <TableCell align="right">Đánh giá</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {receipts.map((receipt) => (
                  <>
                    <TableRow key={receipt._id}>
                      <TableCell component="th" scope="row">
                        {receipt.experience?.title}
                      </TableCell>
                      <TableCell align="right">
                        {" "}
                        {toWeekDayString(
                          receipt.activity?.date.dateObject.weekDay!
                        )}
                        , ngày {receipt.activity?.date.dateObject.day}/
                        {receipt.activity?.date.dateObject.month}/
                        {receipt.activity?.date.dateObject.year}
                      </TableCell>
                      <TableCell align="right">
                        {receipt.experience?.duration}
                      </TableCell>
                      <TableCell align="right">
                        {receipt.host?.lastName} {receipt.host?.firstName}
                      </TableCell>
                      <TableCell align="right">
                        <div className="flex justify-end">
                          <Tooltip title="Đánh giá người tổ chức">
                            <IconButton
                              onClick={() => setOpenUserReviewModal(true)}
                            >
                              <SupervisorAccountIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Đánh giá trải nghiệm">
                            <IconButton
                              onClick={() => setOpenExperienceReviewModal(true)}
                            >
                              <RateReviewIcon />
                            </IconButton>
                          </Tooltip>
                        </div>
                      </TableCell>
                    </TableRow>
                    <UserReviewModal
                      open={openUserReviewModal}
                      setOpen={setOpenUserReviewModal}
                      objectId={receipt.experience?.hostId!}
                    />

                    <ExperienceReviewModal
                      open={openExperienceReviewModal}
                      setOpen={setOpenExperienceReviewModal}
                      objectId={receipt.experienceId}
                    />
                  </>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <div className="mt-8">
            <div className="flex flex-col items-center justify-center text-center">
              <img src={NoDataIcon} width={150} height={150} alt="no data" />
              <p className="mt-8 text-xl text-gray-500">Không có dữ liệu</p>
            </div>
          </div>
        )
      ) : (
        <div className="flex items-center justify-center">
          <MyLoadingIndicator />
        </div>
      )}
    </div>
  );
};

export default ActivityHistoryTab;
