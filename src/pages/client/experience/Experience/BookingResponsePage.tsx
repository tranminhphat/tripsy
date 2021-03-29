import { retrieveCheckoutSession } from "api/checkout";
import { deleteReceiptById, updateReceiptById } from "api/receipt";
import { getCurrentUser } from "api/users";
import { IUserResponse } from "interfaces/users/user.interface";
import MainLayout from "layouts/MainLayout";
import queryString from "query-string";
import * as React from "react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

interface Props {}

const BookingResponsePage: React.FC<Props> = () => {
  const location = useLocation();
  const values = queryString.parse(location.search);
  const { status, session_id, receipt_id } = values;
  const [user, setUser] = useState<IUserResponse>();
  useEffect(() => {
    if (status === "succeed") {
      retrieveBooking();
    } else {
      deleteReceipt();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const retrieveBooking = async () => {
    const { data } = await retrieveCheckoutSession(session_id as string);
    if (data === "paid") {
      const {
        data: { receipt },
      } = await updateReceiptById(receipt_id as string, {
        status: "paid",
      });
      const {
        data: { user },
      } = await getCurrentUser(["firstName"]);
      if (user) {
        setUser(user);
      }
    }
  };

  const deleteReceipt = async () => {
    const response = await deleteReceiptById(receipt_id as string);
    console.log(response);
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
