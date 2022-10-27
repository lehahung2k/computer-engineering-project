import React from "react";
import style from './style.module.css';
import Button from "@mui/material/Button";
import { styled } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";

const ColorButton = styled(Button)({
    backgroundColor: '#4BB3EE',
    margin: '10px'
})

export default function Header() {
  const navigate = useNavigate();

  return (
    <div className={style.header}>
      <h3></h3>
      {!sessionStorage.getItem("accessToken") && (
          <div>
            <ColorButton variant='contained' onClick={()=>navigate('/login')}>
              Đăng nhập
            </ColorButton>
            <ColorButton variant='contained' onClick={()=>navigate('/register')}>
              Đăng ký
            </ColorButton>
          </div>
      )}
    </div>
  );
}
