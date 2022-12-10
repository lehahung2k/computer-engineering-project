import {
  faCalendarDay,
  faHome,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import React from "react";
import style from "./style.module.css";

export default function PocSidebar() {
  const logout = () => {
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("role");
  };
  return (
    <>
      <List className={style.navigationList}>
        <ListItem>
          <a href="/poc" className={style.listBtn}>
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
          <a href="/poc/event" className={style.listBtn}>
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
          <a href="/check-in" className={style.listBtn}>
            <ListItemButton>
              <FontAwesomeIcon
                icon={faCalendarDay}
                className={style.iconPage}
              />
              Check-in
            </ListItemButton>
          </a>
        </ListItem>
        <ListItem>
          <a href="/" className={style.logout}>
            <ListItemButton onClick={logout}>
              <FontAwesomeIcon icon={faSignOutAlt} className="iconPage" />
              Đăng xuất
            </ListItemButton>
          </a>
        </ListItem>
      </List>
    </>
  );
}
