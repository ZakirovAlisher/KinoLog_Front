import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import {useCookies} from 'react-cookie';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,Redirect,
  useRouteMatch,HashRouter,
  useParams
} from "react-router-dom";
import $ from 'jquery';
import Popper from 'popper.js';
import Schedule from './Schedule';
import Login from './Login';
import Register from './Register';
import Profile from './Profile';
import Admin from './Admin';

import Mcrud from './Mcrud';
import Scrud from './Scrud';
import Ucrud from './Ucrud';
import Addmovie from './Addmovie';
import EditMovie from './EditMovie';
import ScheduleDetails from './ScheduleDetails';
import Addschedule from './Addschedule';
import EditSchedule from './EditSchedule';
import Adduser from './Adduser';
import EditUser from './Edituser';
import Test from './test';
import EditCat from './EditCat';
import Addcat from './Addcat';
import Categcrud from './Categcrud';
import AddHall from './AddHall';
import Hcrud from './Hcrud';
import EditHall from './EditHall';
import CheckQr from './CheckQr';
import { GlobalStyles } from "./globalStyles";
import { ThemeProvider} from "styled-components"


import { lightTheme, darkTheme } from "./Themes";
function Navbar(props){

  const [cookieJWT, setCookieJWT, removeCookieJWT] = useCookies(['jwt']);

  const [reload, setReload] = useState(0);
  const [success, setSuccess] = useState(false);

  function handleRemoveCookie() {
    removeCookieJWT("jwt");
    setSuccess(false);
     setReload(Math.random());
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

    for(let i=0; i<profData.roles?.length; i++){
    if (profData.roles[i]?.role == "ROLE_ADMIN"){
    console.log(profData.roles[i].role);
    setSuccess(true);
    break;
  }
    }
  }
 
  let profile_btn;
  let logout_btn;
  let reg_btn;
if(cookieJWT['jwt'] != null){
loadData();

profile_btn =   <Link to = "/profile" id="navbtn" className="nav-link  btn-sm btn-primary mx-1 shadow">
Profile
</Link>;
 logout_btn = <a href="/" className="nav-link  btn-sm btn-secondary mx-1 shadow" onClick={handleRemoveCookie}>Logout</a>;


}else{
  reg_btn =   <Link to = "/register" id="navbtn" className="nav-link btn-sm btn-primary mx-1 shadow">
  Register


  </Link>;
    profile_btn =     <Link to = "/login" id="navbtn" className="nav-link btn-sm btn-primary mx-1 shadow">
    Login
    
  </Link>
}


 let button;
 
    if (success) {
      button =   <Link to = "/admin" id="navbtn" className="nav-link mx-1 btn-sm btn-info shadow">
      Admin panel
      

  </Link>;
    } 
    
    

  return (
      <div>
        
          <nav className="navbar navbar-expand-lg  " style = {{}}><div className="container">
              <Link to = '/' className="nav-brand mr-4 " style = {{color: 'white', textDecoration:"none"}}>
                 <b><h3 className="text-shadow-lg">KinoLog</h3></b>
              </Link>
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                  <ul className="navbar-nav mr-auto">
                     
                      <li className="nav-item">
                      <Link to  = "/schedule" className="nav-link" style = {{color: 'white'}}>
                              Schedule
                          </Link>
                      </li>
                     
                     
                  </ul> <ul className="navbar-nav  ">
                  <li className="nav-item">
                          
                          {props.props}

                       </li>
                  <li className="nav-item">
                          
                          {button}
                       </li>
                  <li className="nav-item">
                        {reg_btn}
                      </li>
                      <li className="nav-item">
                          {profile_btn}
                      </li>
                     
                      <li className="nav-item">
                          
                        {logout_btn}
                       </li> </ul>
              </div></div>
          </nav>
      </div>
  );
  
}
function Footer(){

  return (
  
  <footer className="border-top footer    text-center text-lg-start">
        <div className="container p-4">
          <div className="row">
            <div className="col-lg-6 col-md-12 mb-4 mb-md-0">
              <h5 className="text-uppercase">KinoLog.com</h5>
              <p>
              KinoLog is a free website to reserve tickets in our cinema network. Kinolog is the best online ticket manager.               </p>
            </div>
            <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
              <h5 className="text-uppercase">Links</h5>
              <ul className="list-unstyled mb-0">
                <li>
                  <a href="#!" className="text-dark">About Us</a>
                </li>
                <li>
                  <a href="#!" className="text-dark">Vkontakte</a>
                </li>
                <li>
                  <a href="#!" className="text-dark">Mail.ru</a>
                </li>
                <li>
                  <a href="#!" className="text-dark">Twitter</a>
                </li>
              </ul>
            </div>
            <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
              <h5 className="text-uppercase mb-0">Links</h5>
              <ul className="list-unstyled">
                <li>
                  <a href="#!" className="text-dark">Facebook</a>
                </li>
                <li>
                  <a href="#!" className="text-dark">Odnoklassniki.ru</a>
                </li>
                <li>
                  <a href="#!" className="text-dark">TikTok</a>
                </li>
                <li>
                  <a href="#!" className="text-dark">Instagram</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="text-center   p-3" id="foot" style={{}}>
          © 2020 Copyright:
          <a className="" href="">KinoLog.com</a>
        </div>
      </footer>
       
  );
  
}



