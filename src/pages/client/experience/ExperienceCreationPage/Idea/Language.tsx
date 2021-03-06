import { TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { getExperienceById } from "api/experiences";
import * as React from "react";
import { useParams } from "react-router-dom";

interface Props {
  stepProps: any;
}

const Language: React.FC<Props> = ({ stepProps }) => {
  const { setIsValid, setStepValue } = stepProps;
  const { id } = useParams<{ id: string }>();

  const options = ["Tiếng Việt", "English"];
  const [language, setLanguage] = React.useState<string | null>("");
  const [inputValue, setInputValue] = React.useState("");

  React.useEffect(() => {
    fetchData(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const fetchData = async (id: string) => {
    const { data } = await getExperienceById(id, ["language"]);
    if (data) {
      const { language } = data.experience;
      setLanguage(language);
      setIsValid(true);
    }
  };

  return (
    <div className="max-w-xl mx-auto">
      <h1 className="text-4xl font-bold">
        Ngôn ngữ chính sẽ được sử dụng trong buổi trải nghiệm
      </h1>
      <p className="mt-4 mb-4 text-gray-500">
        Bạn nên có thể lưu loát trong việc nói, đọc, viết với ngôn ngữ này.
      </p>
      <Autocomplete
        className="w-full focus:border-none hover:border-none"
        value={language}
        onChange={(event: any, newValue: string | null) => {
          setLanguage(newValue);
          if (newValue) {
            setIsValid(true);
            setStepValue({ language: newValue });
          }
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
          setIsValid(false);
        }}
        options={options}
        style={{ width: 300 }}
        renderInput={(params) => (
          <TextField
            className="hover:border-none hover:outline-none focus:border-none focus:outline-none"
            placeholder="Chọn ngôn ngữ"
            {...params}
            variant="outlined"
          />
        )}
      />
    </div>
  );
};

export default Language;
