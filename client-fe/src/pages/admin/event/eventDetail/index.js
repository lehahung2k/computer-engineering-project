import * as React from "react";
import Grid from "@mui/material/Grid";
import style from "./style.module.css";
import SideBar from "../../../../components/navigation";
import Header from "../../../../components/header";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import NormalTable from "../../../../components/tables/normal";
import BreadCrumbs from "../../../../components/breadCrumbs";
import { StepButton } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import EventInfo from "./components/eventInfo";
import ListPoc from "./components/listPOC";
import ListCompany from "./components/listCompany";

const breadcrumbs = [
  { link: "/admin", label: "Trang chủ" },
  { link: "/admin/event", label: "Sự kiện" },
  { link: "#", label: "Chi tiết sự kiện" },
];

function getStepContent(step, setStep) {
  switch (step) {
    case 0:
      return <EventInfo setActiveStep={setStep} />;
    case 1:
      return <ListPoc setActiveStep={setStep} />;
    case 2:
      return <ListCompany setActiveStep={setStep} />;

    default:
      throw new Error("Unknown step");
  }
}

export default function DetailEvent() {
  const [openSidebar, setOpenSidebar] = React.useState(true);
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = React.useState(0);

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
              {getStepContent(activeStep, setActiveStep)}
            </div>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
