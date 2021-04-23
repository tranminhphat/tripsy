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
    message: `${user.lastName} ${user.firstName} đã đặt trước trải nghiệm ${activity.experience.title} vào ngày ${activity.date.dateObject.day}/${activity.date.dateObject.month}/${activity.date.dateObject.year} của bạn`,
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
    message: `${user.lastName} ${user.firstName} đã hủy trải nghiệm ${activity.experience.title} vào ngày ${activity.date.dateObject.day}/${activity.date.dateObject.month}/${activity.date.dateObject.year} của bạn`,
    link: `/user/experience-hosting/${activity.experience._id}/activation/${activity._id}`,
  };
};
