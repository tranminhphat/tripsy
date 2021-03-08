import * as React from "react";

interface Props {
  stepProps: any;
}

const Description: React.FC<Props> = ({ stepProps }) => {
  const { setIsValid } = stepProps;
  const [value, setValue] = React.useState("");

  const handleOnChange = (e) => {
    setValue(e.target.value);
    setIsValid(value.length >= 10);
  };
  return (
    <div className="max-w-xl mx-auto">
      <h1 className="text-4xl font-bold">Chúng ta sẽ làm gì</h1>
      <p className="mt-4 text-gray-500">
        Mô tả hoạt động của bạn một cách chi tiết làm tăng cơ hội người tham gia
        trở nên hứng thú với nó. Bạn có thể diễn tả như một câu chuyện.
      </p>
      <h2 className="text-2xl mt-4 font-bold">Mô tả hoạt động của bạn</h2>
      <p className="mt-4 text-gray-500">
        <span className="pr-5">1.</span>
        <span>
          Trước tiên, hãy mô tả ngắn gọn những gì bạn sẽ làm với khách của mình.
          Những chi tiết độc đáo nào khiến nó trở nên khác biệt so với những
          trải nghiệm tương tự khác?
        </span>
      </p>
      <p className="mt-4 text-gray-500">
        <span className="pr-5">2.</span>
        <span>
          Sau đó, hãy cụ thể hơn. Bạn sẽ bắt đầu mọi thứ như thế nào? Làm thế
          nào bạn sẽ làm cho khách cảm thấy được quan tâm và gắn kết trong thời
          gian của bạn?
        </span>
      </p>
      <p className="mt-4 text-gray-500">
        <span className="pr-5">3.</span>
        <span>
          Cuối cùng, hãy nói những gì bạn muốn khách sẽ đạt được. Bạn bè? Sự
          hiểu biết? Một sự đánh giá cao hơn cho hoạt động của bạn? Hãy kết thúc
          với một quan điểm tuyệt vời.
        </span>
      </p>
      <div className="mt-4">
        <textarea
          value={value}
          onChange={handleOnChange}
          className="w-full h-36 pl-2 pt-2 border border-gray-300"
        ></textarea>
        <span>{value.length}/1400</span>
      </div>
    </div>
  );
};

export default Description;
