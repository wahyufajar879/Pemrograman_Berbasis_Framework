import { useNavigate } from 'react-router-dom';
import React, {useEffect, useState} from "react";
import { Button } from "react-bootstrap";

import Header from "./Header";

function Register(){

    useEffect(()=>{
        if(localStorage.getItem('user-info')){
            navigate('/add');
        }
    }, []);

    const[name,setName]=useState("")
    const[email,setEmail]=useState("")
    const[password,setPassword]=useState("")
    const navigate= useNavigate();

    async function signUp(){
        let item={name, email, password};
        console.warn(item);
        let result = await fetch("http://127.0.0.1:8000/api/register",{
            method:'POST',
            body:JSON.stringify(item),
            headers:{
                "Content-type":'application/json',
                "Accept":'application/json'
            },
        });
        result = await result.json();
        console.warn("result",result)
        localStorage.setItem("user-info",JSON.stringify(result))
        navigate("/")

    }

    return(
        <>
        <Header/>
        <div className="col-sm-6 offset-sm-3">
            <h1>Halaman Register</h1>
            <input type="text" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="form-control" 
            placeholder="Name" />
            <br/>
            <input type="email"
            value={email} 
            onChange={(e) => setEmail(e.target.value)}
            className="form-control" 
            placeholder="Email" />
            <br/>
            <input type="password"
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
            className="form-control" 
            placeholder="Password" />
            <br/>
            {/* <Button onClick={signUp()} variant="primary" type="submit">
                Sign-Up
            </Button> */}
            <Button onClick={signUp} variant="primary">Sign-Up</Button>
        </div>
            </>
    )
}

export default Register