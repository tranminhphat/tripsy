import { getActivityById } from "api/activity";
import { getCurrentUser } from "api/users";

export const createBookingSuccessNotificationModel = async (
	activityId: string
) => {
	const {
		data: { user },
	} = await getCurrentUser();
	const {
		data: { activity },
	} = await getActivityById(activityId);

	return {
		receiverId: activity.experience.hostId,
		message: `<b>${user.lastName} ${user.firstName}</b> đã đặt trước trải nghiệm <b>${activity.experience.title}</b> vào ngày <b>${activity.date.dateObject.day}/${activity.date.dateObject.month}/${activity.date.dateObject.year}</b> của bạn`,
		link: `/user/experience-hosting/${activity.experience._id}/activation/${activity._id}`,
	};
};

export const createCancelBookingNotificationModel = async (
	activityId: string
) => {
	const {
		data: { user },
	} = await getCurrentUser();
	const {
		data: { activity },
	} = await getActivityById(activityId);

	return {
		receiverId: activity.experience.hostId,
		message: `<b>${user.lastName} ${user.firstName}</b> đã hủy trải nghiệm <b>${activity.experience.title}</b> vào ngày <b>${activity.date.dateObject.day}/${activity.date.dateObject.month}/${activity.date.dateObject.year}</b> của bạn`,
		link: `/user/experience-hosting/${activity.experience._id}/activation/${activity._id}`,
	};
};
