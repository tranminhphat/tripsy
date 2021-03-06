import { Button } from "@material-ui/core";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { loadStripe } from "@stripe/stripe-js";
import { createReceipt } from "api/receipt";
import { createCheckoutSession } from "api/stripe";
import MyLoadingIndicator from "components/Shared/MyLoadingIndicator";
import { startTimeOptions } from "constants/index";
import currencyFormatter from "helpers/currencyFormatter";
import toWeekDayString from "helpers/toWeekDayString";
import { useActivity } from "hooks/queries/activities";
import { useExperience } from "hooks/queries/experiences";
import { useCurrentUser, useUser } from "hooks/queries/users";
import MainLayout from "layouts/MainLayout";
import queryString from "query-string";
import * as React from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";

interface Props {}

const stripePromise = loadStripe(
	"pk_test_51IXjZvDcrQRGXIG6oVlm1uSOLxiyQnMTeGoCgnoYV3dcMAISpT1WpHia1PmB85B7oyIF26CQCkt3IbcQKcXvSs6C00Z348v2eg"
);

const ConfirmBookingPage: React.FC<Props> = () => {
	const history = useHistory();
	const location = useLocation();
	const { id } = useParams<{ id: string }>();
	const { activityId } = queryString.parse(location.search);
	const { data: experience } = useExperience(id);
	const { data: activity } = useActivity(activityId as string);
	const { data: host } = useUser(experience?.hostId!);
	const { data: currentUser } = useCurrentUser();

	const handleClick = async () => {
		const stripe = await stripePromise;
		if (experience && currentUser && activity) {
			const { data: receiptId } = await createReceipt({
				hostId: experience.hostId,
				experienceId: experience._id,
				activityId: activity._id,
				guestId: currentUser._id,
				takePlace: activity.date,
				unitPrice: experience.pricing?.individualPrice,
				numberOfGuest: 1,
				totalPrice: (experience.pricing?.individualPrice as number) * 1,
			});
			if (receiptId) {
				const {
					data: { id: sessionId },
				} = await createCheckoutSession({
					activity: {
						id: activityId,
					},
					receipt: {
						id: receiptId,
					},
					experience: {
						id: experience._id,
						name: experience.title,
						description: experience.description,
						price: experience.pricing?.individualPrice,
						image: experience.photoGallery,
					},
					customer: {
						customerId: currentUser._id,
						customerEmail: currentUser.email,
					},
				});
				if (stripe && sessionId) {
					await stripe.redirectToCheckout({
						sessionId: sessionId,
					});
				}
			}
		}
	};

	return (
		<MainLayout>
			{experience && host && activity ? (
				<div className="container mx-auto px-40">
					<div className="flex items-center">
						<button
							className="outline-none mr-8"
							onClick={() => history.goBack()}
						>
							<ArrowBackIosIcon />
						</button>
						<h1 className="text-4xl font-bold">Xác nhận thanh toán</h1>
					</div>
					<div className="mt-8 max-w-4xl">
						<div className="flex justify-between">
							<p className="text-xl font-bold">Tên hoạt động:</p>
							<p className="text-xl ">{experience.title}</p>
						</div>
						<div className="flex justify-between">
							<p className="text-xl font-bold">Tên người hướng dẫn:</p>
							<p className="text-xl">
								{host.lastName} {host.firstName}
							</p>
						</div>
						<div className="flex justify-between">
							<p className="text-xl font-bold">Ngày diễn ra:</p>
							<p className="text-xl">
								{toWeekDayString(activity.date.dateObject.weekDay)}, ngày{" "}
								{activity.date.dateObject.day} tháng{" "}
								{activity.date.dateObject.month} năm{" "}
								{activity.date.dateObject.year}
							</p>
						</div>
						<div className="flex justify-between">
							<p className="text-xl font-bold">Giờ bắt đầu:</p>
							<p className="text-xl">
								{startTimeOptions[activity.date.startTimeIdx].text}
							</p>
						</div>
						<div className="flex justify-between">
							<p className="text-xl font-bold">Giờ kết thúc:</p>
							<p className="text-xl">
								{activity.date.endTimeIdx >= 45
									? startTimeOptions[activity.date.endTimeIdx + 4 - 48].text
									: startTimeOptions[activity.date.endTimeIdx].text}
							</p>
						</div>
						<div className="flex justify-between">
							<p className="text-xl font-bold">Địa điểm:</p>
							<p className="text-xl">
								{experience.address?.street}, {experience.address?.ward},{" "}
								{experience.address?.district}, {experience.address?.city}
							</p>
						</div>
						<div className="flex justify-between">
							<p className="text-xl font-bold">Số lượng:</p>
							<p className="text-xl">1 người</p>
						</div>
						<div className="flex justify-between">
							<p className="text-xl font-bold">Chi phí:</p>
							<p className="text-xl">
								{currencyFormatter(
									experience.pricing?.individualPrice as number
								)}{" "}
								x 1
							</p>
						</div>
						<div className="my-4">
							<hr />
						</div>
						<div className="flex justify-between">
							<p className="text-xl font-bold">Tổng tiền thanh toán:</p>
							<p className="text-xl">
								{currencyFormatter(
									experience.pricing?.individualPrice as number
								)}{" "}
							</p>
						</div>
						<div className="flex flex-row-reverse mt-4">
							<Button
								variant="contained"
								className="bg-primary text-white self-end"
								onClick={handleClick}
							>
								Thanh toán
							</Button>
						</div>
					</div>
				</div>
			) : (
				<div className="flex-grow justify-center items-center">
					<MyLoadingIndicator width={300} height={300} />
				</div>
			)}
		</MainLayout>
	);
};

export default ConfirmBookingPage;
