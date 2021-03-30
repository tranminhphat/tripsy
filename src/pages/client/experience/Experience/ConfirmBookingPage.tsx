import { Button, CircularProgress } from "@material-ui/core";
import { loadStripe } from "@stripe/stripe-js";
import { getExperienceById } from "api/experiences";
import { createReceipt } from "api/receipt";
import { createCheckoutSession } from "api/stripe";
import { getCurrentUser, getUserById } from "api/users";
import LeftArrow from "assets/images/icons/left-arrow.svg";
import { startTimeOptions } from "constants/index";
import currencyFormatter from "helpers/currencyFormatter";
import toWeekDayString from "helpers/toWeekDayString";
import IExperience from "interfaces/experiences/experience.interface";
import { IUser } from "interfaces/users/user.interface";
import MainLayout from "layouts/MainLayout";
import * as React from "react";
import { useEffect, useState } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";

interface Props {}

const stripePromise = loadStripe(
  "pk_test_51IXjZvDcrQRGXIG6oVlm1uSOLxiyQnMTeGoCgnoYV3dcMAISpT1WpHia1PmB85B7oyIF26CQCkt3IbcQKcXvSs6C00Z348v2eg"
);

const ConfirmBookingPage: React.FC<Props> = () => {
  const history = useHistory();
  const { id } = useParams<{ id: string }>();
  const location = useLocation<{ time }>();
  const [experience, setExperience] = useState<IExperience>();
  const [host, setHost] = useState<IUser>();
  const [currentUser, setCurrentUser] = useState<IUser>();
  const { time } = location.state;

  useEffect(() => {
    if (time) {
      fetchExperience(id);
    } else {
      history.goBack();
    }
  }, [id]);

  const fetchExperience = async (id: string) => {
    const {
      data: { experience },
    } = await getExperienceById(id);
    if (experience) {
      setExperience(experience);
      fetchHostData(experience.hostId);
      fetchCurrentUser();
    }
  };

  const fetchHostData = async (hostId: string) => {
    const {
      data: { user },
    } = await getUserById(hostId, ["firstName", "lastName"]);
    if (user) {
      setHost(user);
    }
  };

  const fetchCurrentUser = async () => {
    const {
      data: { user },
    } = await getCurrentUser(["_id", "email"]);
    if (user) {
      setCurrentUser(user);
    }
  };

  const handleClick = async () => {
    const stripe = await stripePromise;
    if (experience && currentUser) {
      const { data: receiptId } = await createReceipt({
        hostId: experience.hostId,
        experienceId: experience._id,
        guestId: currentUser._id,
        takePlace: time,
        unitPrice: experience.pricing?.individualPrice,
        numberOfGuest: 1,
        totalPrice: (experience.pricing?.individualPrice as number) * 1,
      });
      if (receiptId) {
        const {
          data: { id: sessionId },
        } = await createCheckoutSession({
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
    <MainLayout withSearchBar={false}>
      {experience && host ? (
        <div className="container mx-auto px-40">
          <div className="flex items-center">
            <button className="mr-8" onClick={() => history.goBack()}>
              <img src={LeftArrow} width={20} height={20} alt="left arrow" />
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
                {host.firstName} {host.lastName}
              </p>
            </div>
            <div className="flex justify-between">
              <p className="text-xl font-bold">Ngày diễn ra:</p>
              <p className="text-xl">
                {toWeekDayString(time.dateObject.weekDay)}, ngày{" "}
                {time.dateObject.day} tháng {time.dateObject.month} năm{" "}
                {time.dateObject.year}
              </p>
            </div>
            <div className="flex justify-between">
              <p className="text-xl font-bold">Giờ bắt đầu:</p>
              <p className="text-xl">
                {startTimeOptions[time.startTimeIdx].text}
              </p>
            </div>
            <div className="flex justify-between">
              <p className="text-xl font-bold">Giờ kết thúc:</p>
              <p className="text-xl">
                {time.endTimeIdx >= 45
                  ? startTimeOptions[time.endTimeIdx + 4 - 48].text
                  : startTimeOptions[time.endTimeIdx].text}
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
                className="bg-main-blue text-white self-end"
                onClick={handleClick}
              >
                Thanh toán
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <CircularProgress />
      )}
    </MainLayout>
  );
};

export default ConfirmBookingPage;
