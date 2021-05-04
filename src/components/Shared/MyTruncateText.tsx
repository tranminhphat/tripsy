import * as React from "react";
import ReactReadMoreReadLess from "react-read-more-read-less";

interface Props {
  text: string;
}

const MyTruncateText: React.FC<Props> = ({ text }) => {
  return (
    <ReactReadMoreReadLess
      charLimit={200}
      readMoreText="Xem thêm"
      readLessText="Ẩn"
      readMoreClassName="underline hover:no-underline cursor-pointer font-semibold"
      readLessClassName="underline hover:no-underline cursor-pointer font-semibold"
    >
      {text}
    </ReactReadMoreReadLess>
  );
};

export default MyTruncateText;
