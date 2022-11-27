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
import { useSelector, useDispatch } from "react-redux";
import {
  pinTenantId,
  newTenantAction,
} from "../../../../services/redux/actions/tenant/tenant";
const breadcrumbs = [
  { link: "/admin", label: "Trang chủ" },
  { link: "#", label: "Ban tổ chức" },
];

export default function ListCompany() {
  const [openSidebar, setOpenSidebar] = React.useState(true);
  const listTenant = useSelector((state) => state.tenantState.listTenant);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClickAddNewCompany = () => {
    navigate("/admin/company/create");
  };

  const handleClickButtonField = (field, row) => {
    if (field === "name") {
      dispatch(pinTenantId(row.id));
      const pinnedTenantInfo = listTenant.find(
        (tenant) => tenant.id === row.id
      );
      dispatch(newTenantAction(pinnedTenantInfo));
      navigate("/admin/company/detail");
    }
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
                  <NormalTable
                    rows={listTenant}
                    headCells={listBtcHeadNormal}
                    handleClickButtonField={handleClickButtonField}
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
