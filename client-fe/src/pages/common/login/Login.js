import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Img from "../login/Frame-1729.webp"
import "./index.css"
import authApi from '../../api/AuthApi';
import axios from "axios";
import "./index.css";

function Login() {
  const [username, setUsername] = useState("");
  const [passwd, setPasswd] = useState("");

  const navigate = useNavigate();

  const login = () => {
    const data = { username: username, passwd: passwd };
    authApi.loginApi(data)
      .then((response) => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          sessionStorage.setItem("accessToken", response.data.accessToken);
          sessionStorage.setItem("role", response.data.userRole);
          navigate("/");
        }
      });
  }
  return (
    <div className='body'>
      <div className='left-login'>
        <h1 className='chart'>EVENT CHECK-IN MANAGEMENT</h1>
        <img src={Img} alt="Logo web" className="chart" />
        <div className="center"></div>
      </div>
      <div className='right-login'>
        <div className="card-login">
          <h1>WELCOME</h1>

            <div className="form-group">
              < input className="form-field"
                type="text" placeholder='Username'
                onChange={
                  (event) => {setUsername(event.target.value);}
                }/>
            </div>

            <div className="form-group">
              <input className="form-field"
                type="password" placeholder='Password'
                onChange={(event) => {
                  setPasswd(event.target.value);
                }}/>
            </div>
          <button className="button" onClick={login}>Login</button>
          <div className='register'> 
            If you don't have account? {<Link to="/register">Register</Link>} here
          </div>
        </div>
        <div className="center1"></div>
      </div>

    </div>
  )
}

export default Login