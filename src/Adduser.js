import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useRouteMatch,
  useParams
} from "react-router-dom";
import {useCookies} from 'react-cookie';


function Adduser(){

 

  const [success, setSuccess] = useState(false);

  const [fullName, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [password, setPass] = useState("");
  

  


  const [message, setMessage] = useState("");




  const [cookieJWT, setCookieJWT, removeCookieJWT] = useCookies(['jwt']);

  const handleNameChange = event =>{
    setName(event.target.value);
  }
  const handleMailChange = event =>{
    setEmail(event.target.value);
  }
  const handleAvaChange = event =>{
    setAvatar(event.target.value);
  }
  const handlePassChange = event =>{
    setPass(event.target.value);
  }

  const handleSubmit = event =>{
    
    const inputData = {fullName,email,password,avatar}
    addUser(inputData);

  //  setTitle("");
  //  setPic("");

    event.preventDefault();

  }
  

 
  async function addUser(data){

    const bearer = "Bearer " + cookieJWT['jwt'].jwtToken;

    const response = await fetch("http://localhost:8000/api/adduser", {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type" : "application/json",
        "Authorization": bearer
      },
      redirect: "follow",
      referrerPolicy: "no-referrer", 
      body: JSON.stringify(data)
    });

    let messageData = await response.json();

    setMessage(messageData.id? "Data added" + messageData : "Error!"); 
    
    setSuccess(true);
  }

   
if (!success){
  return (
     <div style ={{paddingTop:"100px", paddingBottom:"100px"}} >
    <div className = "container">
    <h1 className="text-center"><b>Add user</b></h1>
      <div className = "row" style={{color:'black'}}>
        <div className = " card shadow-lg col-6 mx-auto">
        <div className = "form-group">
        <Link to="/users_crud" className="btn btn-info mt-3">BACK</Link> </div>
          <form onSubmit = {handleSubmit}>
            <div className = "form-group">
            EMAIL
              <input type = "email" className = "form-control" value = {email} onChange = {handleMailChange} required/>
            </div>
            <div className = "form-group">
           Full name
              <input type = "text" className = "form-control" value = {fullName} onChange = {handleNameChange} required/>
            </div>
            <div className = "form-group">
            Avatar
            <input type = "text" className = "form-control" value = {avatar} onChange = {handleAvaChange} required/>
            </div>
            <div className = "form-group">
            Password
            <input type = "text" className = "form-control" value = {password} onChange = {handlePassChange} required/>
          </div>
         


            <div className = "form-group">
              <button className = "btn btn-success float-right mb-3" >ADD USER</button>
            </div>
          </form>
        </div>
      </div>  
      <div className = "row mt-3">
        
      </div>
     </div></div>
  )}
  else{
    return <Redirect to="/users_crud" />
}

}

export default Adduser;