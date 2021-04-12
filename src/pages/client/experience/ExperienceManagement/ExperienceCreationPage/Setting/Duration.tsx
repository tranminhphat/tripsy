import { MenuItem, Select } from "@material-ui/core";
import { getExperienceById } from "api/experiences";
import MyLoadingIndicator from "components/Shared/MyLoadingIndicator";
import { durationOptions } from "constants/index";
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

  const [durationOpen, setDurationOpen] = useState(false);

  useEffect(() => {
    setIsValid(true);
    fetchDuration(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const fetchDuration = async (id: string) => {
    const {
      data: {
        experience: { duration },
      },
    } = await getExperienceById(id);
    if (duration) {
      setDuration(duration);
    }

    setIsLoading(false);
  };

  const handleOpen = (event: any) => {
    setDurationOpen(true);
  };

  const handleClose = (event: any) => {
    setDurationOpen(false);
  };

  const handleOnDurationChange = (event: any) => {
    setDuration(event.target.value as number);
    setStepValue({ duration: event.target.value as number });
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
        </>
      ) : (
        <div className="flex-grow justify-center items-center">
          <MyLoadingIndicator width={300} height={300} />
        </div>
      )}
    </div>
  );
};

export default Duration;
