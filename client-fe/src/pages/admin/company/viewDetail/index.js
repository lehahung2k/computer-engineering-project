import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import * as React from "react";
import BreadCrumbs from "../../../../components/breadCrumbs";
import Header from "../../../../components/header";
import SideBar from "../../../../components/navigation";
import style from "./style.module.css";
import { useNavigate } from "react-router-dom";

const breadcrumbs = [
  { link: "/admin", label: "Trang chủ" },
  { link: "/admin/company", label: "Doanh nghiệp" },
  { link: "#", label: "Chi tiết doanh nghiệp" },
];

const company = {
  name: "Công ty TNHH A",
  address: "123 Ngụy Như Kon Tum, Thanh Xuân, Hà Nội",
  website: "www.Acompany.vn",
  contactName: "Nguyễn Văn A",
  contactMail: "abc@mail.com",
  contactNumber: "0123456789",
};

export default function DetailInfoCompany() {
  const [openSidebar, setOpenSidebar] = React.useState(true);
  const navigate = useNavigate();

  const handleCustomCompany = () => {
    navigate("/admin/company/custom");
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
              <div className={style.main__head}>
                <Typography variant="h6" align="left">
                  Thông tin doanh nghiệp
                </Typography>
              </div>

              <Grid container spacing={3}>
                <Grid item xs={2}>
                  <Typography variant="body1" align="right">
                    Tên doanh nghiệp:
                  </Typography>
                </Grid>

                <Grid item xs={10} align="left">
                  Công ty TNHH A
                </Grid>
                <Grid item xs={2}>
                  <Typography variant="body1" align="right">
                    Website:
                  </Typography>
                </Grid>
                <Grid item xs={10} align="left">
                  www.Acompany.vn
                </Grid>

                <Grid item xs={2}>
                  <Typography variant="body1" align="right">
                    Địa chỉ:
                  </Typography>
                </Grid>
                <Grid item xs={10} align="left">
                  123, Ngụy Như Kon Tum, Thanh Xuân, Hà Nội
                </Grid>

                <Grid item xs={2}>
                  <Typography variant="body1" align="right">
                    Người đại diện liên hệ:
                  </Typography>
                </Grid>

                <Grid item xs={2} align="left">
                  Nguyễn Văn A
                </Grid>
                <Grid item xs={2}>
                  <Typography variant="body1" align="right">
                    Số điện thoại:
                  </Typography>
                </Grid>
                <Grid item xs={2} align="left">
                  0123456789
                </Grid>

                <Grid item xs={2}>
                  <Typography variant="body1" align="right">
                    Email:
                  </Typography>
                </Grid>
                <Grid item xs={2} align="left">
                  abc@mail.com{" "}
                </Grid>

                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    onClick={() => handleCustomCompany()}
                  >
                    Sửa thông tin
                  </Button>
                </Grid>
              </Grid>
            </div>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
