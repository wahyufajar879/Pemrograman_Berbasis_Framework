import React, { useEffect, useState } from "react";
import Header from "./Header";
import { useNavigate } from 'react-router-dom';

function Protected(props) {
    
    let Cmp=props.Cmp;
    useEffect(()=>{
        if(!localStorage.getItem('user-info')){
            navigate('/register');
        }
    }, []);
    const navigate= useNavigate();

    return (
        <div>
            <Cmp/>
        </div>
    )
}

export default Protected