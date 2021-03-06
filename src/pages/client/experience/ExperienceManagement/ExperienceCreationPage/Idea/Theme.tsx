import { Slide, Typography } from "@material-ui/core";
import ArrowRightIcon from "@material-ui/icons/ArrowForwardIos";
import CloseIcon from "@material-ui/icons/Close";
import { getExperienceById } from "api/experiences";
import MyLoadingIndicator from "components/Shared/MyLoadingIndicator";
import { themes } from "constants/index";
import * as React from "react";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ExperienceCreationContext } from "../ExperienceCreationPage";

interface Props {
  stepProps: any;
}

const Theme: React.FC<Props> = ({ stepProps }) => {
  const { setStepValue, setIsValid } = stepProps;
  const { id } = useParams<{ id: string }>();
  const { creationObject } = useContext(ExperienceCreationContext);
  const [theme, setTheme] = useState<string>(
    creationObject.theme ? creationObject.theme : "Chủ đề"
  );
  const [checked, setChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const fetchData = async (id: string) => {
    if (creationObject.theme) {
      setIsValid(true);
    } else {
      const {
        data: {
          experience: { theme },
        },
      } = await getExperienceById(id);
      if (theme) {
        setTheme(theme);
        setIsValid(true);
      }
    }

    setIsLoading(false);
  };

  return (
    <div className="container">
      <Slide direction="left" in={checked} mountOnEnter unmountOnExit>
        <div className="bg-white absolute top-0 z-50 rounded-2xl mt-4 p-4 shadow-2xl">
          <div className="flex justify-between">
            <Typography className="text-xl font-bold">
              Chọn một chủ đề chính
            </Typography>
            <div onClick={() => setChecked(false)}>
              <CloseIcon />
            </div>
          </div>

          <div className="mt-16 px-8">
            <Typography className="text-4xl font-bold">Các chủ đề</Typography>
            <div className="mt-4 px-8">
              <div className="flex items-stretch justify-start flex-wrap">
                {themes.map((theme) => {
                  return (
                    <div
                      key={theme.id}
                      onClick={() => {
                        setTheme(theme.name);
                        setStepValue({ theme: theme.name });
                        setChecked(false);
                        setIsValid(true);
                      }}
                      className="w-1/3 relative"
                    >
                      <div className="p-5 mb-4 mr-4 border border-gray-300 rounded-lg cursor-pointer">
                        <Typography className="text-lg font-bold">
                          {theme.name}
                        </Typography>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </Slide>
      <div className="max-w-xl my-8 text-justify mx-auto">
        {!isLoading ? (
          <>
            <h1 className="text-4xl font-bold">
              Hãy lựa chọn chủ đề dành cho hoạt động của bạn
            </h1>
            <p className="mt-4 text-lg text-gray-500">
              Lựa chọn chủ đề mô tả tốt nhất những gì người tham gia sẽ làm
              trong hoạt động của bạn. Việc này sẽ hỗ trợ người tham gia tìm
              thấy và tham gia hoạt động của bạn.
            </p>
            <div
              onClick={() => setChecked(true)}
              className="border border-gray-300 rounded-lg mt-16 cursor-pointer"
            >
              <div className="p-5">
                <div className="flex justify-between">
                  <Typography className="text-lg font-bold">{theme}</Typography>
                  <ArrowRightIcon />
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-grow justify-center items-center">
            <MyLoadingIndicator width={300} height={300} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Theme;
