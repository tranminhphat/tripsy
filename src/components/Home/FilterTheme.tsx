import { Button, Typography } from "@material-ui/core";
import MyModal from "components/Shared/MyModal";
import { themes } from "constants/index";
import * as React from "react";
import { useState } from "react";

interface Props {
  setFilterObject: any;
}

const FilterMetadata: React.FC<Props> = ({ setFilterObject }) => {
  const [value, setValue] = useState<string>();
  const [theme, setTheme] = useState<string>();
  const [openTheme, setOpenTheme] = useState(false);

  const handleSetFilterObject = (value: any) => {
    setFilterObject((prevVal) => ({ ...prevVal, theme: value }));
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
                          className="w-full h-full border border-gray-300 text-center rounded-lg cursor-pointer focus:border-black"
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
                  setTheme(value);
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
