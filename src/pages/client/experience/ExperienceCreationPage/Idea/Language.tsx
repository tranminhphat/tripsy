import { TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { getExperienceById } from "api/experiences";
import * as React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import MyAutocomplete from "components/Shared/MyAutocomplete";

interface Props {
  stepProps: any;
}

const Language: React.FC<Props> = ({ stepProps }) => {
  const { setIsValid, setStepValue } = stepProps;
  const { id } = useParams<{ id: string }>();
  const languages = ["Tiếng Việt", "English"];
  const experience = useSelector((state) => state.experience);
  const [language, setLanguage] = React.useState<string | null>(null);
  const [languageInput, setLanguageInput] = React.useState("");

  React.useEffect(() => {
    fetchData(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

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

  const fetchData = async (id: string) => {
    if (experience.language) {
      setLanguage(experience.language);
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
  };

  return (
    <div className="max-w-xl text-justify mx-auto">
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
        placeholder="Nhập vào thành phố"
        handleOnChange={(newValue: string) => handleOnLanguageChange(newValue)}
        handleOnInputChange={(newInputValue: string) =>
          handleOnLanguageInputChange(newInputValue)
        }
      />
    </div>
  );
};

export default Language;
