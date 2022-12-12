import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import axios from "axios";
import React from "react";
import AdminSidebar from "./adminSidebar";
import "./index.css";
import PocSidebar from "./pocSidebar";

const AuthorizeSidebar = () => {
  console.log(sessionStorage.getItem("role"));
  switch (sessionStorage.getItem("role")) {
    case "admin":
      return <AdminSidebar />;
    case "tenant":
      return <AdminSidebar />;
    case "poc":
      return <PocSidebar />;
    default:
      return <></>;
  }
};
export default function SideBar(id) {
  // axios
  //   .get("https://event-managment-soict2022.herokuapp.com/auth/auth")
  //   .then((response) => {
  //     id = response.data.role;
  //     console.log(response.data);
  //   });
  const logout = () => {
    sessionStorage.removeItem("accessToken");
    window.location.reload();
  };
  //console.log(id);
  return (
    <Drawer
      sx={{
        width: "250px",
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: "250px",
          boxSizing: "border-box",
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <div>
        <img src="/image/cropped_logo.png" alt="Logo iChekin" />
      </div>
      <Divider />
      {AuthorizeSidebar()}
    </Drawer>
  );
}
