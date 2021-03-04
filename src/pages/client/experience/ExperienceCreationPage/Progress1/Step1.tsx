import * as React from "react";
import { useParams } from "react-router-dom";
import { Button, Slide, Typography } from "@material-ui/core";
import { getExperienceById } from "api/experiences";
import ArrowRightIcon from "@material-ui/icons/ArrowForwardIos";
import CloseIcon from "@material-ui/icons/Close";

const themes = [
  { id: 1, name: "Động vật" },
  { id: 2, name: "Hội họa và Điêu khắc" },
  { id: 3, name: "Văn hóa và Xã hội" },
  { id: 4, name: "Đồ uống" },
  { id: 5, name: "Giải trí" },
  { id: 6, name: "Lịch sử và văn học" },
  { id: 7, name: "Thiên nhiên và Ngoài trời" },
  { id: 8, name: "Mua sắm" },
  { id: 9, name: "Thể thao" },
  { id: 10, name: "Sức khỏe" },
];
interface Props {
  stepProps: any;
}

const Step1: React.FC<Props> = ({ stepProps }) => {
  const { steps, activeStep, setStepValue } = stepProps;
  const [theme, setTheme] = React.useState("Chủ đề");
  const { id } = useParams<{ id: string }>();
  const [checked, setChecked] = React.useState(false);

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
                        setStepValue(theme.name);
                        setChecked(false);
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
      <div className="max-w-xl mx-auto">
        <h1 className="text-4xl font-bold">
          Hãy lựa chọn chủ đề dành cho hoạt động của bạn
        </h1>
        <p className="mt-2 text-gray-500">
          Lựa chọn chủ đề mô tả tốt nhất những gì người tham gia sẽ làm trong
          hoạt động của bạn. Việc này sẽ hỗ trợ người tham gia tìm thấy và tham
          gia hoạt động của bạn.
        </p>
        <div
          onClick={() => setChecked(true)}
          className="border border-gray-300 rounded-lg mt-2 cursor-pointer"
        >
          <div className="p-5">
            <div className="flex justify-between">
              <Typography className="text-lg font-bold">{theme}</Typography>
              <ArrowRightIcon />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step1;
