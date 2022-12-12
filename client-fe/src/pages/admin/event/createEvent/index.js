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

  const newEventInfo = useSelector((state) => state.eventState.event);
  const newListPoc = useSelector((state) => state.pocState.listPoc);
  const loadingCreateEvent = useSelector((state) => state.eventState.loading);
  const loadingCreateListPoc = useSelector((state) => state.pocState.loading);

  const loading = loadingCreateEvent || loadingCreateListPoc;

  const successEvent = useSelector((state) => state.eventState.success);
  const successPoc = useSelector((state) => state.pocState.success);

  const failureEvent = useSelector((state) => state.eventState.failure);
  const failurePoc = useSelector((state) => state.pocState.failure);

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
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <Dialog
        open={failureEvent}
        onClose={() => dispatch(eventResetApiState())}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Không thể tạo mới sự kiện, xin hãy thử lại
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              dispatch(eventResetApiState());
              // navigate("/admin/event");
            }}
            autoFocus
          >
            OK{" "}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={successEvent && failurePoc === true}
        onClose={() => dispatch(eventResetApiState())}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Tạo mới sự kiện thành công nhưng chưa thể tạo danh sách Poc, xin hãy
            thêm danh sách Poc sau.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              dispatch(eventResetApiState());
              navigate("/admin/event");
            }}
            autoFocus
          >
            OK{" "}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={successEvent && successPoc === true}
        onClose={() => dispatch(eventResetApiState())}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Tạo mới sự kiện thành công.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              dispatch(eventResetApiState());
              navigate("/admin/event/detail");
            }}
            autoFocus
          >
            OK{" "}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
