import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Grid from "@mui/material/Grid";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import BreadCrumbs from "../../../../components/breadCrumbs";
import Header from "../../../../components/header";
import SideBar from "../../../../components/navigation";
import { createNewEvent } from "../../../../services/redux/actions/event/createNewEvent";
import {
  resetApiState as eventResetApiState,
  resetState as eventResetState,
} from "../../../../services/redux/actions/event/event";
import { resetState as pocResetState } from "../../../../services/redux/actions/poc/poc";
import EventInfoForm from "./components/eventInfoForm";
import EventPocInfoForm from "./components/pocForm";
import style from "./style.module.css";
import {
  AlertCheckCreateEvent,
  AlertResultCreateEvent,
} from "./components/popup/alert";
import dayjs from "dayjs";

const steps = [
  "Thêm thông tin sự kiện tạo mới",
  // "Thêm doanh nghiệp tham gia",
  "Thêm thông tin POC sự kiện",
];

function getStepContent(step, key) {
  switch (step) {
    case 0:
      return <EventInfoForm key={key} />;
    // case 1:
    //   return <EventCompanyForm />;
    case 1:
      return <EventPocInfoForm key={key} />;
    case 2:
      return <>Test is done</>;
    default:
      throw new Error("Unknown step");
  }
}

export default function CreateEvent() {
  const [openSidebar, setOpenSidebar] = React.useState(true);
  const [activeStep, setActiveStep] = React.useState(0);
  const [key, setKey] = React.useState(0);
  const [openCheckCreateEventDialog, setOpenCheckCreateEventDialog] =
    React.useState(false);
  const [messageCheckCreateEvent, setMessageCheckCreateEvent] =
    React.useState("");
  const newEventInfo = useSelector((state) => state.eventState.event);
  const newListPoc = useSelector((state) => state.pocState.listPoc);

  const breadcrumbs =
    sessionStorage.getItem("role") === "admin"
      ? [
          { link: "/admin", label: "Trang chủ" },
          { link: "/admin/event", label: "Sự kiện" },
          { link: "#", label: "Thêm mới sự kiện" },
        ]
      : [
          { link: "/event-admin", label: "Trang chủ" },
          { link: "/event-admin/event", label: "Sự kiện" },
          { link: "#", label: "Thêm mới sự kiện" },
        ];

  const dispatch = useDispatch();
  const navigate = useNavigate();

  React.useEffect(() => {
    console.log("Reset state create new event");
    dispatch(eventResetState());
    dispatch(pocResetState());
    setKey((key) => key + 1);
  }, []);

  const handleCreateNewEvent = () => {
    if (!newEventInfo.eventName) {
      setOpenCheckCreateEventDialog(true);
      setMessageCheckCreateEvent("Bạn chưa nhập tên sự kiện");
      return;
    } else if (!newEventInfo.eventCode) {
      setOpenCheckCreateEventDialog(true);
      setMessageCheckCreateEvent("Bạn chưa nhập mã sự kiện");
      return;
    } else if (!newEventInfo.tenantCode) {
      setOpenCheckCreateEventDialog(true);
      setMessageCheckCreateEvent("Bạn chưa chọn ban tổ chức");
      return;
    } else if (
      newEventInfo.startTime.isSame(
        dayjs("01-01-2000 00:00:00", "DD:MM:YYYY HH:mm:ss")
      ) ||
      newEventInfo.endTime.isSame(
        dayjs("01-01-2000 00:00:00", "DD:MM:YYYY HH:mm:ss")
      )
    ) {
      setOpenCheckCreateEventDialog(true);
      setMessageCheckCreateEvent("Bạn chưa chọn thời gian cho sự kiện");
      return;
    }

    dispatch(createNewEvent(newEventInfo, newListPoc));
  };
  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleStep = (step) => {
    setActiveStep(step);
  };

  return (
    <div className={style.body}>
      <Grid container spacing={0}>
        {openSidebar ? (
          <Grid xs="auto">
            <div>
              <SideBar id="1" />
            </div>
          </Grid>
        ) : (
          <></>
        )}
        <Grid xs>
          <Header
            openSidebar={openSidebar}
            handleOpenSidebar={setOpenSidebar}
          />
          <BreadCrumbs breadcrumbs={breadcrumbs} />
          <Grid container spacing="0" id="container">
            <div className={style.main}>
              <div className={style.main__form}>
                <Stepper
                  // nonLinear
                  activeStep={activeStep}
                  sx={{ pt: 3, pb: 5 }}
                >
                  {steps.map((label, index) => (
                    <Step key={label}>
                      {/* <StepButton onClick={() => handleStep(index)}>
                        {label}
                      </StepButton> */}
                      <StepLabel>{label}</StepLabel>
                    </Step>
                  ))}
                </Stepper>
                {activeStep === steps.length ? (
                  <React.Fragment>
                    <Typography variant="h5" gutterBottom>
                      Đang tạo mới sự kiện{" "}
                    </Typography>
                    <Typography variant="subtitle1">
                      Hệ thống đang tạo mới, xin chờ trong giây lát. Khi tạo
                      xong, xin mời xem lại thông tin sự kiện tại mục xem sự
                      kiện.
                    </Typography>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    {getStepContent(activeStep, key)}
                    <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                      {activeStep !== 0 && (
                        <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                          Quay lại
                        </Button>
                      )}

                      <Button
                        variant="contained"
                        onClick={
                          activeStep === steps.length - 1
                            ? handleCreateNewEvent
                            : handleNext
                        }
                        sx={{ mt: 3, ml: 1 }}
                      >
                        {activeStep === steps.length - 1
                          ? "Thêm mới sự kiện"
                          : "Tiếp theo"}
                      </Button>
                    </Box>
                  </React.Fragment>
                )}
              </div>
            </div>
          </Grid>
        </Grid>
      </Grid>
      <AlertResultCreateEvent />
      <AlertCheckCreateEvent
        open={openCheckCreateEventDialog}
        setOpenDialog={setOpenCheckCreateEventDialog}
        message={messageCheckCreateEvent}
      />
    </div>
  );
}