function App() {

const [themeCook, setThemeCook, removeThemeCook] = useCookies(['theme']);

const [theme, setTheme] = useState( themeCook['theme'] !=null? themeCook['theme'] :'light');

const themeToggler = () => {

theme === 'light' ? tt() : td()

  console.log(theme);
  
 

}

function tt(){
  setTheme('dark')
   setThemeCook('theme', 'dark');
}
function td(){
  setTheme('light')
   setThemeCook('theme', 'light');
}


    const [cookieJWT, setCookieJWT, removeCookieJWT] = useCookies(['jwt']);
    

    const [successAdm, setSuccessAdm] = useState(false);
  
     

 
async function loadData(){
      const bearer = "Bearer "+cookieJWT['jwt'].jwtToken;
  
      const response = await fetch("http://localhost:8000/api/profile", {
          method:'GET',
          headers: {
            "Content-Type": "application/json",
            "Authorization": bearer
          }
      });
  
      let profData = await response.json();
  
      for(let i=0; i<profData.roles?.length; i++){
      if (profData.roles[i]?.role == "ROLE_ADMIN"){
      console.log(profData.roles[i].role);
      setSuccessAdm(true);
      break;
    }
      }
    
    }
  

    if(cookieJWT['jwt'] != null){
      loadData();
    }
 

    useEffect(() => { 
      if(cookieJWT['jwt'] != null){
      loadData();
      }
       
    }, [cookieJWT]);


  return (
   <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
     <>

<GlobalStyles/>
    <div className = "">
      <Router>
      
        <Navbar props={
          theme == 'light' ? <img onClick={themeToggler} src=" https://torrents-igruha.org/templates/gamestorgreen/images/sunny.png" className="mr-2" /> : <img className="mr-2"  onClick={themeToggler} src="https://torrents-igruha.org/templates/gamestorgreen/images/moon.png"  />
        
        
        }/>
        <Switch>
                <Route path = "/schedule">
                <Schedule/>
                </Route>
              
                <Route path = {`/scheduledetails/:itemId`}>
                <ScheduleDetails/>
                </Route>
                <Route path = "/login">
                <Login/>
                </Route>
                <Route path = "/register">
                <Register/>
                </Route>
                <Route path = "/profile">
                <Profile/>

                </Route>

                <Route path = {`/checkqr/:itemId`}>
                <CheckQr/>

                </Route>


    <Route exact path="/admin" render={() => (
         successAdm ? (
           <Admin/>
          ) : (
          <Redirect to="/403"/>
                        )
                      )}/>
      
      
      


    <Route exact path="/movies_crud/:title/:page/:size" render={() => (
          successAdm ? (
            <Mcrud/>
            
          ) : (
          <Redirect to="/403"/>
                        )
                      )}/>
<Route exact path="/addmovie" render={() => (
          successAdm ? (
            <Addmovie/>
            
          ) : (
          <Redirect to="/403"/>
                        )
                      )}/>

    
    <Route exact path={`/editmovie/:itemId`} render={() => (
          successAdm ? (
            <EditMovie/>
          ) : (
          <Redirect to="/403"/>
                        )
                      )}/>
                      
    <Route exact path="/schedules_crud" render={() => (
          successAdm ? (
            <Scrud/>
          ) : (
          <Redirect to="/403"/>
                        )
                      )}/>

    <Route exact path="/addschedule" render={() => (
          successAdm ? (
            <Addschedule/>
          ) : (
          <Redirect to="/403"/>
                        )
                      )}/>
    <Route exact path={`/editschedule/:itemId`} render={() => (
          successAdm ? (
            <EditSchedule/>
          ) : (
          <Redirect to="/403"/>
                        )
                      )}/>


                      
    <Route exact path="/users_crud" render={() => (
          successAdm ? (
            <Ucrud/>
          ) : (
          <Redirect to="/403"/>
                        )
                      )}/>    

                

             
    <Route exact path="/adduser" render={() => (
          successAdm ? (
            <Adduser/>
          ) : (
          <Redirect to="/403"/>
                        )
                      )}/>
    <Route exact path={`/edituser/:itemId`} render={() => (
          successAdm ? (
            <EditUser/>
          ) : (
          <Redirect to="/403"/>
                        )
                      )}/>    

     
<Route exact path="/categories_crud" render={() => (
          successAdm ? (
            <Categcrud/>
          ) : (
          <Redirect to="/403"/>
                        )
                      )}/>    

                

             
    <Route exact path="/addcategory" render={() => (
          successAdm ? (
            <Addcat/>
          ) : (
          <Redirect to="/403"/>
                        )
                      )}/>
    <Route exact path={`/editcategory/:itemId`} render={() => (
          successAdm ? (
            <EditCat/>
          ) : (
          <Redirect to="/403"/>
                        )
                      )}/>    

<Route exact path="/halls_crud" render={() => (
          successAdm ? (
            <Hcrud/>
          ) : (
          <Redirect to="/403"/>

          )
          )}/> 
          

          <Route exact path="/addhall" render={() => (
          successAdm ? (
            <AddHall/>
          ) : (
          <Redirect to="/403"/>

          )
          )}/> 

<Route exact path={`/edithall/:itemId`} render={() => (
          successAdm ? (
            <EditHall/>
          ) : (
          <Redirect to="/403"/>

          )
          )}/> 


<Route path = "/403">
<div className="text-center mt-5 mb-5">
  <img className="mt-5 mb-5" src="https://www.seekpng.com/png/full/164-1647161_403-error.png" width="600" height="330"/>
</div>
   </Route>     
<Route path = "/">
  <Schedule/> </Route>
               


              
           

              </Switch>
        

      </Router>
      <Footer/>
    </div></></ThemeProvider>
  );
}

export default App;
