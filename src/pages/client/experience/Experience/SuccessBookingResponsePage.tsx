import { retrieveBookingSession } from "api/payment";
import { updateReceiptById } from "api/receipt";
import { getCurrentUser } from "api/users";
import { IUserResponse } from "interfaces/users/user.interface";
import MainLayout from "layouts/MainLayout";
import queryString from "query-string";
import * as React from "react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

interface Props {}

const SuccessBookingResponsePage: React.FC<Props> = () => {
  const location = useLocation();
  const values = queryString.parse(location.search);
  const { session_id, receipt_id } = values;
  const [user, setUser] = useState<IUserResponse>();

  useEffect(() => {
    retrieveBooking();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const retrieveBooking = async () => {
    const { data } = await retrieveBookingSession(session_id as string);
    if (data === "paid") {
      const {
        data: { receipt },
      } = await updateReceiptById(receipt_id as string, {
        status: "paid",
      });
      console.log(receipt);
      const {
        data: { user },
      } = await getCurrentUser(["firstName"]);
      if (user) {
        setUser(user);
      }
    }
  };
  return (
    <MainLayout>
      {user ? (
        <div>
          <p className="text-lg">
            Cảm ơn {user.firstName}, trải nghiệm của bạn đã được đăng ký thành
            công.
          </p>
          <p className="text-lg">Mã biên lai của bạn là: {receipt_id}</p>
        </div>
      ) : null}
    </MainLayout>
  );
};

export default SuccessBookingResponsePage;
