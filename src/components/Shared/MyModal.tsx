import { Modal } from "@material-ui/core";
import Fade from "@material-ui/core/Fade";
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
      ? "max-w-full"
      : size === "xl"
      ? "max-w-xl"
      : size === "lg"
      ? "max-w-lg"
      : "max-w-md";

  return (
    <Modal
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      open={open}
    >
      <Fade in={open}>
        <div
          className={`w-full bg-white rounded-2xl outline-none ${sizeClass}`}
        >
          <div className="mt-4 px-6">
            <div className="flex">
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
            <div className="mt-4">{children.content}</div>
            <div className="mt-8 mb-4">{children.footer}</div>
          </div>
        </div>
      </Fade>
    </Modal>
  );
};

export default MyModal;
