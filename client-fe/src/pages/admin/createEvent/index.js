import * as React from "react";
import Grid from "@mui/material/Grid";
import style from "./style.module.css";
import SideBar from "../../../components/navigation";
import Header from "../../../components/header";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import EventInfoForm from "./components/eventInfoForm";
import EventPocInfoForm from "./components/pocForm";
import EventCompanyForm from "./components/companyForm";

const steps = [
  "Thêm thông tin sự kiện tạo mới",
  "Thêm doanh nghiệp tham gia",
  "Thêm thông tin POC sự kiện",
];

function getStepContent(step) {
  switch (step) {
    case 0:
      return <EventInfoForm />;
    case 1:
      return <EventCompanyForm />;
    case 2:
      return <EventPocInfoForm />;
    case 3:
      return <>Test is done</>;
    default:
      throw new Error("Unknown step");
  }
}

export default function CreateEvent() {
  const [openSidebar, setOpenSidebar] = React.useState(true);
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
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
          <Grid container spacing="0" id="container">
            <div className={style.main}>
              <div className={style.main__form}>
                <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
                  {steps.map((label) => (
                    <Step key={label}>
                      <StepLabel>{label}</StepLabel>
                    </Step>
                  ))}
                </Stepper>
                {activeStep === steps.length ? (
                  <React.Fragment>
                    <Typography variant="h5" gutterBottom>
                      Thank you for your order.
                    </Typography>
                    <Typography variant="subtitle1">
                      Your order number is #2001539. We have emailed your order
                      confirmation, and will send you an update when your order
                      has shipped.
                    </Typography>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    {getStepContent(activeStep)}
                    <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                      {activeStep !== 0 && (
                        <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                          Quay lại
                        </Button>
                      )}

                      <Button
                        variant="contained"
                        onClick={handleNext}
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
    </div>
  );
}
