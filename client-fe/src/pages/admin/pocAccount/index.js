import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import {
  ListPocAccount,
  ListPocAccountHeadNormal,
} from "../../../assets/fakeData";
import BreadCrumbs from "../../../components/breadCrumbs";
import Header from "../../../components/header";
import SideBar from "../../../components/navigation";
import NormalTable from "../../../components/tables/normal";
import style from "./style.module.css";

const breadcrumbs =
  sessionStorage.getItem("role") === 0
    ? [
        { link: "/admin", label: "Trang chủ" },
        { link: "#", label: "Tài khoản POC" },
      ]
    : [
        { link: "/event-admin", label: "Trang chủ" },
        { link: "#", label: "Tài khoản POC" },
      ];

export default function PocAccount() {
  const [openSidebar, setOpenSidebar] = React.useState(true);
  const navigate = useNavigate();

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
          <Grid container spacing={0}>
            <div className={style.main}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Typography variant="h6" align="left">
                    Danh sách tài khoản
                  </Typography>
                </Grid>

                <Grid item xs={12}>
                  <NormalTable
                    rows={ListPocAccount}
                    headCells={ListPocAccountHeadNormal}
                  />
                </Grid>
              </Grid>{" "}
            </div>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
