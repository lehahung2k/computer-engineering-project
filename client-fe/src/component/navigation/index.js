import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { Link } from "react-router-dom";
import './index.css';

export default function SideBar(id) {
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
      {/* <Toolbar /> */}
      {/* <Divider /> */}
      <div>
        <img src="/soict_logo.png" />
      </div>
      <Divider />
      {id==='1'?<List id='navigation-list'>
        <ListItem>
          <a href="/">
            <ListItemButton>Trang chủ</ListItemButton>
          </a>
        </ListItem>
        <ListItem>
          <a href="/search">
            <ListItemButton>Tra cứu sự kiện</ListItemButton>
          </a>
        </ListItem>
        <ListItem>
          <a href="/event">
            <ListItemButton>Quản lý sự kiện</ListItemButton>
          </a>
        </ListItem>
      </List>:
      <List id='navigation-list'>
        <ListItem>
          <a href="/">
            <ListItemButton>Trang chủ</ListItemButton>
          </a>
        </ListItem>
        <ListItem>
          <a href="/view-event">
            <ListItemButton>Xem sự kiện</ListItemButton>
          </a>
        </ListItem>
        <ListItem>
          <a href="/event-action">
            <ListItemButton>Thêm, sửa sự kiện</ListItemButton>
          </a>
        </ListItem>
      </List> }
      
      {/* <Divider /> */}
    </Drawer>
  );
}
