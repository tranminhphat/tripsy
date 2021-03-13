import { Modal } from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";
import * as React from "react";

interface Props {
  open: boolean;
  setOpen: (bool: boolean) => void;
  children: any;
}

const MyModal: React.FC<Props> = ({ open, setOpen, children }) => {
  return (
    <Modal open={open}>
      <div className="absolute w-max max-w-lg h-72 inset-0 m-auto bg-white rounded-2xl outline-none">
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
            <h2 className="text-lg font-semibold">{children.header}</h2>
          </div>
          <div className="mt-8">{children.content}</div>
          <div className="flex justify-around mt-8">{children.footer}</div>
        </div>
      </div>
    </Modal>
  );
};

export default MyModal;
