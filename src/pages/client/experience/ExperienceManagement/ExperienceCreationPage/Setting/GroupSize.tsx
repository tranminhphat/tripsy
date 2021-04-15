import { MenuItem, Select } from "@material-ui/core";
import { getExperienceById } from "api/experiences";
import MyLoadingIndicator from "components/Shared/MyLoadingIndicator";
import { groupSizeOptions } from "constants/index";
import * as React from "react";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ExperienceCreationContext } from "../ExperienceCreationPage";
interface Props {
  stepProps: any;
}

const GroupSize: React.FC<Props> = ({ stepProps }) => {
  const { setIsValid, setStepValue } = stepProps;
  const { creationObject } = useContext(ExperienceCreationContext);
  const { id } = useParams<{ id: string }>();
  const [isLoading, setIsLoading] = useState(true);
  const [groupSize, setGroupSize] = useState(
    creationObject.groupSize ? creationObject.groupSize : 1
  );
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchGroupSize(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const fetchGroupSize = async (id: string) => {
    if (creationObject.groupSize) {
      setIsValid(true);
    } else {
      const {
        data: {
          experience: { groupSize },
        },
      } = await getExperienceById(id);
      if (groupSize) {
        setGroupSize(groupSize);
        setIsValid(true);
      }

      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleOnGroupSizeChange = (event: any) => {
    setGroupSize(event.target.value as number);
    setIsValid(true);
    setStepValue({ groupSize: event.target.value as number });
  };

  return (
    <div className="max-w-xl my-8 text-justify mx-auto">
      {!isLoading ? (
        <>
          <h1 className="text-4xl font-bold">Số lượng khách tối đa</h1>
          <p className="mt-4 mb-4 text-lg text-gray-500">
            Hãy nghĩ về số lượng khách sẽ phù hợp nhất với trải nghiệm của bạn.
            Chú ý rằng số lượng khách tối thiểu là 1, điều đó đồng nghĩa với
            việc nếu chỉ có 1 khách tham gia trải nghiệm của bạn, bạn vẫn sẽ
            phải tổ chức hoạt động của mình.
          </p>
          <Select
            className="w-full"
            open={open}
            onClose={handleClose}
            onOpen={handleOpen}
            value={groupSize}
            onChange={handleOnGroupSizeChange}
          >
            {groupSizeOptions.map((option: number) => (
              <MenuItem key={option} value={option}>
                {option} người
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

export default GroupSize;
