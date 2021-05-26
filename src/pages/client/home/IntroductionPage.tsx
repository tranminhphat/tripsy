import { Typography } from "@material-ui/core";
import ExperienceCard from "components/Experience/ExperienceCard";
import MyLoadingIndicator from "components/Shared/MyLoadingIndicator";
import { useExperiences } from "hooks/queries/experiences";
import MainLayout from "layouts/MainLayout";
import * as React from "react";

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
            <Typography className="mt-2">
              Các hoạt động trải nghiệm độc đáo, được hướng dẫn bởi những người
              có nhiều kinh nghiệm.
            </Typography>
            <div className="flex justify-between">
              {experiences.slice(0, 5).map((item) => (
                <div>
                  <ExperienceCard experienceId={item._id!} />
                </div>
              ))}
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
