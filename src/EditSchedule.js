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

function EditSchedule(){
  let {itemId} = useParams();
  const [data, setData] = useState([]);
  const [id, setId] = useState(0);
 

  async function loadData() {
    const bearer = "Bearer " + cookieJWT['jwt'].jwtToken;
    let response = await fetch("http://localhost:8000/api/allmovies2", {
      method:'GET',
      headers: {
        "Content-Type": "application/json",
        "Authorization": bearer
      }


    });
    let tableData = await response.json();
    setData(tableData);
  }

  useEffect(() => {
    loadData();  getItem(itemId);
  }, []);

  const [success, setSuccess] = useState(false);
   
  const [movie_id, setMovieId] = useState();
  const [day, setDay] = useState("");
  const [hall, setHall] = useState("");
  const [time, setTime] = useState("");
  const [finished, setFinished] = useState();
  const [price_ch, setPriceCh] = useState(0);
  const [price_st, setPriceSt] = useState(0);
  const [price_ad, setPriceAd] = useState(0);
  const [places, setPlaces] = useState("");
  const [message, setMessage] = useState("");




  const [cookieJWT, setCookieJWT, removeCookieJWT] = useCookies(['jwt']);

  
  const handleMovieChange = event =>{
    setMovieId(event.target.value);
    
  }
  const handleDayChange = event =>{
    setDay(event.target.value);
  }
  const handleHallChange = event =>{
    setHall(event.target.value);
  }
  const handleTimeChange = event =>{
    setTime(event.target.value);
  }
  const handleChChange = event =>{
    setPriceCh(event.target.value);
  }
  const handleStChange = event =>{
    setPriceSt(event.target.value);
  }
  const handleAdChange = event =>{
    setPriceAd(event.target.value);
  }
  const handleFinishedChange = event =>{
    if (finished) 
    setFinished(false);
    else
    setFinished(true);
  }

 
    const handleSubmit = event =>{
    
        const inputData = {id, movie_id, day,hall,time,finished,price_ch,price_st,price_ad,places}
        saveSchedule(inputData);
   
    
        event.preventDefault();
    
      }

    async function setDataEd(data) {
                setId(data.id);
                setMovieId(data.movie.id);
                setDay(data.day);
                setHall(data.hall);
                setTime(data.time);
                setFinished(data.finished);
                setPriceAd(data.price_ad);
                setPriceSt(data.price_st);
                setPriceCh(data.price_ch);
                setPlaces(data.places);


    }

    async function saveSchedule(data){
        const bearer = "Bearer "+cookieJWT['jwt'].jwtToken;

        const response = await fetch("http://localhost:8000/api/saveschedule", {
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

        let response = await fetch("http://localhost:8000/api/getschedule/"+itemId,  {
            method:'GET',
            headers: {
              "Content-Type": "application/json",
              "Authorization": bearer
            }
        });
        if(response.status==200){
            let data = await response.json();
            setDataEd(data);
        }else{
            setMessage("404 ITEM NOT FOUND");
        }
    }

  

    async function toDeleteItem() {
        const inputData = {id, movie_id, day,hall,time,finished,price_ch,price_st,price_ad,places}
        deleteSchedule(inputData);
   
    }

    async function deleteSchedule(data){
        const bearer = "Bearer "+cookieJWT['jwt'].jwtToken;

        const response = await fetch("http://localhost:8000/api/deleteschedule", {
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

    if (!success){
      return (
         <div style ={{paddingTop:"100px", paddingBottom:"100px"}} >
        <div className = "container">
        <h1 className="text-center"><b>Edit schedule</b></h1>
          <div className = "row" style={{color:'black'}}>
            <div className = " card shadow-lg col-6 mx-auto">
            <div className = "form-group">
            <Link to="/schedules_crud" className="btn btn-info mt-3">BACK</Link> </div>
            <h1 className="text-center">{message}</h1>
              <form onSubmit = {handleSubmit}>
    
                <div className = "form-group">
                Movie
                  <select className = "form-control" value = {movie_id} onChange = {handleMovieChange} required>
                  {data?.map(row=>(
                  <option value={row.id}>{row.title}</option>
                ))}
    
    </select>
    
                </div>
    
    
                <div className = "form-group">
                Day
                  <input type = "date" className = "form-control" value = {day} onChange = {handleDayChange} required/>
                </div>
                
                
              <div className = "form-group">
                Time
                <input  type = "time" step="1" className = "form-control" value = {time} onChange = {handleTimeChange} required/>
              </div>
              -1 if there are not that ticket tariff.
              <div className = "form-group">
              PRICE(CHILD)
                <input type = "number" className = "form-control" value = {price_ch} onChange = {handleChChange} required/>
              </div>
              <div className = "form-group">
              PRICE(STUDENT)
                <input type = "number" className = "form-control" value = {price_st} onChange = {handleStChange} required/>
              </div>
              <div className = "form-group">
              PRICE(ADULT)
                <input type = "number" className = "form-control" value = {price_ad} onChange = {handleAdChange} required/>
              </div>
             
              <div className="custom-control custom-switch mb-4 ">
  <input type="checkbox" defaultChecked={finished} onClick={handleFinishedChange} className="custom-control-input" id="customSwitches"/>
  <label className="custom-control-label" for="customSwitches">Toggle this if schedule has finished</label>
</div>

              <div className = "form-group">
                <button className = "btn btn-success">SAVE ITEM</button>
                <button type = "button" className = "btn btn-danger ml-2" onClick = {toDeleteItem}>DELETE ITEM</button>
                </div>
              </form>
            </div>
          </div>  
          <div className = "row mt-3">
            
          </div>
         </div></div>
      )}
      else{
        return <Redirect to="/schedules_crud" />
    }

    

}

export default EditSchedule;