import { updateListOfGuest } from "api/activity";
import { updateCheckoutSession } from "api/stripe";
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
  const { status, session_id, receipt_id, activity_id } = values;
  const { data: user } = useCurrentUser();

  useEffect(() => {
    updateBooking();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateBooking = async () => {
    await updateCheckoutSession(
      status as string,
      session_id as string,
      activity_id as string,
      receipt_id as string
    );
    await updateListOfGuest(activity_id as string);
  };

  return (
    <MainLayout>
      {status === "succeed" ? (
        user ? (
          <div>
            <p className="text-lg">
              Cảm ơn {user.firstName}, trải nghiệm của bạn đã được đăng ký thành
              công.
            </p>
            <p className="text-lg">Mã biên lai của bạn là: {receipt_id}</p>
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
