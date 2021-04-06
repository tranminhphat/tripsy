import MyTruncateText from "components/Shared/MyTruncateText";
import * as React from "react";

interface Props {
  description: string;
}

const DescriptionSection: React.FC<Props> = ({ description }) => {
  return (
    <div>
      <div>
        <h1 className="text-2xl font-bold">Bạn sẽ làm gì</h1>
      </div>
      <div className="mt-4">
        <p className="text-lg">
          <MyTruncateText text={description} />
        </p>
      </div>
    </div>
  );
};

export default DescriptionSection;
