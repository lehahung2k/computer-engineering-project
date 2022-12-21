import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import BreadCrumbs from "../../../../components/breadCrumbs";
import Header from "../../../../components/header";
import Iconify from "../../../../components/iconify";
import SideBar from "../../../../components/navigation";
import { tenantCodeGenerator } from "../../../../services/hashFunction";
import { createNewTenant } from "../../../../services/redux/actions/tenant/createTenant";
import {
  newAddressTenantAction,
  newContactMailTenantAction,
  newContactNameTenantAction,
  newContactNumberTenantAction,
  newNameTenantAction,
  newPasswordTenantAction,
  newTenantCodeAction,
  newUsernameTenantAction,
  newWebsiteTenantAction,
} from "../../../../services/redux/actions/tenant/tenant";
import AlertResponseCreateTenant from "./components/popup/alertResponse";
import style from "./style.module.css";
import { AlertCheckCreateTenant } from "./components/popup/alertCheckCreate";

export default function CreateNewCompany() {
  const [openSidebar, setOpenSidebar] = React.useState(true);
  const [openCheckCreateEventDialog, setOpenCheckCreateEventDialog] =
    React.useState(false);
  const [messageCheckCreateEvent, setMessageCheckCreateEvent] =
    React.useState("");
  const tenantInfo = useSelector((state) => state.tenantState.tenant);
  const tenantAccount = useSelector((state) => state.tenantState.tenantAccount);
  const breadcrumbs = [
    { link: "/admin", label: "Trang chủ" },
    { link: "/admin/tenant", label: "Ban tổ chức" },
    { link: "#", label: "Thêm ban tổ chức" },
  ];
  const dispatch = useDispatch();

  const handleClickGenerateCode = () => {
    let today = new Date();
    let time = today.getTime().toString();
    const tenantCode = tenantCodeGenerator([tenantInfo.tenantName, time]);
    console.log(tenantCode);
    dispatch(newTenantCodeAction(tenantCode));
  };

  const handleMouseDownGenerateCode = (event) => {
    event.preventDefault();
  };
  const handleCreateNewCompany = () => {
    if (
      tenantInfo.tenantName === "" ||
      tenantInfo.tenantAddress === "" ||
      tenantInfo.website === "" ||
      tenantInfo.tenantCode === ""
    ) {
      setMessageCheckCreateEvent("Thông tin tổ chức không được để trống");
      setOpenCheckCreateEventDialog(true);
      return;
    } else if (
      tenantInfo.contactName === "" ||
      tenantInfo.contactEmail === "" ||
      tenantInfo.contactPhone === ""
    ) {
      setMessageCheckCreateEvent("Thông tin liên hệ không được để trống");
      setOpenCheckCreateEventDialog(true);
      return;
    } else if (tenantAccount.username === "" || tenantAccount.password === "") {
      setMessageCheckCreateEvent("Thông tin tài khoản không được để trống");
      setOpenCheckCreateEventDialog(true);
      return;
    }
    dispatch(createNewTenant(tenantInfo, tenantAccount));
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
                    InputLabelProps={{ shrink: true }}
                    onChange={(e) =>
                      dispatch(newNameTenantAction(e.target.value))
                    }
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
                    InputLabelProps={{ shrink: true }}
                    onChange={(e) =>
                      dispatch(newWebsiteTenantAction(e.target.value))
                    }
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
                    InputLabelProps={{ shrink: true }}
                    onChange={(e) =>
                      dispatch(newAddressTenantAction(e.target.value))
                    }
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
                    value={tenantInfo.tenantCode}
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
                    InputLabelProps={{ shrink: true }}
                    onChange={(e) =>
                      dispatch(newContactNameTenantAction(e.target.value))
                    }
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
                    InputLabelProps={{ shrink: true }}
                    onChange={(e) =>
                      dispatch(newContactMailTenantAction(e.target.value))
                    }
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
                    InputLabelProps={{ shrink: true }}
                    onChange={(e) =>
                      dispatch(newContactNumberTenantAction(e.target.value))
                    }
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
                    InputLabelProps={{ shrink: true }}
                    onChange={(e) =>
                      dispatch(newUsernameTenantAction(e.target.value))
                    }
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
                    InputLabelProps={{ shrink: true }}
                    onChange={(e) =>
                      dispatch(newPasswordTenantAction(e.target.value))
                    }
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
      <AlertResponseCreateTenant />
      <AlertCheckCreateTenant
        open={openCheckCreateEventDialog}
        setOpenDialog={setOpenCheckCreateEventDialog}
        message={messageCheckCreateEvent}
      />
    </div>
  );
}
