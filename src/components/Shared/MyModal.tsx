import { Modal } from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";
import * as React from "react";

interface Props {
  open: boolean;
  setOpen: (bool: boolean) => void;
  children: any;
  size: "full" | "xl" | "lg" | "md";
}

const MyModal: React.FC<Props> = ({ open, setOpen, children, size }) => {
  const sizeClass =
    size === "full"
      ? "max-w-full h-full"
      : size === "xl"
      ? "max-w-xl h-80"
      : size === "lg"
      ? "max-w-lg h-72"
      : "max-w-md h-60";

  return (
    <Modal open={open}>
      <div
        className={`absolute w-max inset-0 m-auto bg-white rounded-2xl outline-none ${sizeClass}`}
      >
        <div className="flex flex-col justity-center items-center py-4 px-6">
          <div className="flex justify-between">
            <button
              onClick={() => setOpen(false)}
              className="focus:outline-none mr-4"
            >
              <span>
                <ClearIcon />
              </span>
            </button>
            {children.header}
          </div>
          <div className="mt-8">{children.content}</div>
          <div className="flex justify-around mt-8">{children.footer}</div>
        </div>
      </div>
    </Modal>
  );
};

export default MyModal;
