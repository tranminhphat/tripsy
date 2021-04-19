import INotification from "interfaces/notifications/notification.interface";
import axios from "./configureAxios";

export const createNotification = (model: INotification) => {
  return axios.post("/notifications", { model });
};

export const getNotifications = () => {
  return axios.get("/notifications");
};
