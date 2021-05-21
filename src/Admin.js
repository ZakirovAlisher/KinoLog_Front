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



function Admin(){
  const [cookieJWT, setCookieJWT, removeCookieJWT] = useCookies(['jwt']);
  const [ava, setAva] = useState([]);
  const [name, setFullName] = useState();
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
    
    
    setFullName(profData.fullName);
    setAva(profData.avaUrl);
//setId(profData.id);
//setRoles(profData.roles);

  }



  useEffect(() => {



    if(cookieJWT['jwt'] != null){ loadData();}
    


  }, []);
 
    return (
        <div className = "container " style={{marginBottom:110}} >
           
           <div className = "text-center mt-4 pl-2">
           <img src={ava} width="300" height="300" style={{border:"3px solid darkblue"}} className="shadow"/>
            <h1 style={{marginTop:20}} className="ml-2"><b>Hello, Admin [ <span className="text-success">{name}</span> ]</b></h1>
</div>
            <div className = "row mt-4">
              
          <Link id="mainer" to = '/movies_crud/all/0/5' className="jumbotron border border-primary shadow block" style={{ }}><div  className = " col-2 text-center"><h2><b>MOVIES CRUD </b></h2></div></Link>
          <div className = "col-1"></div>
          <Link id="mainer" to = '/schedules_crud' className="jumbotron border border-primary shadow block" style={{color:"red" , width:"320px"}}>  <div className = " col-1 text-center "><h2><b>SCHEDULES CRUD</b></h2></div></Link>
          <div className = "col-0 ml-5"></div>
          <Link id="mainer" to = '/users_crud' className="jumbotron border border-primary shadow block pr-3" style={{color:"#00b815"}}>  <div className = " col-3 text-center "><h2><b>USERS CRUD</b></h2></div></Link>
          <div className = "col-2"></div>  <Link id="mainer"to = '/categories_crud' className="jumbotron border border-primary shadow block" style={{color:"violet"}}>  <div className = " col-3 text-center "><h2><b>CATEGORIES CRUD</b></h2></div></Link>
          <div className = "col-1"></div> <Link id="mainer" to = '/halls_crud' className="jumbotron border border-primary shadow block" style={{color:"orange"}}>  <div className = " col-3 text-center "><h2><b>HALLS CRUD</b></h2></div></Link>


            </div>
        </div>
    )}
    
 

export default Admin;