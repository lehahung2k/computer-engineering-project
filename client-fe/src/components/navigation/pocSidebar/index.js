import { faCalendarDay, faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import React from "react";
import style from "./style.module.css";

export default function PocSidebar() {
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
          <a href="/poc/checkin" className={style.listBtn}>
            <ListItemButton>
              <FontAwesomeIcon
                icon={faCalendarDay}
                className={style.iconPage}
              />
              Check-in
            </ListItemButton>
          </a>
        </ListItem>
      </List>
    </>
  );
}
