import BookingFailIcon from "assets/images/icons/booking-fail.svg";
import CongratulationIcon from "assets/images/icons/congratulation.svg";
import { createBookingSuccessNotificationModel } from "helpers/createNotificationModel";
import { useUpdateGuestList } from "hooks/mutations/activities";
import { useCreateNotification } from "hooks/mutations/notifications";
import { useDeleteReceipt, useUpdateReceipt } from "hooks/mutations/receipts";
import { useCurrentUser } from "hooks/queries/users";
import MainLayout from "layouts/MainLayout";
import queryString from "query-string";
import * as React from "react";
import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

interface Props {}

const BookingResponsePage: React.FC<Props> = () => {
	const location = useLocation();
	const values = queryString.parse(location.search);
	const { status, sessionId, receiptId, activityId } = values;
	const { data: user } = useCurrentUser();
	const updateGuestList = useUpdateGuestList();
	const updateReceipt = useUpdateReceipt();
	const deleteReceipt = useDeleteReceipt();
	const createNotification = useCreateNotification();

	const handleBookingResponse = async () => {
		if (status === "succeed") {
			updateReceipt.mutate({
				receiptId: receiptId as string,
				values: { status: "paid", checkOutSessionId: sessionId },
			});
			updateGuestList.mutate({ activityId: activityId as string });
			const notificationModel = await createBookingSuccessNotificationModel(
				activityId as string
			);
			createNotification.mutate(notificationModel);
		} else {
			deleteReceipt.mutate({ receiptId: receiptId as string });
			updateGuestList.mutate({ activityId: activityId as string });
		}
	};

	useEffect(() => {
		handleBookingResponse();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<MainLayout>
			{status === "succeed" ? (
				user ? (
					<div className="flex flex-col items-center justify-center">
						<div className="mt-4">
							<img
								width={350}
								height={350}
								src={CongratulationIcon}
								alt="congrat"
							/>
						</div>
						<p className="text-2xl font-semibold mt-8">
							Cảm ơn {user.firstName}, trải nghiệm của bạn đã được đăng ký thành
							công.
						</p>
						<Link to="/user/activities">
							<p className="text-lg underline mt-4">
								Click vào đây để đi đến trang quản lý hoạt động của bạn
							</p>
						</Link>
					</div>
				) : null
			) : (
				<div className="flex flex-col items-center justify-center">
					<div className="mt-4">
						<img width={350} height={350} src={BookingFailIcon} alt="fail" />
					</div>
					<p className="text-2xl font-semibold mt-8">
						Rất tiếc, trải nghiệm đăng ký không thành công
					</p>
					<Link to="/">
						<p className="text-lg underline mt-4">
							Click vào đây để trở về trang chủ
						</p>
					</Link>
				</div>
			)}
		</MainLayout>
	);
};

export default BookingResponsePage;
