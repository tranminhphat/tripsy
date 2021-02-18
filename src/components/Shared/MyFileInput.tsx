import * as React from "react";
import { FileReaderResultType } from "types";

interface Props {
  handleSetImage: (image: FileReaderResultType) => void;
}

export const MyFileInput: React.FC<Props> = ({ handleSetImage }) => {
  const [fileInputState] = React.useState("");
  const [
    previewSource,
    setPreviewSource,
  ] = React.useState<FileReaderResultType>(null);

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    previewFile(file);
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
      handleSetImage(reader.result);
    };
  };

  return (
    <>
      <div className="flex items-center justify-center bg-grey-lighter mt-4">
        <label className="w-64 flex flex-col items-center px-4 py-6 rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer bg-main-blue text-white opacity-60 hover:opacity-100 transition ease-in-out duration-500">
          <svg
            className="w-8 h-8"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
          </svg>
          <span className="mt-2 text-base leading-normal">Select a file</span>
          <input
            type="file"
            onChange={handleFileInputChange}
            value={fileInputState}
            className="hidden"
          />
        </label>
      </div>
      <div className="mt-4 grid">
        {previewSource && typeof previewSource === "string" && (
          <>
            <label className="text-xs mb-2 uppercase text-gray-300">
              Xem trước:
            </label>
            <img
              src={previewSource}
              alt="chosen"
              className="h-32 w-32 mt-2 justify-self-center rounded-full"
            />
          </>
        )}
      </div>
    </>
  );
};
