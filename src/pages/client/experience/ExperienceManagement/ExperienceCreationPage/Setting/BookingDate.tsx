import { MenuItem, Select } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import { getExperienceById } from "api/experiences";
import { bookingDateOptions } from "constants/index";
import * as React from "react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

interface Props {
  stepProps: any;
}

const BookingDate: React.FC<Props> = ({ stepProps }) => {
  const { setIsValid, setStepValue } = stepProps;
  const experience = useSelector((state) => state.experience);
  const { id } = useParams<{ id: string }>();
  const [isLoading, setIsLoading] = useState(true);
  const [bookingDate, setBookingDate] = useState(
    experience.bookingDate ? experience.bookingDate : 1
  );
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setIsValid(true);
    fetchBookingDate(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const fetchBookingDate = async (id: string) => {
    const {
      data: {
        experience: { bookingDate },
      },
    } = await getExperienceById(id);
    if (bookingDate) {
      setBookingDate(bookingDate);
    }

    setIsLoading(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleOnBookingDateChange = (event: any) => {
    setBookingDate(event.target.value as number);
    setIsValid(true);
    setStepValue({ bookingDate: event.target.value as number });
  };

  return (
    <div className="max-w-xl my-8 text-justify mx-auto">
      {!isLoading ? (
        <>
          <h1 className="text-4xl font-bold">Thời hạn đặt chổ</h1>
          <p className="mt-4 mb-4 text-lg text-gray-500">
            Chúng tôi khuyên bạn nên chọn thời gian đặt chổ gần với thời gian
            bắt đầu để nhiều khách có thể đặt hơn. Đảm bảo dành đủ thời gian để
            chuẩn bị cho khách.
          </p>
          <p className="text-xl font-bold">
            Thời hạn dành cho khách có thể đặt chổ
          </p>
          <Select
            className="w-full"
            open={open}
            onClose={handleClose}
            onOpen={handleOpen}
            value={bookingDate}
            onChange={handleOnBookingDateChange}
          >
            {bookingDateOptions.map((option: number) => (
              <MenuItem key={option} value={option}>
                {option} ngày trước thời điểm bắt đầu
              </MenuItem>
            ))}
          </Select>
        </>
      ) : (
        <div className="flex justify-center items-center">
          <CircularProgress />
        </div>
      )}
    </div>
  );
};

export default BookingDate;