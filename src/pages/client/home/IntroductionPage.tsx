import { Typography } from "@material-ui/core";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import FoodPic from "assets/images/backgrounds/food.jpg";
import NaturePic from "assets/images/backgrounds/nature.jpg";
import SportPic from "assets/images/backgrounds/sport.jpg";
import ExperienceCard from "components/Experience/ExperienceCard";
import MyLoadingIndicator from "components/Shared/MyLoadingIndicator";
import { useExperiences } from "hooks/queries/experiences";
import MainLayout from "layouts/MainLayout";
import * as React from "react";
import { Link } from "react-router-dom";

interface Props {}

const IntroductionPage: React.FC<Props> = () => {
  const { data: experiences } = useExperiences();
  return (
    <MainLayout>
      {experiences ? (
        <>
          <div className="flex justify-between items-center my-4">
            <Typography className="text-4xl text-secondary font-bold w-1/2 leading-normal">
              Những hoạt động trải nghiệm đặc biệt được tổ chức bởi các chuyên
              gia
            </Typography>
          </div>
          <div className="mt-4">
            <Typography className="text-2xl text-secondary font-bold">
              Hoạt động trải nghiệm
            </Typography>
            <Typography>
              Các hoạt động trải nghiệm độc đáo, được hướng dẫn bởi những người
              có nhiều kinh nghiệm.
            </Typography>
            <div className="mt-4 flex justify-between">
              {experiences.slice(0, 5).map((item) => (
                <div>
                  <ExperienceCard experienceId={item._id!} />
                </div>
              ))}
            </div>
            <Typography className="font-bold underline">
              <Link to="/experiences">
                Hiển thị tất cả trải nghiệm
                <span>
                  <ChevronRightIcon />
                </span>
              </Link>
            </Typography>
          </div>
          <div className="mt-8 flex justify-between">
            <div>
              <Link
                to={{
                  pathname: "/experiences",
                  state: {
                    theme: "Thiên nhiên và Ngoài trời",
                  },
                }}
              >
                <img
                  style={{ width: 420, height: 278 }}
                  src={NaturePic}
                  alt="nature"
                  className="rounded-md"
                />
                <div className="mt-2">
                  <Typography className="text-lg font-bold">
                    Thiên nhiên và Ngoài trời
                  </Typography>
                  <Typography className="text-sm text-gray-500">
                    Hoạt động tổ chức tại những địa điểm thiên nhiên đặc biệt,
                    hãy đến và tận hưởng
                  </Typography>
                </div>
              </Link>
            </div>
            <div className="mx-4">
              <Link
                to={{
                  pathname: "/experiences",
                  state: {
                    theme: "Đồ ăn",
                  },
                }}
              >
                <img
                  style={{ width: 420, height: 278 }}
                  src={FoodPic}
                  alt="food"
                  className="rounded-md"
                />
                <div className="mt-2">
                  <Typography className="text-lg font-bold">Ẩm thực</Typography>
                  <Typography className="text-sm text-gray-500">
                    Trải nghiệm những nét văn hóa độc đáo thông qua những món ăn
                    ngon và thú vị
                  </Typography>
                </div>
              </Link>
            </div>
            <div>
              <Link
                to={{
                  pathname: "/experiences",
                  state: {
                    theme: "Thể thao",
                  },
                }}
              >
                <img
                  style={{ width: 420, height: 278 }}
                  src={SportPic}
                  alt="sport"
                  className="rounded-md"
                />
                <div className="mt-2">
                  <Typography className="text-lg font-bold">
                    Thể thao
                  </Typography>
                  <Typography className="text-sm text-gray-500">
                    Tăng cường sức khỏe và niềm vui thông qua các hoạt động thể
                    dục thể thao
                  </Typography>
                </div>
              </Link>
            </div>
          </div>
        </>
      ) : (
        <MyLoadingIndicator />
      )}
    </MainLayout>
  );
};

export default IntroductionPage;
