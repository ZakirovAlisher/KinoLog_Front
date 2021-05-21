import React, { useState, useEffect, Suspense   } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
  Redirect
} from "react-router-dom";

import {useCookies} from 'react-cookie';

function EditUser(){
    const [cookieJWT, setCookieJWT, removeCookieJWT] = useCookies(['jwt']);


    let {itemId} = useParams();
  
    const [id, setId] = useState(0);

    
    const [success, setSuccess] = useState(false);

    const [fullName, setName] = useState("");
    const [email, setEmail] = useState("");
    const [avatar, setAvatar] = useState("");
    const [password, setPass] = useState("");
    
    const [roles, setRoles] = useState([]);
    
    
  
  
    const [message, setMessage] = useState("");
    const [reload, setReload] = useState(0);
    const [dataRoles, setDataRoles] = useState([]);

 


    async function loadData() {
      const bearer = "Bearer " + cookieJWT['jwt'].jwtToken;
      let response = await fetch("http://localhost:8000/api/allroles", {
        method:'GET',
        headers: {
          "Content-Type": "application/json",
          "Authorization": bearer
        }
  
  
      });
      let tableData = await response.json();
      setDataRoles(tableData);
    }
  

    useEffect(()=>{loadData();
        getItem(itemId);   
    },[reload]);

    
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
    
      const inputData = {id,fullName,email,password,avatar,roles}
        saveUserInfo(inputData);
   
    
        event.preventDefault();
    
      }
      const handleSubmitPass = event =>{
    
        const inputData = {id,fullName,email,password,avatar,roles}
          saveUser(inputData);
     
          event.preventDefault();
      
        }

       


    async function setData(data) {

    

                setId(data.id);
                setName(data.fullName);
                setAvatar(data.avatar);
                setEmail(data.email);
                setPass(data.password);
                setRoles(data.roles);
                 
    }

    async function saveUser(data){
        const bearer = "Bearer "+cookieJWT['jwt'].jwtToken;

        const response = await fetch("http://localhost:8000/api/saveuser", {
        method: "PUT",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
            "Authorization": bearer,
      
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify(data)
        });
        let messData = await response.json();
        setMessage(messData.id? "Password changed" : "Error");
         
    }

async function saveUserInfo(data){
        const bearer = "Bearer "+cookieJWT['jwt'].jwtToken;

        const response = await fetch("http://localhost:8000/api/saveuserinfo", {
        method: "PUT",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
            "Authorization": bearer,
      
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify(data)
        });
        let messData = await response.json();
        setMessage(messData.id? "Data Saved" : "Error");
         
    }
    async function getItem(itemId) {
        const bearer = "Bearer "+cookieJWT['jwt'].jwtToken;

        let response = await fetch("http://localhost:8000/api/getuser/"+itemId,  {
            method:'GET',
            headers: {
              "Content-Type": "application/json",
              "Authorization": bearer
            }
        });
        if(response.status==200){
            let data = await response.json();
            setData(data);
        }else{
            setMessage("404 ITEM NOT FOUND");
        }
    }

   
       


    async function toDeleteItem() {
      const inputData = {id,fullName,email,password,avatar,roles}
        deleteUser(inputData);
   
    }

    async function deleteUser(data){
        const bearer = "Bearer "+cookieJWT['jwt'].jwtToken;

        const response = await fetch("http://localhost:8000/api/deleteuser", {
        method: "DELETE",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
            "Authorization": bearer
            
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify(data)
        });
        let messData = await response.json();
        setMessage(messData.id? "Data Deleted" : "Error");
        setSuccess(true);
    }


    function Roler(props){


      const handleSubmitRole = event =>{
    
        let user_id = id;
        let role_id = props.props.id;
        const inputData = {user_id, role_id}
        assignRole(inputData);

    
        event.preventDefault();
    
      }

      async function assignRole(data){
        const bearer = "Bearer "+cookieJWT['jwt'].jwtToken;

        const response = await fetch("http://localhost:8000/api/assignrole", {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
            "Authorization": bearer
            
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify(data)
        });
        let messData = await response.json();
        setReload(Math.random());
    }
      const [green, setGreen] = useState(false);

        useEffect(()=>{
          isGreen(); 
            },[]);

      async function isGreen(){
        
    
          roles.forEach((element) => {
            console.log(element.role + " " + props.props.role)
           if (element.role == props.props.role ){
           
            console.log("SET GREEN")
             setGreen(true);
             
           }
    
          })
    
       
         

      }
      let className = 'row border ';
      if (green) {
        className += ' greeng ';
      }

      return <div> 
        
       
        <form   className={className} onSubmit = {handleSubmitRole}>

<div className="col-6  text-center  pt-3">
      <b>{props.props.role}</b> 
 </div>
 <div className="col-6 text-center">
      {!green ?  <button className = "btn btn-success m-2"> + </button> : <button className = "btn btn-danger m-2"> - </button>}
      </div>
  </form>
</div>
    }

    if(!success){
    return (
        <div style ={{paddingTop:"40px", paddingBottom:"100px"}} >
    <div className = "container">

    <h1 className="text-center"><b>Edit user</b></h1>
        <div className = "row" style={{color:'black'}}>
        <div className = " card shadow-lg col-6 mx-auto">
        <div className = "form-group">
          
        <Link to="/users_crud" className="btn btn-info mt-3">BACK</Link> </div>
        <div className = "text-center">
        <img src={avatar} width="300" height="300" style={{border:"3px solid darkblue"}} className="shadow"/><br/>
        <h1 className="text-center">{message}</h1>
</div>
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
                <button className = "btn btn-success">SAVE</button>
                <button type = "button" className = "btn btn-danger ml-2" onClick = {toDeleteItem}>DELETE USER</button>
                </div>
            </form> 


            <form onSubmit = {handleSubmitPass}>
             
            <div className = "form-group">
            Password
            <input type = "text" className = "form-control"  onChange = {handlePassChange} required/>
          </div>
         


              
                <div className = "form-group">
                <button className = "btn btn-success">CHANGE PASSWORD</button>
                
                </div>
            </form> 
           

           <div className="p-4 mb-5">

            <h1 className="text-center"><b>Roles</b></h1>
              {dataRoles?.map(row=>(
           
           <Roler key={row.id} props = {row}/>

          
         
   
       ))}  
 
 </div>


            </div>
          
        </div>    
        </div>  </div>
    )}
    else{
return <Redirect to="/users_crud"/>

    }

}

export default EditUser;