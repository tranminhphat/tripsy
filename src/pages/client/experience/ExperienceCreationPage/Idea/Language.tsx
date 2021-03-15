import CircularProgress from "@material-ui/core/CircularProgress";
import { getExperienceById } from "api/experiences";
import MyAutocomplete from "components/Shared/MyAutocomplete";
import * as React from "react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

interface Props {
  stepProps: any;
}

const languages: string[] = ["Tiếng Việt", "English"];

const Language: React.FC<Props> = ({ stepProps }) => {
  const { setIsValid, setStepValue } = stepProps;
  const { id } = useParams<{ id: string }>();
  const experience = useSelector((state) => state.experience);
  const [language, setLanguage] = useState<string | null>(
    experience.language ? experience.language : null
  );
  const [languageInput, setLanguageInput] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchData(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const fetchData = async (id: string) => {
    if (experience.language) {
      setIsValid(true);
    } else {
      const {
        data: {
          experience: { language },
        },
      } = await getExperienceById(id, ["language"]);
      if (language) {
        setLanguage(language);
        setIsValid(true);
      }
    }

    setIsLoading(false);
  };

  const handleOnLanguageChange = (newValue: string) => {
    setLanguage(newValue);
    if (newValue) {
      setIsValid(true);
      setStepValue({ language: newValue });
    }
  };

  const handleOnLanguageInputChange = (newInputValue: string) => {
    setLanguageInput(newInputValue);
    if (languages.includes(newInputValue)) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  return (
    <div className="max-w-xl my-8 text-justify mx-auto">
      {!isLoading ? (
        <>
          <h1 className="text-4xl font-bold">
            Ngôn ngữ chính sẽ được sử dụng trong buổi trải nghiệm
          </h1>
          <p className="mt-4 mb-4 text-lg text-gray-500">
            Bạn nên có thể lưu loát trong việc nói, đọc, viết với ngôn ngữ này.
          </p>
          <MyAutocomplete
            options={languages}
            value={language}
            inputValue={languageInput}
            placeholder="Nhập vào ngôn ngữ"
            handleOnChange={(newValue: string) =>
              handleOnLanguageChange(newValue)
            }
            handleOnInputChange={(newInputValue: string) =>
              handleOnLanguageInputChange(newInputValue)
            }
          />
        </>
      ) : (
        <div className="flex justify-center items-center">
          <CircularProgress />
        </div>
      )}
    </div>
  );
};

export default Language;
