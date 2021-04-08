import { Button, Typography } from "@material-ui/core";
import Slider from "@material-ui/core/Slider";
import MyModal from "components/Shared/MyModal";
import currencyFormatter from "helpers/currencyFormatter";
import * as React from "react";
import { useEffect, useState } from "react";

interface Props {
  initialValue: [number, number] | null;
  setFilterObject: any;
}

const FilterPrice: React.FC<Props> = ({ initialValue, setFilterObject }) => {
  const [openModal, setOpenModal] = useState(false);
  const [value, setValue] = useState<number[] | null>(null);
  const [price, setPrice] = useState<number[] | null>(null);

  useEffect(() => {
    setValue(initialValue ? initialValue : [100, 500]);
    setPrice(initialValue ? initialValue : null);
  }, [initialValue]);

  const handleChange = (event: any, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };

  const handleFilter = (value: number[]) => {
    if (value) {
      setFilterObject((prevVal) => ({
        ...prevVal,
        price: value,
      }));
    } else {
      setFilterObject((prevVal) => {
        let filterObject = { ...prevVal };
        delete filterObject.price;
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
        Giá
        {price
          ? `: ${currencyFormatter(price[0] * 1000)} - ${currencyFormatter(
              price[1] * 1000
            )}`
          : null}
      </button>
      <MyModal size="lg" open={openModal} setOpen={setOpenModal}>
        {{
          header: <Typography className="text-xl font-bold">Giá</Typography>,
          content: (
            <div className="flex mt-8">
              <Slider
                value={value!}
                min={50}
                step={50}
                max={1000}
                onChange={handleChange}
                valueLabelDisplay="on"
              />
              <Typography className="ml-4 whitespace-nowrap">
                đơn vị: nghìn đồng
              </Typography>
            </div>
          ),
          footer: (
            <div className="flex justify-end">
              <Button
                onClick={() => setValue(null)}
                variant="contained"
                size="large"
                className="ml-2"
              >
                Xóa
              </Button>
              <Button
                onClick={() => {
                  setPrice(value);
                  handleFilter(value!);
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

export default FilterPrice;
