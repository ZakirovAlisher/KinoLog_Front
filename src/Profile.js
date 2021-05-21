import React, { useState, useEffect, useContext} from 'react';
import {useCookies} from 'react-cookie';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
  Redirect
} from "react-router-dom";



function Profile(){

    const [cookieJWT, setCookieJWT, removeCookieJWT] = useCookies(['jwt']);
    const [data, setData] = useState([]);
    const [msg, setMsg] = useState("");
    const [avaUrl, setAva] = useState("");
    const [id, setId] = useState("");
    const [email, setEmail] = useState("");
    const [fullName, setFullName] = useState("");
    const [msg2, setMsg2] = useState("");

    const [old, setOld] = useState("");
    const [neww, setNeww] = useState("");
    const [renew, setRenew] = useState("");


    const [roles, setRoles] = useState([]);

    const handleEmailChange = event =>{
        setEmail(event.target.value);
    }

    const handleNameChange = event =>{
        setFullName(event.target.value);
    }

    const handleNewChange = event =>{
        setNeww(event.target.value);
    }

    const handleOldChange = event =>{
        setOld(event.target.value);
    }

    const handleRenewChange = event =>{
        setRenew(event.target.value);
    }

    const handleAvaChange = event =>{
        setAva(event.target.value);
    }


    const handleSubmit = event =>{
        const inputData = { email,avaUrl, fullName};
         
        updProfile(inputData);

        event.preventDefault();
    }
    const handleSubmitPass = event =>{
        const inputData = { email, old, neww, renew };
         
        changePass(inputData);

        event.preventDefault();
    }

    async function updProfile(data){
         
        const bearer = "Bearer " + cookieJWT['jwt'].jwtToken;

        const response = await fetch("http://localhost:8000/api/updProfile", {
          method: "PUT",
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
      
        if(response.status==200){
            let res = await response.json();
             setMsg('Profile successfully changed');
            console.log(res);
        }
      }
   
      async function changePass(data){
         
        const bearer = "Bearer " + cookieJWT['jwt'].jwtToken;

        const response = await fetch("http://localhost:8000/api/changePass", {
          method: "PUT",
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
        console.log(JSON.stringify(data));
        
        if(response.status==200){
            let res = await response.json();
            setMsg('Password successfully changed');
            setMsg2('');
        }
        else{
            setMsg2('ERROR');
            setMsg('');
        }
      }
    async function loadData() {


        
        const bearer = "Bearer "+cookieJWT['jwt'].jwtToken;

        const response = await fetch("http://localhost:8000/api/profile", {
            method:'GET',
            headers: {
              "Content-Type": "application/json",
              "Authorization": bearer
            }
        });

        let profData = await response.json();
        
        setEmail(profData.email);
        setFullName(profData.fullName);
        setAva(profData.avaUrl);
//setId(profData.id);
//setRoles(profData.roles);

      }
    
    
    
      useEffect(() => {
    
    
    
        if(cookieJWT['jwt'] != null){ loadData();}
        
    
    
      }, []);



      if(cookieJWT['jwt'] != null){
    return (
        <div className = "container shadow pb-5 pt-2" style={{}} id="mainer">
         
           <div className = "text-center mt-4">
                <h1 style={{color:"green"}}> {msg} </h1>
                <h1 style={{color:"red"}}> {msg2} </h1>
            <img src={avaUrl} width="300" height="300" style={{border:"3px solid darkblue"}} className="shadow"/>
</div>
 
            <div className = "row mt-3">
                <div className = "col-6 mx-auto">
                    <form onSubmit = {handleSubmit}>
                        <div className = "form-group">
                            <label>
                                Email : 
                            </label>
                            <input type = "email"  readOnly  className = "form-control" value = {email} onChange = {handleEmailChange}/>
                        </div>
                        <div className = "form-group">
                            <label>
                                Full name : 
                            </label>
                            <input type = "text" className = "form-control" value = {fullName} onChange = {handleNameChange}/>
                        </div>

                        <div className = "form-group">
                            <label>
                                Avatar URL : 
                            </label>
                            <input type = "text" className = "form-control" value = {avaUrl} onChange = {handleAvaChange}/>
                        </div>
                        <div className = "form-group">
                            <button className = "btn btn-primary" >UPDATE PROFILE</button>
                        </div>
                         
                    </form>


                    <form onSubmit = {handleSubmitPass} className="mb-5">
                        <div className = "form-group">
                            <label>
                                Old password: 
                            </label>
                            <input type = "password"    className = "form-control" value = {old} onChange = {handleOldChange}/>
                        </div>
                        <div className = "form-group">
                            <label>
                                New password: 
                            </label>
                            <input type = "password" className = "form-control" value = {neww} onChange = {handleNewChange}/>
                        </div>
                        <div className = "form-group">
                            <label>
                               Re-New password: 
                            </label>
                            <input type = "password" className = "form-control" value = {renew} onChange = {handleRenewChange}/>
                        </div>

                        <div className = "form-group">
                            <button className = "btn btn-primary" >UPDATE PASSWORD</button>
                        </div>
                         
                    </form>




                </div>
            </div>
        </div>)}
        else {return <Redirect to="/login"/>}
}

export default Profile;