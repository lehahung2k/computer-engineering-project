import Backdrop from "@mui/material/Backdrop";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import * as React from "react";
import BreadCrumbs from "../../../../components/breadCrumbs";
import Header from "../../../../components/header";
import Iconify from "../../../../components/iconify";
import SideBar from "../../../../components/navigation";
import { TenantCodeGenerator } from "../../../../services/hashFunction";
import style from "./style.module.css";

const breadcrumbs = [
  { link: "/admin", label: "Trang chủ" },
  { link: "/admin/company", label: "Doanh nghiệp" },
  { link: "#", label: "Thêm doanh nghiệp" },
];

export default function CreateNewCompany() {
  const [openSidebar, setOpenSidebar] = React.useState(true);
  const [openBackdrop, setOpenBackdrop] = React.useState(false);

  const [code, setCode] = React.useState("");

  const handleClickGenerateCode = () => {
    let today = new Date();
    let time = today.getTime().toString();
    const tenantCode = TenantCodeGenerator(time);
    console.log(tenantCode);
    setCode(tenantCode);
  };

  const handleMouseDownGenerateCode = (event) => {
    event.preventDefault();
  };
  const handleCreateNewCompany = () => {
    setOpenBackdrop(true);
    setTimeout(setOpenBackdrop, 3000, false);
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

              <Grid container spacing={5}>
                <Grid item xs={12}>
                  <TextField
                    required
                    id="companyName"
                    name="companyName"
                    label="Tên doanh nghiệp"
                    fullWidth
                    autoComplete="company-name"
                    variant="standard"
                    // helperText={
                    //   name.length === 0 && checkName === 0
                    //     ? "Tên không được để trống"
                    //     : ""
                    // }
                    // onChange={(e) => setName(e.target.value)}
                    // onClick={() => setCheckName(0)}
                    // error={name.length === 0 && checkName === 0 ? true : false}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    id="companyWebsite"
                    name="companyWebsite"
                    label="Website"
                    fullWidth
                    autoComplete="company-website"
                    variant="standard"
                    // helperText={
                    //   name.length === 0 && checkName === 0
                    //     ? "Tên không được để trống"
                    //     : ""
                    // }
                    // onChange={(e) => setName(e.target.value)}
                    // onClick={() => setCheckName(0)}
                    // error={name.length === 0 && checkName === 0 ? true : false}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={8}>
                  <TextField
                    required
                    id="companyAddress"
                    name="companyAddress"
                    label="Địa chỉ"
                    fullWidth
                    autoComplete="company-address"
                    variant="standard"
                    // helperText={
                    //   name.length === 0 && checkName === 0
                    //     ? "Tên không được để trống"
                    //     : ""
                    // }
                    // onChange={(e) => setName(e.target.value)}
                    // onClick={() => setCheckName(0)}
                    // error={name.length === 0 && checkName === 0 ? true : false}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body1" align="left">
                    Thông tin liên hệ
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    id="contactName"
                    name="contactName"
                    label="Người đại diện liên hệ"
                    fullWidth
                    autoComplete="contact-name"
                    variant="standard"
                    // helperText={
                    //   name.length === 0 && checkName === 0
                    //     ? "Tên không được để trống"
                    //     : ""
                    // }
                    // onChange={(e) => setName(e.target.value)}
                    // onClick={() => setCheckName(0)}
                    // error={name.length === 0 && checkName === 0 ? true : false}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    required
                    id="contactMail"
                    name="contactMail"
                    label="Email liên hệ"
                    fullWidth
                    autoComplete="contact-mail"
                    variant="standard"
                    // helperText={
                    //   name.length === 0 && checkName === 0
                    //     ? "Tên không được để trống"
                    //     : ""
                    // }
                    // onChange={(e) => setName(e.target.value)}
                    // onClick={() => setCheckName(0)}
                    // error={name.length === 0 && checkName === 0 ? true : false}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    required
                    id="contactNumber"
                    name="contactNumber"
                    label="Số điện thoại liên hệ"
                    fullWidth
                    autoComplete="contact-number"
                    variant="standard"
                    // helperText={
                    //   name.length === 0 && checkName === 0
                    //     ? "Tên không được để trống"
                    //     : ""
                    // }
                    // onChange={(e) => setName(e.target.value)}
                    // onClick={() => setCheckName(0)}
                    // error={name.length === 0 && checkName === 0 ? true : false}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body1" align="left">
                    Tài khoản đăng nhập
                  </Typography>
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    required
                    id="username"
                    name="usernam"
                    label="Tên đăng nhập"
                    fullWidth
                    autoComplete="username"
                    variant="standard"
                    // helperText={
                    //   name.length === 0 && checkName === 0
                    //     ? "Tên không được để trống"
                    //     : ""
                    // }
                    // onChange={(e) => setName(e.target.value)}
                    // onClick={() => setCheckName(0)}
                    // error={name.length === 0 && checkName === 0 ? true : false}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    required
                    id="password"
                    name="password"
                    label="Mật khẩu"
                    fullWidth
                    autoComplete="password"
                    variant="standard"
                    // helperText={
                    //   name.length === 0 && checkName === 0
                    //     ? "Tên không được để trống"
                    //     : ""
                    // }
                    // onChange={(e) => setName(e.target.value)}
                    // onClick={() => setCheckName(0)}
                    // error={name.length === 0 && checkName === 0 ? true : false}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    id="tenantCode"
                    name="tenantCode"
                    label="Mã ban tổ chức"
                    fullWidth
                    autoComplete="tenant-code"
                    variant="standard"
                    helperText="Chọn để tạo mã ngẫu nhiên"
                    value={code}
                    InputLabelProps={{ shrink: true }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickGenerateCode}
                            onMouseDown={handleMouseDownGenerateCode}
                            edge="end"
                            sx={{ marginRight: "0" }}
                          >
                            <Iconify
                              icon={"carbon:operations-record"}
                            ></Iconify>
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    onClick={() => handleCreateNewCompany()}
                  >
                    Thêm mới
                  </Button>
                </Grid>
              </Grid>
            </div>
          </Grid>
        </Grid>
      </Grid>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openBackdrop}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}
