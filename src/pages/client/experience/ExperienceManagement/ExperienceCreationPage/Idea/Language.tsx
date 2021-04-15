import { getExperienceById } from "api/experiences";
import MyAutocomplete from "components/Shared/MyAutocomplete";
import MyLoadingIndicator from "components/Shared/MyLoadingIndicator";
import { languages } from "constants/index";
import * as React from "react";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ExperienceCreationContext } from "../ExperienceCreationPage";
interface Props {
  stepProps: any;
}

const Language: React.FC<Props> = ({ stepProps }) => {
  const { setIsValid, setStepValue } = stepProps;
  const { id } = useParams<{ id: string }>();
  const { creationObject } = useContext(ExperienceCreationContext);
  const [language, setLanguage] = useState<string | null>(
    creationObject.language ? creationObject.language : null
  );
  const [languageInput, setLanguageInput] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchData(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const fetchData = async (id: string) => {
    if (creationObject.language) {
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
        <div className="flex-grow justify-center items-center">
          <MyLoadingIndicator width={300} height={300} />
        </div>
      )}
    </div>
  );
};

export default Language;
