import React, { useState } from 'react'
import axios from "axios";
import Img from "../login/Frame-1729.webp"
import "./index.css";

function Login() {
  const [username, setUsername] = useState("");
  const [passwd, setPasswd] = useState("");

  const login = () => {
    const data = { username: username, passwd: passwd };
    axios.post("http://localhost:8080/auth/login", data).then((response) => {
      console.log(response.data);
    });
  }
  return (
    <div className='body'>
      <div className='left-login'>
        <img src={Img} alt="Pessoas olhando gráficos" className="chart" />
      </div>
      <div className='right-login'>
        <div className="card-login">
          <h1>WELCOME</h1>
          <div className="login-form">
            <div className="form-group">
              <label>Username</label>
              < input
                type="text"
                onChange={
                  (event) => {setUsername(event.target.value);}
                }/>
            </div>

            <div className="form-group">
              <label>Password</label>
              <input 
                type="password"
                onChange={(event) => {
                  setPasswd(event.target.value);
                }}/>
            </div>
            <button className="button" onClick={login} >Login</button>
          </div>
        </div>
      </div>
  
    </div>
  )
}

export default Login