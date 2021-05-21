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


function Addcat(){

 

  const [success, setSuccess] = useState(false);

  const [name, setName] = useState("");
  const [color, setColor] = useState("black");
   
  const [newId, setNewId] = useState(0);


  const [message, setMessage] = useState("");




  const [cookieJWT, setCookieJWT, removeCookieJWT] = useCookies(['jwt']);

  const handleNameChange = event =>{
    setName(event.target.value);
  }
  const handleColorChange = event =>{
    setColor(event.target.value);
  }
   
  const handleSubmit = event =>{
    
    const inputData = {name,color}
    addCat(inputData);
 

    event.preventDefault();

  }
  useEffect(() => {
     
  }, []);

  async function addCat(data){

    const bearer = "Bearer " + cookieJWT['jwt'].jwtToken;

    const response = await fetch("http://localhost:8000/api/addcategory", {
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
    setNewId(messageData.id);
    setSuccess(true);
  }

   
if (!success){
  return (
     <div style ={{paddingTop:"100px", paddingBottom:"100px"}} >
    <div className = "container">
    <h1 className="text-center"><b>Add category</b></h1>


      <div className = "row" style={{color:'black'}}>
        <div className = " card shadow-lg col-6 mx-auto">
        
        <div className = "form-group">
        <Link to="/categories_crud" className="btn btn-info mt-3">BACK</Link> </div>

        <div className = "text-center">
        <span style={{borderColor: color ,borderWidth:"2px", borderStyle:"solid", textAlign: "center", paddingRight:"11px", color:color}}  className="border-rounded cat   pb-1 mr-1 mb-1 pl-2"  >   {name}</span> 

        
</div>
          <form onSubmit = {handleSubmit}>
            <div className = "form-group">
            Name
              <input type = "text" className = "form-control" value = {name} onChange = {handleNameChange} required/>
            </div>
            <div className = "form-group">
            Color
              <input type = "color" className = "form-control" value = {color} onChange = {handleColorChange} required/>
            </div>
             


            <div className = "form-group">
              <button className = "btn btn-success float-right mb-3" >ADD CATEGORY</button>
            </div>
          </form>
        </div>
      </div>  
      <div className = "row mt-3">
        
      </div>
     </div></div>
  )}
  else{
    return <Redirect to="/categories_crud" />
}

}

export default Addcat;