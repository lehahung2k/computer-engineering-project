import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { ListPocAccountHeadNormal } from "../../../assets/fakeData";
import BreadCrumbs from "../../../components/breadCrumbs";
import Header from "../../../components/header";
import SideBar from "../../../components/navigation";
import NormalTable from "../../../components/tables/normal";
import style from "./style.module.css";
import { fetchListPocAccount } from "../../../services/redux/actions/accounts/fetchListAccount";
import { useDispatch, useSelector } from "react-redux";
import CustomField from "./component/customField";

const breadcrumbs =
  sessionStorage.getItem("role") === "admin"
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
  const [openDialogActivateAccount, setOpenDialogActivateAccount] =
    React.useState(false);

  const listPocAccount = useSelector(
    (state) => state.accountState.listPocAccount
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchListPocAccount());
  }, []);

  // const handler = (field, value)=>{
  //   switch (field) {
  //     case "active":{
  //         openDialogActivateAccount(true);
  //     }
  //     default:{
  //       console.log("Default value");
  //     }
  //   }
  // }
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
                    rows={listPocAccount}
                    headCells={ListPocAccountHeadNormal}
                    customField={[
                      {
                        id: "active",
                        component(row) {
                          return (
                            <CustomField width="15%" field="active" row={row} />
                          );
                        },
                      },
                    ]}
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
