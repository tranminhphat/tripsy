import { Avatar, Button, Typography } from "@material-ui/core";
import InfoIcon from "@material-ui/icons/Info";
import { getExperienceById } from "api/experiences";
import { createRefund, getCheckoutSessionById } from "api/stripe";
import ClockIcon from "assets/images/icons/clock.svg";
import DestinationIcon from "assets/images/icons/destination.svg";
import HostIcon from "assets/images/icons/host.svg";
import NoDataIcon from "assets/images/icons/no-data.svg";
import SkeletonUserAvatar from "assets/images/icons/user.svg";
import CheckpointModal from "components/Modals/CheckpointModal";
import MyLoadingIndicator from "components/Shared/MyLoadingIndicator";
import MyModal from "components/Shared/MyModal";
import { themes } from "constants/index";
import { createCancelBookingNotificationModel } from "helpers/createNotificationModel";
import currencyFormatter from "helpers/currencyFormatter";
import { useUpdateGuestList } from "hooks/mutations/activities";
import { useCreateNotification } from "hooks/mutations/notifications";
import { useUpdateCheckpoint } from "hooks/mutations/profiles";
import { useDeleteReceipt, useUpdateReceipt } from "hooks/mutations/receipts";
import { useReceipts } from "hooks/queries/receipts";
import { useCurrentUser } from "hooks/queries/users";
import IReceipt from "interfaces/receipts/receipt.interface";
import MainLayout from "layouts/MainLayout";
import * as React from "react";
import { useState } from "react";
import { DateObject } from "react-multi-date-picker";
import GenericButton from "./GenericButton";

interface Props {}

