import React from "react";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import Img from "../navigation/logo-soict-hust.png";
import "./index.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faEye,
  faEdit,
  faSignOutAlt,
  faListCheck,
  faSearch,
  faBuildingUser,
  faCalendarDay,
} from "@fortawesome/free-solid-svg-icons";

export default function SideBar(id) {
  axios
    .get("https://event-managment-soict2022.herokuapp.com/auth/auth")
    .then((response) => {
      id = response.data.role;
      console.log(response.data);
    });
  const logout = () => {
    sessionStorage.removeItem("accessToken");
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
      {/* {id['id'] !== "admin" ?  */}
      <List id="navigation-list">
        {/* {sessionStorage.getItem("accessToken") && (
          <> */}
        <ListItem>
          <a href="/admin" className="listBtn">
            <ListItemButton>
              <FontAwesomeIcon
                icon={faHome}
                className="iconPage"
              ></FontAwesomeIcon>
              Trang chủ
            </ListItemButton>
          </a>
        </ListItem>
        <ListItem>
          <a href="/admin/event" className="listBtn">
            <ListItemButton>
              <FontAwesomeIcon icon={faCalendarDay} className="iconPage" />
              Sự kiện
            </ListItemButton>
          </a>
        </ListItem>
        <ListItem>
          <a href="/admin/company" className="listBtn">
            <ListItemButton>
              <FontAwesomeIcon icon={faBuildingUser} className="iconPage" />
              Ban tổ chức{" "}
            </ListItemButton>
          </a>
        </ListItem>
        <ListItem></ListItem>
        {/* <ListItem>
              <a href="/" className="logout">
                <ListItemButton onClick={logout}><FontAwesomeIcon icon={faSignOutAlt} className="iconPage"/>Đăng xuất</ListItemButton>
              </a>
            </ListItem> */}
        {/* </>
        )} */}
      </List>
      {/* : <List id='navigation-list'>
          {sessionStorage.getItem("accessToken") && (
            <>
              <ListItem>
                <a href="/" className='listBtn'>
                  <ListItemButton>
                    <FontAwesomeIcon icon={faHome} className="iconPage"/>Trang chủ
                  </ListItemButton>
                </a>
              </ListItem>
              <ListItem>
                <a href="/view-event" className='listBtn'>
                  <ListItemButton>
                    <FontAwesomeIcon icon={faEye} className="iconPage"></FontAwesomeIcon>
                    Xem sự kiện
                  </ListItemButton>
                </a>
              </ListItem>
              <ListItem>
                <a href="/event-action" className='listBtn'>
                  <ListItemButton>
                    <FontAwesomeIcon icon={faEdit} className="iconPage"/>Thêm, sửa sự kiện
                  </ListItemButton>
                </a>
              </ListItem>
              <ListItem></ListItem>
              <ListItem>
                <a href="/" className="logout">
                  <ListItemButton onClick={logout}><FontAwesomeIcon icon={faSignOutAlt} className="iconPage"/>Đăng xuất</ListItemButton>
                </a>
              </ListItem>
            </>
          )}

        </List>
      } */}
    </Drawer>
  );
}
