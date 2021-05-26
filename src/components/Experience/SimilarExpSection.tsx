import * as React from "react";
import OverflowWrapper from "react-overflow-wrapper";
import ExperienceCard from "./ExperienceCard";

interface Props {
  expList: string[];
}

const SimilarExpSection: React.FC<Props> = ({ expList }) => {
  return (
    <>
      <div className="mb-4">
        <h1 className="text-2xl font-bold">Các trải nghiệm tương tự</h1>
      </div>
      <OverflowWrapper
        iconColor="#000"
        iconSize={48}
        iconStyle={{
          left: { marginTop: "100px" },
          right: { marginTop: "100px" },
        }}
      >
        <div className="flex mt-4">
          {expList.map((item) => (
            <div className="mx-4 whitespace-normal" key={item}>
              <ExperienceCard experienceId={item} />
            </div>
          ))}
        </div>
      </OverflowWrapper>
    </>
  );
};

export default SimilarExpSection;
