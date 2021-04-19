import { getNotifications } from "api/notification";
import INotification from "interfaces/notifications/notification.interface";
import { useQuery } from "react-query";

export const useNotifications = () => {
  return useQuery<INotification[]>("notifications", async () => {
    const {
      data: { notifications },
    } = await getNotifications();
    return notifications;
  });
};
