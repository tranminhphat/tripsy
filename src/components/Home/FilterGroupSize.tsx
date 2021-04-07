import { Button, IconButton, Typography } from "@material-ui/core";
import PlusIcon from "assets/images/icons/plus.svg";
import SubtractIcon from "assets/images/icons/subtract.svg";
import MyModal from "components/Shared/MyModal";
import * as React from "react";
import { useState } from "react";

interface Props {
  initialValue: number;
  setFilterObject: any;
}

const FilterGroupSize: React.FC<Props> = ({
  initialValue,
  setFilterObject,
}) => {
  const [openModal, setOpenModal] = useState(false);
  const [value, setValue] = useState(initialValue ? initialValue : 0);
  const [groupSize, setGroupSize] = useState(initialValue ? initialValue : 0);

  const handleFilter = (value: number) => {
    if (value !== 0) {
      setFilterObject((prevVal) => ({ ...prevVal, groupSize: value }));
    } else {
      setFilterObject((prevVal) => {
        let filterObject = { ...prevVal };
        delete filterObject.groupSize;
        return filterObject;
      });
    }

    setOpenModal(false);
  };

  return (
    <>
      <button
        onClick={() => setOpenModal(true)}
        className="border border-gray-300 outline-none p-2 rounded-md hover:border-black hover:font-bold cursor-pointer"
      >
        Số lượng{groupSize !== 0 ? `: ${groupSize} người` : null}
      </button>
      <MyModal size="lg" open={openModal} setOpen={setOpenModal}>
        {{
          header: (
            <Typography className="text-xl font-bold">Số lượng</Typography>
          ),
          content: (
            <div className="flex items-center mt-8 px-8">
              <div>
                <Typography className="text-lg">
                  Số lượng khách tham gia:{" "}
                </Typography>
              </div>
              <div className="flex justify-between items-center ml-4">
                <div className={`${value === 0 ? "cursor-not-allowed" : ""}`}>
                  <IconButton
                    onClick={() => setValue(value - 1)}
                    className={`bg-black ml-4 ${
                      value === 0 ? "pointer-events-none" : ""
                    }`}
                  >
                    <img src={SubtractIcon} height={16} width={16} alt="add" />
                  </IconButton>
                </div>
                <div className="ml-4">
                  <Typography>{value}</Typography>
                </div>
                <div className={`${value === 10 ? "cursor-not-allowed" : ""}`}>
                  <IconButton
                    onClick={() => setValue(value + 1)}
                    className={`bg-gray-200 ml-4 ${
                      value === 10 ? "pointer-events-none" : ""
                    }`}
                  >
                    <img src={PlusIcon} height={16} width={16} alt="add" />
                  </IconButton>
                </div>
              </div>
            </div>
          ),
          footer: (
            <div className="flex justify-end">
              <Button
                onClick={() => setValue(0)}
                variant="contained"
                size="large"
                className="ml-2"
              >
                Xóa
              </Button>
              <Button
                onClick={() => {
                  setGroupSize(value);
                  handleFilter(value);
                }}
                variant="contained"
                size="large"
                className="bg-main-blue text-white ml-2"
              >
                Lọc
              </Button>
            </div>
          ),
        }}
      </MyModal>
    </>
  );
};

export default FilterGroupSize;
