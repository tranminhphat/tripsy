import {
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
} from "@material-ui/core";
import NoDataIcon from "assets/images/icons/no-data.svg";
import MyLoadingIndicator from "components/Shared/MyLoadingIndicator";
import currencyFormatter from "helpers/currencyFormatter";
import toWeekDayString from "helpers/toWeekDayString";
import { useActivities } from "hooks/queries/activities";
import { useCurrentUser } from "hooks/queries/users";
import * as React from "react";

interface Props {}

const HostingHistoryTab: React.FC<Props> = () => {
	const { data: currentUser } = useCurrentUser();
	const { data: activities } = useActivities({
		"experience.hostId": currentUser?._id,
		status: 1,
	});
	return (
		<div className="mt-4">
			{activities ? (
				activities.length !== 0 ? (
					<TableContainer component={Paper}>
						<Table>
							<TableHead>
								<TableRow>
									<TableCell>Tên trải nghiệm</TableCell>
									<TableCell align="right">Ngày diễn ra</TableCell>
									<TableCell align="right">Thời gian</TableCell>
									<TableCell align="right">Số lượng khách</TableCell>
									<TableCell align="right">Thu nhập</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{activities.map((activity) => (
									<TableRow key={activity._id}>
										<TableCell component="th" scope="row">
											{activity.experience?.title}
										</TableCell>
										<TableCell align="right">
											{" "}
											{toWeekDayString(activity.date.dateObject.weekDay!)}, ngày{" "}
											{activity.date.dateObject.day}/
											{activity.date.dateObject.month}/
											{activity.date.dateObject.year}
										</TableCell>
										<TableCell align="right">
											{activity.experience?.duration}
										</TableCell>
										<TableCell align="right">
											{activity.listOfGuestId.length}
										</TableCell>
										<TableCell align="right">
											{currencyFormatter(
												activity.listOfGuestId.length *
													activity.experience?.pricing?.estimatedEarning!
											)}
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</TableContainer>
				) : (
					<div className="mt-8">
						<div className="flex flex-col items-center justify-center text-center">
							<img src={NoDataIcon} width={200} height={150} alt="No data" />
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

export default HostingHistoryTab;
