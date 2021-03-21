import { MenuItem, Select } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import { getExperienceById } from "api/experiences";
import { durationOptions, startTimeOptions } from "constants/index";
import * as React from "react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

interface Props {
  stepProps: any;
}

const Duration: React.FC<Props> = ({ stepProps }) => {
  const { setIsValid, setStepValue } = stepProps;
  const experience = useSelector((state) => state.experience);
  const { id } = useParams<{ id: string }>();
  const [isLoading, setIsLoading] = useState(true);
  const [duration, setDuration] = useState(
    experience.duration ? experience.duration : 2
  );
  const [startTime, setStartTime] = useState(
    experience.startTime ? experience.startTime : "5:00 AM"
  );

  const [durationOpen, setDurationOpen] = useState(false);
  const [startTimeOpen, setStartTimeOpen] = useState(false);

  useEffect(() => {
    setIsValid(true);
    fetchDuration(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const fetchDuration = async (id: string) => {
    const {
      data: {
        experience: { duration, startTime },
      },
    } = await getExperienceById(id);
    if (duration) {
      setDuration(duration);
    }

    if (startTime) {
      setStartTime(startTime);
    }

    setIsLoading(false);
  };

  const handleOpen = (event: any) => {
    if (event.target.id === "duration") {
      setDurationOpen(true);
    } else {
      setStartTimeOpen(true);
    }
  };

  const handleClose = (event: any) => {
    setDurationOpen(false);
    setStartTimeOpen(false);
  };

  const handleOnDurationChange = (event: any) => {
    setDuration(event.target.value as number);
    setStepValue({ duration: event.target.value as number });
  };

  const handleOnStartTimeChange = (event: any) => {
    setStartTime(event.target.value);
    setStepValue({ startTime: event.target.value });
  };
  return (
    <div className="max-w-xl my-8 text-justify mx-auto">
      {!isLoading ? (
        <>
          <h1 className="text-4xl font-bold">
            Hoạt động của bạn sẽ kéo dài bao lâu?
          </h1>
          <p className="mt-4 mb-4 text-lg text-gray-500">
            Đa số các trải nghiệm có thời lượng dưới 3 tiếng
          </p>
          <p className="text-xl font-bold">Thời lượng</p>
          <Select
            className="w-full"
            id="duration"
            open={durationOpen}
            onClose={handleClose}
            onOpen={handleOpen}
            value={duration}
            onChange={handleOnDurationChange}
          >
            {durationOptions.map((option: number) => (
              <MenuItem key={option} value={option}>
                {option} giờ
              </MenuItem>
            ))}
          </Select>
          <p className="mt-4 text-lg font-bold">
            Bạn sẽ bắt đầu hoạt động lúc mấy giờ ?
          </p>
          <p className="mt-4 mb-4 text-lg text-gray-500">
            Sau đó, bạn sẽ chọn ngày lịch chính xác mà bạn muốn tổ chức. Bạn
            cũng sẽ có thể điều chỉnh thời gian cho từng ngày riêng lẻ.
          </p>
          <p className="text-xl font-bold">Thời điểm bắt đầu trải nghiệm</p>
          <Select
            className="w-full"
            name="startTime"
            open={startTimeOpen}
            onClose={handleClose}
            onOpen={handleOpen}
            value={startTime}
            onChange={handleOnStartTimeChange}
          >
            {startTimeOptions.map((option: string) => (
              <MenuItem key={option} value={option}>
                {option}
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

export default Duration;
