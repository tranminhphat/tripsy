import { createBookingSuccessNotificationModel } from "helpers/createNotificationModel";
import { useUpdateGuestList } from "hooks/mutations/activities";
import { useCreateNotification } from "hooks/mutations/notifications";
import { useDeleteReceipt, useUpdateReceipt } from "hooks/mutations/receipts";
import { useCurrentUser } from "hooks/queries/users";
import MainLayout from "layouts/MainLayout";
import queryString from "query-string";
import * as React from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

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
          <div>
            <p className="text-lg">
              Cảm ơn {user.firstName}, trải nghiệm của bạn đã được đăng ký thành
              công.
            </p>
          </div>
        ) : null
      ) : (
        <div>
          <p className="text-lg">Trải nghiệm đăng ký ko thành công.</p>
        </div>
      )}
    </MainLayout>
  );
};

export default BookingResponsePage;
