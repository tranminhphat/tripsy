import { getExperienceById } from "api/experiences";
import MyLoadingIndicator from "components/Shared/MyLoadingIndicator";
import * as React from "react";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ExperienceCreationContext } from "../ExperienceCreationPage";

interface Props {
  stepProps: any;
}

const Description: React.FC<Props> = ({ stepProps }) => {
  const { setIsValid, setStepValue } = stepProps;
  const { id } = useParams<{ id: string }>();
  const { creationObject } = useContext(ExperienceCreationContext);
  const [description, setDescription] = useState(
    creationObject.description ? creationObject.description : ""
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchDescription(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchDescription = async (id: string) => {
    if (creationObject.description) {
      setIsValid(true);
    } else {
      const {
        data: {
          experience: { description },
        },
      } = await getExperienceById(id);
      if (description) {
        setDescription(description);
        setIsValid(true);
      }
    }

    setIsLoading(false);
  };

  const handleOnChange = (e: any) => {
    setDescription(e.target.value);
    if (e.target.value.length >= 10) {
      setIsValid(true);
      setStepValue({ description: e.target.value });
    } else {
      setIsValid(false);
    }
  };
  return (
    <div className="max-w-xl my-8 text-justify mx-auto">
      {!isLoading ? (
        <>
          <h1 className="text-4xl font-bold">Chúng ta sẽ làm gì</h1>
          <p className="mt-4 text-lg text-gray-500">
            Mô tả hoạt động của bạn một cách chi tiết làm tăng cơ hội người tham
            gia trở nên hứng thú với nó. Bạn có thể diễn tả như một câu chuyện.
          </p>
          <h2 className="text-2xl mt-4 font-bold">Mô tả hoạt động của bạn</h2>
          <p className="mt-4 text-lg text-gray-500">
            <span className="pr-5">1.</span>
            <span>
              Trước tiên, hãy mô tả ngắn gọn những gì bạn sẽ làm với khách của
              mình. Những chi tiết độc đáo nào khiến nó trở nên khác biệt so với
              những trải nghiệm tương tự khác?
            </span>
          </p>
          <p className="mt-4 text-lg text-gray-500">
            <span className="pr-5">2.</span>
            <span>
              Sau đó, hãy cụ thể hơn. Bạn sẽ bắt đầu mọi thứ như thế nào? Làm
              thế nào bạn sẽ làm cho khách cảm thấy được quan tâm và gắn kết
              trong thời gian của bạn?
            </span>
          </p>
          <p className="mt-4 text-lg text-gray-500">
            <span className="pr-5">3.</span>
            <span>
              Cuối cùng, hãy nói những gì bạn muốn khách sẽ đạt được. Bạn bè? Sự
              hiểu biết? Một sự đánh giá cao hơn cho hoạt động của bạn? Hãy kết
              thúc với một quan điểm tuyệt vời.
            </span>
          </p>
          <div className="mt-4">
            <textarea
              value={description}
              onChange={handleOnChange}
              className="w-full h-36 pl-2 pt-2 border border-gray-300"
            ></textarea>
            <span>{description.length}/1400</span>
          </div>
        </>
      ) : (
        <div className="flex-grow justify-center items-center">
          <MyLoadingIndicator width={300} height={300} />
        </div>
      )}
    </div>
  );
};

export default Description;
