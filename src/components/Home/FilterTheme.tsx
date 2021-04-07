import { Button, Typography } from "@material-ui/core";
import MyModal from "components/Shared/MyModal";
import { themes } from "constants/index";
import * as React from "react";
import { useState } from "react";

interface Props {
  initialTheme: string;
  setFilterObject: any;
}

const FilterMetadata: React.FC<Props> = ({ initialTheme, setFilterObject }) => {
  const [value, setValue] = useState<string | null>(
    initialTheme ? initialTheme : null
  );
  const [theme, setTheme] = useState<string | null>(
    initialTheme ? initialTheme : null
  );
  console.log(theme);
  const [openTheme, setOpenTheme] = useState(false);

  const handleSetFilterObject = (value: any) => {
    if (value !== null) {
      setFilterObject((prevVal) => ({ ...prevVal, theme: value }));
    } else {
      setFilterObject((prevVal) => {
        let filterObject = { ...prevVal };
        delete filterObject.theme;
        return filterObject;
      });
    }
    setOpenTheme(false);
  };

  return (
    <>
      <button
        onClick={() => setOpenTheme(true)}
        className="border border-gray-300 outline-none p-2 rounded-md hover:border-black hover:font-bold cursor-pointer"
      >
        Chủ đề{theme ? `: ${theme}` : ""}
      </button>
      <MyModal size="4xl" open={openTheme} setOpen={setOpenTheme}>
        {{
          header: <Typography className="text-xl font-bold">Chủ đề</Typography>,
          content: (
            <div className="mt-8 px-8">
              <div className="flex items-stretch justify-start flex-wrap">
                {themes.map((item) => {
                  return (
                    <div key={item.id} className="w-1/3 h-auto relative">
                      <div className="w-full h-full mr-2 p-4 mb-4 ">
                        <button
                          onClick={() => setValue(item.name)}
                          className={`w-full h-full border text-center rounded-lg cursor-pointer focus:border-black ${
                            item.name === value
                              ? "border-black"
                              : "border-gray-300"
                          }`}
                        >
                          <Typography className="text-lg">
                            {item.name}
                          </Typography>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ),
          footer: (
            <div className="flex justify-end">
              <Button
                onClick={() => {
                  setValue(null);
                }}
                variant="contained"
                size="large"
                className="ml-2"
              >
                Xóa
              </Button>
              <Button
                onClick={() => {
                  setTheme(value!);
                  handleSetFilterObject(value);
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

export default FilterMetadata;
