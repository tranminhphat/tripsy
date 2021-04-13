import { Button, Fade, makeStyles, Modal, Typography } from "@material-ui/core";
import congratulation from "assets/animations/congratulation.json";
import FlagIcon from "assets/images/icons/flag.svg";
import TrophyIcon from "assets/images/icons/trophy.svg";
import LottieAnimation from "components/Shared/Lottie";
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
  const [openReward, setOpenReward] = useState(false);

  React.useEffect(() => {
    setTimeout(() => {
      if (checkpointData.currentPoints === 100) {
        setOpen(false);
        setOpenReward(true);
      }
    }, 2000);
  }, []);

  const handleClose = () => {
    onClose();
    setOpen(false);
  };

  return (
    <>
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
                className="z-10 relative mt-8 ml-20"
                src={FlagIcon}
                alt="checkpoints verification"
              />
            </div>
          </div>
          <div className="flex flex-col justity-center items-center">
            <div className="mx-auto">
              <Typography className="text-2xl font-semibold my-4">
                Chúc mừng
              </Typography>
            </div>
            <div className="max-w-lg text-center">
              <Typography>
                Bạn đã hoàn thành trải nghiệm tại chủ đề {checkpointData.theme}{" "}
                và nhận thêm 10 điểm tích lũy.
              </Typography>
            </div>
            <div className="w-full">
              <div className="flex justify-between items-center mx-16">
                <div className="w-full">
                  <MyProgressBar
                    visualParts={[
                      {
                        percentage: `${checkpointData.currentPoints}%`,
                        color: "bg-secondary-blue",
                      },
                    ]}
                  />
                </div>
                <div className="mx-4 whitespace-nowrap">
                  <Typography>{checkpointData.currentPoints} / 100</Typography>
                </div>
                <div className="ml-4">
                  <img src={TrophyIcon} alt="trophy" height={80} width={64} />
                </div>
              </div>
            </div>
            <Button
              onClick={() => handleClose()}
              className="outline-none w-32 h-12 mt-8 outline:none bg-secondary-blue text-white"
            >
              Xác nhận
            </Button>
          </div>
        </div>
      </Modal>

      <Modal open={openReward}>
        <div
          style={{ borderRadius: 4 }}
          className="relative max-w-2xl mx-auto my-16 bg-white outline-none border-none pb-4"
        >
          <div className={classes.root}>
            <div>
              <LottieAnimation
                lotti={congratulation}
                width={100}
                height={100}
              />
            </div>
          </div>
          <div className="flex flex-col justity-center items-center">
            <div className="mx-auto">
              <Typography className="text-2xl font-semibold my-4">
                Bạn đã nhận được cúp tại chủ đề {checkpointData.theme}
              </Typography>
            </div>
            <div className="max-w-lg text-center">
              <Fade in={true}>
                <img src={TrophyIcon} alt="trophy" width={200} height={100} />
              </Fade>
            </div>
            <Button
              onClick={() => setOpenReward(false)}
              className="outline-none w-32 h-12 mt-8 outline:none bg-secondary-blue text-white"
            >
              Xác nhận
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default CheckpointModal;
