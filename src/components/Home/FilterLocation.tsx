import { Button, Typography } from "@material-ui/core";
import { getCities } from "api/seeds";
import MyAutocomplete from "components/Shared/MyAutocomplete";
import MyModal from "components/Shared/MyModal";
import * as React from "react";
import { useEffect, useState } from "react";

interface Props {
  initialValue: string;
  setFilterObject: any;
}

const FilterLocation: React.FC<Props> = ({ initialValue, setFilterObject }) => {
  const [openModal, setOpenModal] = useState(false);
  const [cities, setCities] = useState<string[]>();
  const [value, setValue] = useState<string>("");
  const [valueInput, setValueInput] = useState<string>("");

  const [location, setLocation] = useState<string | null>(null);

  const fetchCities = async () => {
    const {
      data: { cities },
    } = await getCities();
    setCities(cities);
  };

  useEffect(() => {
    fetchCities();
  }, []);

  useEffect(() => {
    setValue(initialValue ? initialValue : "");
    setLocation(initialValue ? initialValue : null);
  }, [initialValue]);

  const handleFilter = (value: string | null) => {
    if (value) {
      setFilterObject((prevVal) => ({ ...prevVal, location: value }));
    } else {
      setFilterObject((prevVal) => {
        let filterObject = { ...prevVal };
        delete filterObject.location;
        setFilterObject(filterObject);
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
        Địa điểm{location ? `: ${location}` : null}
      </button>
      <MyModal size="lg" open={openModal} setOpen={setOpenModal}>
        {{
          header: (
            <Typography className="text-xl font-bold">Địa điểm</Typography>
          ),
          content: (
            <div className="flex flex-col mt-8 px-8">
              <div className="flex items-center">
                {cities ? (
                  <MyAutocomplete
                    options={cities}
                    value={value}
                    handleOnChange={(newValue) => setValue(newValue)}
                    inputValue={valueInput}
                    handleOnInputChange={(newValue) => {
                      setValueInput(newValue);
                    }}
                    placeholder="Chọn thành phố / tỉnh"
                  />
                ) : null}
              </div>
            </div>
          ),
          footer: (
            <div className="flex justify-end">
              <Button
                onClick={() => setValue("")}
                variant="contained"
                size="large"
                className="ml-2"
              >
                Xóa
              </Button>
              <Button
                onClick={() => {
                  setLocation(value);
                  handleFilter(value);
                }}
                variant="contained"
                size="large"
                className="bg-primary text-white ml-2"
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

export default FilterLocation;
