import Grid from "@mui/material/Grid";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import BreadCrumbs from "../../../../components/breadCrumbs";
import Header from "../../../../components/header";
import SideBar from "../../../../components/navigation";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import IconButton from "@mui/material/IconButton";
import Iconify from "../../../../components/iconify";
import Button from "@mui/material/Button";
import style from "./style.module.css";

const breadcrumbs = [
  { link: "/admin", label: "Trang chủ" },
  { link: "/admin/company", label: "Doanh nghiệp" },
  { link: "#", label: "Sửa đổi thông tin doanh nghiệp" },
];

const company = {
  name: "Công ty TNHH A",
  address: "123 Ngụy Như Kon Tum, Thanh Xuân, Hà Nội",
  website: "www.Acompany.vn",
  contactName: "Nguyễn Văn A",
  contactMail: "abc@mail.com",
  contactNumber: "0123456789",
};

export default function CustomInfoCompany() {
  const [openSidebar, setOpenSidebar] = React.useState(true);
  const [openBackdrop, setOpenBackdrop] = React.useState(false);

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
                    defaultValue={company.name}
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
                    defaultValue={company.website}
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
                    defaultValue={company.address}
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
                    defaultValue={company.contactName}
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
                    defaultValue={company.contactMail}
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
                    defaultValue={company.contactNumber}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    onClick={() => handleCreateNewCompany()}
                  >
                    Sửa thông tin
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
