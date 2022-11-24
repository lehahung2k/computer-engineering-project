import {
  faBuildingUser,
  faCalendarDay,
  faHome,
  faUsersRectangle,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import React from "react";
import style from "./style.module.css";

export default function AdminSidebar() {
  const logout = () => {
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("role");
  };
  return (
    <>
      <List className={style.navigationList}>
        {/* {sessionStorage.getItem("accessToken") && (
          <> */}
        <ListItem>
          <a
            href={
              sessionStorage.getItem("role") === 0 ? "/admin" : "/event-admin"
            }
            className={style.listBtn}
          >
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
          <a
            href={
              sessionStorage.getItem("role") === 0
                ? "/admin/event"
                : "/event-admin/event"
            }
            className={style.listBtn}
          >
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
          <a
            href={
              sessionStorage.getItem("role") === 0
                ? "/admin/company"
                : "/event-admin/detail-info"
            }
            className={style.listBtn}
          >
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
          <a
            href={
              sessionStorage.getItem("role") === 0
                ? "/admin/poc-account"
                : "/event-admin/poc-account"
            }
            className={style.listBtn}
          >
            <ListItemButton>
              <FontAwesomeIcon
                icon={faUsersRectangle}
                className={style.iconPage}
              />
              Tài khoản POC
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
        {/* </>
        )} */}
      </List>
    </>
  );
}
