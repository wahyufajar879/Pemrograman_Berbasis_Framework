import React, { useEffect, useState } from "react";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";


function Login() {
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  useEffect(() => {
    if (localStorage.getItem("user-info")) {
      navigate("/add");
    }
  }, []);
  const navigate = useNavigate();

  async function login(){
    console.warn(email, password)
    let item = {email,password};
    let result = await fetch("http://127.0.0.1:8000/api/login",{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
        "Accept":"application/json"
      },

      body:JSON.stringify(item)
    
    });
    result = await result.json();
    localStorage.setItem("user-info", JSON.stringify(result))
    navigate('/')
  }
  return (
    
    <div> 
      <Header />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "250px",
        }}
      >

      </div>
      <h1>Login</h1>
      <br />
      <div className="col-sm-6 offset-sm-3">
        <input
          type="text"
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
          className="form-control"
        />
        <br />
        <input
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
          className="form-control"
        />
        <br />
        <br />
        <Button onClick={login} variant="primary">Login</Button>
      </div>
      
    </div>
    
  );
}

export default Login;
