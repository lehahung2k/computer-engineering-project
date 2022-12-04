import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Img from "../login/Frame-1729.webp";
import "./index.css";
import authApi from "../../../api/AuthApi";
import axios from "axios";
import { FakeAccount } from "../../../assets/fakeData/fakeAccount";

function Login() {
  const [username, setUsername] = useState("");
  const [passwd, setPasswd] = useState("");

  const navigate = useNavigate();

  const login = () => {
    const data = { username: username, password: passwd };
    // authApi.loginApi(data).then((response) => {
    //   if (response.data.error) {
    //     alert(response.data.error);
    //   } else {
    // sessionStorage.setItem("accessToken", response.data.accessToken);
    // sessionStorage.setItem("role", response.data.userRole);
    //     navigate("/");
    //   }
    // });

    FakeAccount.forEach((account) => {
      if (
        account.username === data.password &&
        account.password === data.password
      ) {
        sessionStorage.setItem("accessToken", account.accessToken);
        sessionStorage.setItem("role", account.role);
        console.log(account.role === "0");
        switch (account.role) {
          case "0": {
            console.log("hello");
            return navigate("/admin");
          }
          case "1": {
            return navigate("/event-admin");
          }
          case "2": {
            return navigate("/poc");
          }
          default: {
            return navigate("/");
          }
        }
      }
    });
  };
  return (
    <div className="body">
      <div className="left-login">
        <h1 className="chart">EVENT CHECK-IN MANAGEMENT</h1>
        <img src={Img} alt="Logo web" className="chart" />
        <div className="center"></div>
      </div>
      <div className="right-login">
        <div className="card-login">
          <h1>Đăng nhập</h1>

          <div className="form-group">
            <input
              className="form-field"
              type="text"
              placeholder="Tên đăng nhập"
              onChange={(event) => {
                setUsername(event.target.value);
              }}
            />
          </div>

          <div className="form-group">
            <input
              className="form-field"
              type="password"
              placeholder="Mật khẩu"
              onChange={(event) => {
                setPasswd(event.target.value);
              }}
            />
          </div>
          <button className="button" onClick={login}>
            <div>Đăng nhập</div>
          </button>
          <div className="register">
            Nếu chưa có tài khoản, hãy {<Link to="/register">Đăng ký</Link>} tại
            đây
          </div>
        </div>
        <div className="center1"></div>
      </div>
    </div>
  );
}

export default Login;
