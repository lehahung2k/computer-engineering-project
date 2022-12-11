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
import { Link } from "react-router-dom";
export default function PocSidebar() {
  const logout = () => {
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("role");
  };
  return (
    <>
      <List className={style.navigationList}>
        <ListItem>
          <Link to="/poc" className={style.listBtn}>
            <ListItemButton>
              <FontAwesomeIcon
                icon={faHome}
                className={style.iconPage}
              ></FontAwesomeIcon>
              Trang chủ
            </ListItemButton>
          </Link>
        </ListItem>
        <ListItem>
          <Link to="/poc/event" className={style.listBtn}>
            <ListItemButton>
              <FontAwesomeIcon
                icon={faCalendarDay}
                className={style.iconPage}
              />
              Sự kiện
            </ListItemButton>
          </Link>
        </ListItem>
        <ListItem>
          <Link
            to={{
              pathname: "/check-in",
              state: { test: "test navigate state" },
            }}
            className={style.listBtn}
          >
            <ListItemButton>
              <FontAwesomeIcon
                icon={faCalendarDay}
                className={style.iconPage}
              />
              Check-in
            </ListItemButton>
          </Link>
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
