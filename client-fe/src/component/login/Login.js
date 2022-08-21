import React, { useState } from 'react'
import axios from "axios";

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
    <div>
      <input 
        type="text" 
        onChange={(event) => {
          setUsername(event.target.value);
        }}/>

      <input 
        type="password"
        onChange={(event) => {
          setPasswd(event.target.value);
        }}/>

      <button onClick={login} >Login</button>
    </div>
  )
}

export default Login