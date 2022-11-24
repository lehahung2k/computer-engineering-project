import Grid from "@mui/material/Grid";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import BreadCrumbs from "../../../../components/breadCrumbs";
import Header from "../../../../components/header";
import SideBar from "../../../../components/navigation";
import EventInfo from "./components/eventInfo";
import ListCompany from "./components/listCompany";
import ListPoc from "./components/listPOC";
import style from "./style.module.css";

const breadcrumbs =
  sessionStorage.getItem("role") === 0
    ? [
        { link: "/admin", label: "Trang chủ" },
        { link: "/admin/event", label: "Sự kiện" },
        { link: "#", label: "Chi tiết sự kiện" },
      ]
    : [
        { link: "/event-admin", label: "Trang chủ" },
        { link: "/event-admin/event", label: "Sự kiện" },
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