const ActivityListTab: React.FC<Props> = () => {
	const [receiptId, setReceiptId] = useState("");
	const [openConfirmDeleteModal, setOpenConfirmDeleteModal] = useState(false);
	const [openCheckpointModal, setOpenCheckpointModal] = useState(false);
	const [isCancelling, setIsCancelling] = useState(false);
	const [checkpointData, setCheckpointData] = useState<any>(null);
	const { data: currentUser } = useCurrentUser();
	const { data: receipts } = useReceipts({
		guestId: currentUser?._id,
		status: "paid",
	});
	const updateCheckpoint = useUpdateCheckpoint();
	const updateReceipt = useUpdateReceipt();
	const deleteReceipt = useDeleteReceipt();
	const updateGuestList = useUpdateGuestList();
	const createNotification = useCreateNotification();

	const handleCancelExperience = async (
		checkOutSessionId: string,
		receipt: IReceipt
	) => {
		setIsCancelling(true);
		const {
			data: { session },
		} = await getCheckoutSessionById(checkOutSessionId);
		if (session.payment_intent) {
			await createRefund(session.payment_intent);
			deleteReceipt.mutate({ receiptId: receipt._id as string });
			updateGuestList.mutate({ activityId: receipt.activity?._id as string });
			const notificationModel = await createCancelBookingNotificationModel(
				receipt.activityId as string
			);
			createNotification.mutate(notificationModel, {
				onSuccess: () => {
					setIsCancelling(false);
					setOpenConfirmDeleteModal(false);
				},
			});
		}
	};

	const handleCompleteExperience = async (experienceId: string) => {
		const {
			data: { experience },
		} = await getExperienceById(experienceId);
		const [{ id: themeId }] = themes.filter(
			(item) => item.name === experience.theme
		);
		updateCheckpoint.mutate(
			{ themeId },
			{
				onSuccess: (data) => {
					setCheckpointData(data);
				},
			}
		);
	};

	const canActivityCancel = (unixTime: number) => {
		const today = new DateObject();
		return unixTime - today.unix > 86400 * 14;
	};

	const isActivityFinish = (unixTime: number) => {
		const today = new DateObject();
		return today.unix > unixTime;
	};

	return (
		<MainLayout>
			<div className="my-8 max-w-6xl mx-auto">
				<Typography className="text-3xl text-secondary font-bold">
					Hoạt động bạn tham gia
				</Typography>
				{receipts ? (
					<div className="flex mt-4">
						<div className="w-full max-w-2xl">
							{receipts.length !== 0 ? (
								receipts.map((item) => (
									<>
										<div className="mt-8" key={item._id}>
											<div className="flex justify-between border border-gray-300 rounded-lg ">
												<div className="mt-2 p-4 flex-grow">
													<div className="flex items-center justify-between">
														<h1 className="text-2xl font-bold">
															{item.experience?.title}
														</h1>
														<Typography className="underline">
															{currencyFormatter(
																item.experience?.pricing?.individualPrice!
															)}
														</Typography>
													</div>
													<div className="flex items-center mt-4">
														<img
															src={HostIcon}
															alt="host"
															width={32}
															height={32}
														/>
														<div className="ml-6 flex items-center">
															<Avatar
																src={
																	item.host?.avatarUrl
																		? item.host?.avatarUrl
																		: SkeletonUserAvatar
																}
																style={{ width: "32px", height: "32px" }}
																alt="User"
															/>
															<Typography className="ml-2 text-lg">
																{item.host?.lastName} {item.host?.firstName}
															</Typography>
														</div>
													</div>
													<div className="flex items-center mt-2">
														<img
															src={DestinationIcon}
															alt="destination"
															width={32}
															height={32}
														/>
														<Typography className="ml-6 text-lg">
															{item.experience?.address?.district},{" "}
															{item.experience?.address?.city}
														</Typography>
													</div>
													<div className="flex items-center mt-2">
														<img
															src={ClockIcon}
															alt="date"
															width={32}
															height={32}
														/>
														<Typography className="ml-6 text-lg">
															{item.activity?.date.dateObject.day}/
															{item.activity?.date.dateObject.month}/
															{item.activity?.date.dateObject.year}
														</Typography>
													</div>
													<div className="flex items-center justify-between mt-4">
														<GenericButton
															title="Hủy bỏ hoạt động này"
															tooltip="Hủy và nhận hoàn tiền"
															onClick={() => {
																setOpenConfirmDeleteModal(true);
															}}
															isAllowed={canActivityCancel(
																item.activity?.date.dateObject.unix!
															)}
														/>
														<GenericButton
															title="Nhận điểm tích lũy"
															tooltip="Hoàn thành và nhận điểm tích lũy"
															onClick={() => {
																handleCompleteExperience(item.experienceId);
																setReceiptId(item._id as string);
																setOpenCheckpointModal(true);
															}}
															isAllowed={isActivityFinish(
																item.activity?.date.dateObject.unix!
															)}
														/>
													</div>
												</div>
												<img
													className="rounded-lg"
													width={180}
													src={item.experience?.photoGallery![0].url}
													alt="experience"
												/>
											</div>

											<MyModal
												size="xl"
												open={openConfirmDeleteModal}
												setOpen={setOpenConfirmDeleteModal}
											>
												{{
													header: (
														<p className="text-semibold text-xl">
															Bạn có chắc chắc muốn xóa hoạt động này?
														</p>
													),
													footer: (
														<div className="flex justify-end">
															<button
																onClick={() => setOpenConfirmDeleteModal(false)}
															>
																<p className="text-lg underline">Hủy</p>
															</button>
															<div className="h-12 w-16 mr-8">
																<Button
																	variant="contained"
																	className="w-full h-full overflow-hidden bg-danger mx-8 text-white"
																	onClick={() =>
																		handleCancelExperience(
																			item.checkOutSessionId as string,
																			item
																		)
																	}
																>
																	{!isCancelling ? (
																		<p>Xóa</p>
																	) : (
																		<MyLoadingIndicator />
																	)}
																</Button>
															</div>
														</div>
													),
												}}
											</MyModal>
											{checkpointData ? (
												<CheckpointModal
													isOpen={openCheckpointModal}
													onClose={() => {
														updateReceipt.mutate({
															receiptId,
															values: { status: "finished" },
														});
														setCheckpointData(null);
														setReceiptId("");
													}}
													checkpointData={checkpointData}
												/>
											) : null}
										</div>
									</>
								))
							) : (
								<div className="mt-8">
									<div className="flex flex-col items-center justify-center text-center">
										<img
											src={NoDataIcon}
											width={200}
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
						<div className="mt-8 ml-auto max-w-xs">
							<div className="border border-black rounded-lg py-8 px-8 text-center">
								<InfoIcon style={{ width: "50px", height: "50px" }} />
								<p className="mt-8">
									Bạn chỉ có thể hủy tham gia hoạt động trước thời điểm hoạt
									động diễn ra 2 tuần.
								</p>
								<p className="mt-8">
									Nhận điểm tích lũy sau mỗi trải nghiệm để đạt được danh hiệu.
								</p>
							</div>
						</div>
					</div>
				) : (
					<div className="flex-grow justify-center items-center">
						<MyLoadingIndicator width={300} height={300} />
					</div>
				)}
			</div>
		</MainLayout>
	);
};

export default ActivityListTab;
