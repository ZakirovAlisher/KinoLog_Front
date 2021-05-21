import React, { useState, useEffect } from 'react';
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

function EditCat(){
    const [cookieJWT, setCookieJWT, removeCookieJWT] = useCookies(['jwt']);


    let {itemId} = useParams();
  
    const [id, setId] = useState(0);

    const [success, setSuccess] = useState(false);

  const [name, setName] = useState("");
  const [color, setColor] = useState();
   
  const [newId, setNewId] = useState(0);


  const [message, setMessage] = useState("");




  const handleNameChange = event =>{
    setName(event.target.value);
  }
  const handleColorChange = event =>{
    setColor(event.target.value);
  }

    


    useEffect(()=>{
        getItem(itemId);
    },[]);

    
     
 
    const handleSubmit = event =>{
    
        const inputData = {id, name, color}
        saveCat(inputData);
   
    
        event.preventDefault();
    
      }

    async function setData(data) {
                setId(data.id);
                setColor(data.color);
                setName(data.name);
    }

    async function saveCat(data){
        const bearer = "Bearer "+cookieJWT['jwt'].jwtToken;

        const response = await fetch("http://localhost:8000/api/savecategory", {
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

        let response = await fetch("http://localhost:8000/api/getcategory/"+itemId,  {
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
        const inputData = {id, name, color}
        deleteCat(inputData);
   
    }

    async function deleteCat(data){
        const bearer = "Bearer "+cookieJWT['jwt'].jwtToken;

        const response = await fetch("http://localhost:8000/api/deletecategory", {
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

    if(!success){
    return (
        <div style ={{paddingTop:"40px", paddingBottom:"100px"}} >
    <div className = "container">

    <h1 className="text-center"><b>Edit category</b></h1>
        <div className = "row" style={{color:'black'}}>
        <div className = " card shadow-lg col-6 mx-auto">
        <div className = "form-group">
        <Link to="/categories_crud" className="btn btn-info mt-3">BACK</Link> </div>
        <div className = "text-center">
        <span style={{borderColor: color ,borderWidth:"2px", borderStyle:"solid", textAlign: "center", paddingRight:"11px", color:color}}  className="border-rounded cat   pb-1 mr-1 mb-1 pl-2"  >   {name}</span> 

        <h1 className="text-center">{message}</h1>
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
                <button className = "btn btn-success">SAVE ITEM</button>
                <button type = "button" className = "btn btn-danger ml-2" onClick = {toDeleteItem}>DELETE ITEM</button>
                </div>
            </form> 
            </div>
          
        </div>    
        </div>  </div>
    )}
    else{
      return <Redirect to="/categories_crud" />

    }

}

export default EditCat;