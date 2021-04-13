import { Button, makeStyles, Modal, Typography } from "@material-ui/core";
import FlagIcon from "assets/images/icons/flag.svg";
import MyProgressBar from "components/Shared/MyProgressBar";
import * as React from "react";
import { useState } from "react";

interface Props {
  isOpen: boolean;
  onClose: any;
  checkpointData: any;
}

const useStyles = makeStyles({
  root: {
    "&::before": {
      content: "''",
      position: "absolute",
      borderRadius: "50%",
      backgroundColor: "#ecf2f6",
      width: "170%",
      height: "200%",
      display: "block",
      left: "-35%",
      top: "-100%",
      zIndex: 0,
    },
    height: "128px",
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
});

const CheckpointModal: React.FC<Props> = ({
  isOpen,
  onClose,
  checkpointData,
}) => {
  const classes = useStyles();
  const [open, setOpen] = useState(isOpen);

  const handleClose = () => {
    onClose();
    setOpen(false);
  };

  return (
    <Modal open={open}>
      <div
        style={{ borderRadius: 4 }}
        className="relative max-w-2xl mx-auto my-16 bg-white outline-none border-none pb-4"
      >
        <div className={classes.root}>
          <div>
            <img
              height={100}
              width={100}
              className="z-10 relative mt-8 ml-16"
              src={FlagIcon}
              alt="checkpoints verification"
            />
          </div>
        </div>
        <div className="flex flex-col justity-center items-center">
          <Typography className="text-2xl font-semibold my-4">
            Chúc mừng
          </Typography>
          <Typography className="text-lg">
            Bạn đã hoàn thành trải nghiệm tại chủ đề {checkpointData.theme} và
            nhận thêm 10 điểm tích lũy.
          </Typography>
          <div className="w-full">
            <div className="mx-16">
              <MyProgressBar
                visualParts={[
                  {
                    percentage: `${checkpointData.currentPoints}%`,
                    color: "bg-secondary-blue",
                  },
                ]}
              />
            </div>
          </div>
          <Button
            onClick={() => handleClose()}
            className="outline-none w-32 h-12 mt-8 outline:none bg-secondary-blue text-white"
          >
            Đồng ý
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default CheckpointModal;
