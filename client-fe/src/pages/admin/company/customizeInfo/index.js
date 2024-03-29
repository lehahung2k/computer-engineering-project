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
import { tenantCodeGenerator } from "../../../../services/hashFunction";
import style from "./style.module.css";
import { useSelector, useDispatch } from "react-redux";
import {
  newTenantAction,
  newContactNumberTenantAction,
  newContactMailTenantAction,
  newContactNameTenantAction,
  newWebsiteTenantAction,
  newAddressTenantAction,
  newNameTenantAction,
  newPasswordTenantAction,
  newUsernameTenantAction,
  newTenantCodeAction,
} from "../../../../services/redux/actions/tenant/tenant";
import { updateTenant } from "../../../../services/redux/actions/tenant/updateTenant";

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
  const [code, setCode] = React.useState("");
  const tenantInfo = useSelector((state) => state.tenantState.tenant);
  const pinnedTenantId = useSelector(
    (state) => state.tenantState.pinnedTenantId
  );
  const dispatch = useDispatch();
  const breadcrumbs = [
    { link: "/admin", label: "Trang chủ" },
    { link: "/admin/tenant", label: "Ban tổ chức" },
    { link: "#", label: "Sửa đổi thông tin ban tổ chức" },
  ];
  const handleClickGenerateCode = () => {
    let today = new Date();
    let time = today.getTime().toString();
    const tenantCode = tenantCodeGenerator([tenantInfo.name, time]);
    console.log(tenantCode);
    dispatch(newTenantCodeAction(tenantCode));
  };

  const handleMouseDownGenerateCode = (event) => {
    event.preventDefault();
  };
  const handleEditTenantInfo = () => {
    // setOpenBackdrop(true);
    // setTimeout(setOpenBackdrop, 3000, false);
    dispatch(updateTenant(tenantInfo, pinnedTenantId));
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

              <Grid container spacing={5}>
                <Grid item xs={12}>
                  <TextField
                    required
                    id="companyName"
                    name="companyName"
                    label="Tên tổ chức"
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
                    onChange={(e) =>
                      dispatch(newNameTenantAction(e.target.value))
                    }
                    defaultValue={tenantInfo.tenantName}
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
                    onChange={(e) =>
                      dispatch(newWebsiteTenantAction(e.target.value))
                    }
                    defaultValue={tenantInfo.website}
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
                    onChange={(e) =>
                      dispatch(newAddressTenantAction(e.target.value))
                    }
                    defaultValue={tenantInfo.tenantAddress}
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
                    defaultValue={tenantInfo.tenantCode}
                    InputLabelProps={{ shrink: true }}
                    InputProps={{
                      readOnly: true,
                      startAdornment: (
                        <InputAdornment position="start">
                          <IconButton
                            aria-label="toggle password visibility"
                            // onClick={handleClickGenerateCode}
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
                    onChange={(e) =>
                      dispatch(newContactNameTenantAction(e.target.value))
                    }
                    defaultValue={tenantInfo.contactName}
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
                    onChange={(e) =>
                      dispatch(newContactMailTenantAction(e.target.value))
                    }
                    defaultValue={tenantInfo.contactEmail}
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
                    onChange={(e) =>
                      dispatch(newContactNumberTenantAction(e.target.value))
                    }
                    defaultValue={tenantInfo.contactPhone}
                  />
                </Grid>

                {/* <Grid item xs={6}>
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
                    onChange={(e) =>
                      dispatch(newUsernameTenantAction(e.target.value))
                    }
                    defaultValue={tenantInfo.username}
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
                    onChange={(e) =>
                      dispatch(newPasswordTenantAction(e.target.value))
                    }
                    defaultValue={tenantInfo.password}
                  />
                </Grid> */}

                <Grid item xs={6} align="right">
                  <Button
                    variant="contained"
                    onClick={() => handleEditTenantInfo()}
                  >
                    Sửa thông tin
                  </Button>
                </Grid>
                <Grid item xs={6} align="left">
                  <Button variant="contained">Đổi tài khoản đăng nhập</Button>
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
