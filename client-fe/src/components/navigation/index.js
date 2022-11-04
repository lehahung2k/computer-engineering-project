import React from 'react'
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import Img from "../navigation/logo-soict-hust.png"
import './index.css';
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faEye, faEdit, faSignOutAlt, faListCheck, faSearch } from '@fortawesome/free-solid-svg-icons'

export default function SideBar(id) {
  axios.get("https://event-managment-soict2022.herokuapp.com/auth/auth").then((response) => {
    id = response.data.role
    console.log(response.data);
  })
  const logout = () => {
    sessionStorage.removeItem("accessToken");
  }
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
      {id['id'] !== "admin" ? <List id='navigation-list'>
        {sessionStorage.getItem("accessToken") && (
          <>
            <ListItem>
              <a href="/home" className='listBtn'>
                <ListItemButton>
                  <FontAwesomeIcon icon={faHome} className="iconPage"></FontAwesomeIcon>
                  Trang chủ
                </ListItemButton>
              </a>
            </ListItem>
            <ListItem>
              <a href="/search" className='listBtn'>
                <ListItemButton><FontAwesomeIcon icon={faSearch} className="iconPage"/>Tra cứu sự kiện</ListItemButton>
              </a>
            </ListItem>
            <ListItem>
              <a href="/event" className='listBtn'>
                <ListItemButton><FontAwesomeIcon icon={faListCheck} className="iconPage"/>Quản lý sự kiện</ListItemButton>
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
      </List> : <List id='navigation-list'>
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
      }

    </Drawer>
  );
}
