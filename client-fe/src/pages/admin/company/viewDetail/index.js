import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import * as React from "react";
import BreadCrumbs from "../../../../components/breadCrumbs";
import Header from "../../../../components/header";
import SideBar from "../../../../components/navigation";
import style from "./style.module.css";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const breadcrumbs =
  sessionStorage.getItem("role") === "0"
    ? [
        { link: "/admin", label: "Trang chủ" },
        { link: "/admin/tenant", label: "Ban tổ chức" },
        { link: "#", label: "Chi tiết ban tổ chức" },
      ]
    : [
        { link: "/event-admin", label: "Trang chủ" },
        { link: "#", label: "Thông tin ban tổ chức" },
      ];

export default function DetailInfoCompany() {
  const [openSidebar, setOpenSidebar] = React.useState(true);
  const tenantInfo = useSelector((state) => state.tenantState.tenant);
  const tenantAccount = useSelector((state) => state.tenantState.tenantAccount);

  const navigate = useNavigate();

  const handleCustomCompany = () => {
    navigate("/admin/tenant/custom");
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
                  Thông tin tổ chức
                </Typography>
              </div>

              <Grid container spacing={3}>
                <Grid item xs={2}>
                  <Typography variant="body1" align="right">
                    Tên doanh nghiệp:
                  </Typography>
                </Grid>

                <Grid item xs={10} align="left">
                  {tenantInfo.tenantName}
                </Grid>
                <Grid item xs={2}>
                  <Typography variant="body1" align="right">
                    Website:
                  </Typography>
                </Grid>
                <Grid item xs={10} align="left">
                  <a
                    href={"https://" + tenantInfo.website}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {tenantInfo.website}
                  </a>
                </Grid>

                <Grid item xs={2}>
                  <Typography variant="body1" align="right">
                    Địa chỉ:
                  </Typography>
                </Grid>
                <Grid item xs={10} align="left">
                  {tenantInfo.tenantAddress}
                </Grid>

                <Grid item xs={2}>
                  <Typography variant="body1" align="right">
                    Người đại diện liên hệ:
                  </Typography>
                </Grid>

                <Grid item xs={4} align="left">
                  {tenantInfo.contactName}
                </Grid>

                <Grid item xs={2}>
                  <Typography variant="body1" align="right">
                    Số điện thoại:
                  </Typography>
                </Grid>
                <Grid item xs={4} align="left">
                  {tenantInfo.contactPhone}
                </Grid>

                <Grid item xs={2}>
                  <Typography variant="body1" align="right">
                    Email:
                  </Typography>
                </Grid>
                <Grid item xs={4} align="left">
                  {tenantInfo.contactEmail}
                </Grid>
                <Grid item xs={2}>
                  <Typography variant="body1" align="right">
                    Tenant code:
                  </Typography>
                </Grid>

                <Grid item xs={4} align="left">
                  {tenantInfo.tenantCode}
                </Grid>

                <Grid item xs={2}>
                  <Typography variant="body1" align="right">
                    Tài khoản đăng nhập:
                  </Typography>
                </Grid>

                <Grid item xs={4} align="left">
                  {tenantAccount.username
                    ? "Đã tạo tài khoản"
                    : "Chưa có tài khoản đăng nhập"}
                </Grid>

                {sessionStorage.getItem("role") === "0" ? (
                  <Grid item xs={12}>
                    <Button
                      variant="contained"
                      onClick={() => handleCustomCompany()}
                    >
                      Sửa thông tin
                    </Button>
                  </Grid>
                ) : (
                  <></>
                )}
              </Grid>
            </div>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
