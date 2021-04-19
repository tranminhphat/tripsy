import { createNotification, markAllAsRead } from "api/notification";
import INotification from "interfaces/notifications/notification.interface";
import { useMutation, useQueryClient } from "react-query";

export const useCreateNotification = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async (model: INotification) => {
      const {
        data: { notification },
      } = await createNotification(model);
      return notification;
    },
    {
      onSuccess: () => queryClient.invalidateQueries("notifications"),
    }
  );
};

export const useReadAllNotification = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async () => {
      const {
        data: { notification },
      } = await markAllAsRead();
      return notification;
    },
    {
      onSuccess: () => queryClient.invalidateQueries("notifications"),
    }
  );
};
