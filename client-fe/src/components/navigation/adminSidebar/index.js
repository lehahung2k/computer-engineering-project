import {
  faBuildingUser,
  faCalendarDay,
  faHome,
  faUsersRectangle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import React from "react";
import style from "./style.module.css";

export default function AdminSidebar() {
  return (
    <>
      <List className={style.navigationList}>
        {/* {sessionStorage.getItem("accessToken") && (
          <> */}
        <ListItem>
          <a href="/admin" className={style.listBtn}>
            <ListItemButton>
              <FontAwesomeIcon
                icon={faHome}
                className={style.iconPage}
              ></FontAwesomeIcon>
              Trang chủ
            </ListItemButton>
          </a>
        </ListItem>
        <ListItem>
          <a href="/admin/event" className={style.listBtn}>
            <ListItemButton>
              <FontAwesomeIcon
                icon={faCalendarDay}
                className={style.iconPage}
              />
              Sự kiện
            </ListItemButton>
          </a>
        </ListItem>
        <ListItem>
          <a href="/admin/company" className={style.listBtn}>
            <ListItemButton>
              <FontAwesomeIcon
                icon={faBuildingUser}
                className={style.iconPage}
              />
              Ban tổ chức
            </ListItemButton>
          </a>
        </ListItem>

        <ListItem>
          <a href="/admin/poc-account" className={style.listBtn}>
            <ListItemButton>
              <FontAwesomeIcon
                icon={faUsersRectangle}
                className={style.iconPage}
              />
              Tài khoản POC
            </ListItemButton>
          </a>
        </ListItem>
        {/* <ListItem>
              <a href="/" className="logout">
                <ListItemButton onClick={logout}><FontAwesomeIcon icon={faSignOutAlt} className="iconPage"/>Đăng xuất</ListItemButton>
              </a>
            </ListItem> */}
        {/* </>
        )} */}
      </List>
    </>
  );
}
