import { getExperienceById } from "api/experiences";
import * as React from "react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

interface Props {
  stepProps: any;
}

const TITLE_MAX_LENGTH = 40;
const TITLE_MIN_LENGTH = 5;

const Title: React.FC<Props> = ({ stepProps }) => {
  const { setIsValid, setStepValue } = stepProps;
  const experience = useSelector((state) => state.experience);
  const { id } = useParams<{ id: string }>();
  const [title, setTitle] = useState(experience.title ? experience.title : "");

  useEffect(() => {
    fetchTitle(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    handleUpdateStepValue();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title]);

  const fetchTitle = async (id: string) => {
    const {
      data: {
        experience: { title },
      },
    } = await getExperienceById(id);
    if (title) {
      setTitle(title);
    }
  };

  const handleTitleChange = (e: any) => {
    setTitle(e.target.value);
  };

  const handleUpdateStepValue = () => {
    if (title.length >= TITLE_MIN_LENGTH && title.length <= TITLE_MAX_LENGTH) {
      setIsValid(true);
      setStepValue({ title });
    } else {
      setIsValid(false);
    }
  };
  return (
    <div className="max-w-xl my-8 text-justify mx-auto">
      <h1 className="text-4xl font-bold">Đặt tên cho hoạt động của bạn</h1>
      <p className="mt-4 mb-4 text-lg text-gray-500">
        Hãy lựa chọn một cái tên thật ngắn gọn, xúc tính và đầy hứng thú.
      </p>
      <div className="mt-8 mb-2 text-left">
        <label className="font-bold">Tiêu đề của trải nghiệm là gì?</label>
        <input
          type="text"
          className="w-full mt-2 p-4 border border-gray-300 hover:border-black rounded-md"
          value={title}
          onChange={handleTitleChange}
        />
        <div className="mt-2">
          {title.length > 40 ? (
            <p className="text-red-600 font-bold">
              Độ dài của tiêu đề phải ít hơn 40 ký tự
            </p>
          ) : null}
          <p className={title.length > 40 ? "text-red-600 font-bold" : ""}>
            {title.length}/{TITLE_MAX_LENGTH}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Title;
