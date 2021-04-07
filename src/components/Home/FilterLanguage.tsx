import { Button, Checkbox, Typography } from "@material-ui/core";
import MyModal from "components/Shared/MyModal";
import * as React from "react";
import { useState } from "react";

interface Props {
  initialValue: string;
  setFilterObject: any;
}

const FilterLanguage: React.FC<Props> = ({ initialValue, setFilterObject }) => {
  const [openModal, setOpenModal] = useState(false);
  const [value, setValue] = useState(initialValue ? initialValue : null);
  const [language, setLanguage] = useState(initialValue ? initialValue : null);

  const handleFilter = (value: string | null) => {
    if (value) {
      setFilterObject((prevVal) => ({ ...prevVal, language: value }));
    } else {
      setFilterObject((prevVal) => {
        let filterObject = { ...prevVal };
        delete filterObject.language;
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
        Ngôn ngữ{language ? `: ${language}` : null}
      </button>
      <MyModal size="lg" open={openModal} setOpen={setOpenModal}>
        {{
          header: (
            <Typography className="text-xl font-bold">Ngôn ngữ</Typography>
          ),
          content: (
            <div className="flex flex-col mt-8 px-8">
              <div>
                <Typography className="text-lg">
                  Ngôn ngữ sử dụng của buổi trải nghiệm:
                </Typography>
              </div>
              <div className="flex items-center">
                <Checkbox
                  checked={value === "English"}
                  onChange={() => setValue("English")}
                  color="primary"
                />
                <Typography>English</Typography>
              </div>
              <div className="flex items-center">
                <Checkbox
                  checked={value === "Tiếng Việt"}
                  onChange={() => setValue("Tiếng Việt")}
                  color="primary"
                />
                <Typography>Tiếng Việt</Typography>
              </div>
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
                  setLanguage(value);
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

export default FilterLanguage;
