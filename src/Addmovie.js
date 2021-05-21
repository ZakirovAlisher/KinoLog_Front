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


function Addmovie(){

 

  const [success, setSuccess] = useState(false);

  const [title, setTitle] = useState("");
  const [pic, setPic] = useState("");
  const [rating, setRating] = useState("");
  const [year, setYear] = useState("");
  const [desc, setDesc] = useState("");

  const [newId, setNewId] = useState(0);


  const [message, setMessage] = useState("");




  const [cookieJWT, setCookieJWT, removeCookieJWT] = useCookies(['jwt']);

  const handleTitleChange = event =>{
    setTitle(event.target.value);
  }
  const handlePicChange = event =>{
    setPic(event.target.value);
  }
  const handleYearChange = event =>{
    setYear(event.target.value);
  }
  const handleRatingChange = event =>{
    setRating(event.target.value);
  }
  const handleDescChange = event =>{
    setDesc(event.target.value);
  }
  const handleSubmit = event =>{
    
    const inputData = {title,desc, pic,rating,year}
    addMovie(inputData);

  //  setTitle("");
  //  setPic("");

    event.preventDefault();

  }
  useEffect(() => {
     
  }, []);

  async function addMovie(data){

    const bearer = "Bearer " + cookieJWT['jwt'].jwtToken;

    const response = await fetch("http://localhost:8000/api/addmovie", {
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
    <h1 className="text-center"><b>Add movie</b></h1>
      <div className = "row" style={{color:'black'}}>
        <div className = " card shadow-lg col-6 mx-auto">
        <div className = "form-group">
        <Link to="/movies_crud/all/0/5" className="btn btn-info mt-3">BACK</Link> </div>
          <form onSubmit = {handleSubmit}>
            <div className = "form-group">
            Title
              <input type = "text" className = "form-control" value = {title} onChange = {handleTitleChange} required/>
            </div>
            <div className = "form-group">
            Pic url
              <input type = "text" className = "form-control" value = {pic} onChange = {handlePicChange} required/>
            </div>
            <div className = "form-group">
            Description
              <textarea  className = "form-control" value = {desc} onChange = {handleDescChange} required/> 
            </div>
            <div className = "form-group">
            Rating
            <input type = "number" className = "form-control" value = {rating} onChange = {handleRatingChange} required/>
          </div>
          <div className = "form-group">
            Year
            <input type = "number" className = "form-control" value = {year} onChange = {handleYearChange} required/>
          </div>


            <div className = "form-group">
              <button className = "btn btn-success float-right mb-3" >ADD MOVIE</button>
            </div>
          </form>
        </div>
      </div>  
      <div className = "row mt-3">
        
      </div>
     </div></div>
  )}
  else{
    return <Redirect to="/movies_crud/all/0/5" />
}

}

export default Addmovie;