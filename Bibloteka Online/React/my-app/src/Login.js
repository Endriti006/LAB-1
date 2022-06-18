import React, {useState, useEffect, Component} from 'react';
import {variables} from './Variables.js';
import "./App.css";
import {useHistory} from 'react-router-dom'
import logo from './Faqet/BiblotekaLogo.png';


function Login() {

  let history = useHistory();

  return(
    
    <div class="modal-content">
      <div class="imgcontainer">
        <img src={logo} class="logo"/>
        <div class="container">
      <input type="Text" name="Name" id="Name" placeholder='Emri i plote' required/><br/><br/>
      <input type="Text" name="Password" id="Password" placeholder='Password' required/><br/><br/>
      <button role="button" id="register" onClick={()=>{

      var Name = document.getElementById("Name").value;
      var Password = document.getElementById("Password").value;

      if(Name == "Art Shabani"){
        if(Password == "arti123"){
          history.push('/DashboardKrye')
        }
      }
      
      if(Name == "Ardi Osmani"){
        if(Password == "ardi123"){
          
          history.push('/DashboardStaf')
      
        }
      }

      
      if(Name == "Endrit Kryeziu"){
        if(Password == "endrit123"){
      
          history.push('/DashboardAbo')
        }
      }


      }} value="Login">Login</button>
    </div>
    </div>
    </div>
  )
  
}



export default Login;