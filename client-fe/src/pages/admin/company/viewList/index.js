import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import {
  listCompany,
  listCompanyHeadNormal,
} from "../../../../assets/fakeData";
import {
  ListBtc,
  listBtcHeadNormal,
} from "../../../../assets/fakeData/fakeBtc";
import BreadCrumbs from "../../../../components/breadCrumbs";
import Header from "../../../../components/header";
import SideBar from "../../../../components/navigation";
import NormalTable from "../../../../components/tables/normal";
import style from "./style.module.css";

const breadcrumbs = [
  { link: "/admin", label: "Trang chủ" },
  { link: "#", label: "Ban tổ chức" },
];

export default function ListCompany() {
  const [openSidebar, setOpenSidebar] = React.useState(true);
  const navigate = useNavigate();

  const handleClickAddNewCompany = () => {
    navigate("/admin/company/create");
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
          <Grid container spacing={0}>
            <div className={style.main}>
              <Grid container spacing={3}>
                <Grid item xs={4}>
                  <Typography variant="h6" align="left">
                    Danh sách ban tổ chức
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <Box display="flex" justifyContent="flex-end">
                    <Button
                      variant="contained"
                      sx={{ textTransform: "none" }}
                      onClick={() => handleClickAddNewCompany()}
                    >
                      Thêm mới
                    </Button>
                  </Box>
                </Grid>

                <Grid item xs={12}>
                  <NormalTable rows={ListBtc} headCells={listBtcHeadNormal} />
                </Grid>
              </Grid>{" "}
            </div>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
