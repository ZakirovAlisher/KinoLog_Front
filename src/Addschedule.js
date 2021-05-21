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


function Addschedule(){

  const [data, setData] = useState([]);
  const [halls, setHalls] = useState([]);
 
  async function loadHalls() {
    const bearer = "Bearer " + cookieJWT['jwt'].jwtToken;
    let response = await fetch("http://localhost:8000/api/allhalls", {
      method:'GET',
      headers: {
        "Content-Type": "application/json",
        "Authorization": bearer
      }


    });
    let tableData = await response.json();
    setHalls(tableData);
     
   
       var ryad2 = []
       JSON.parse(tableData[0].places ).forEach(row => { 
         var ryad3 = []
             row.forEach(col => { 
               
         
             var p = {"row":ryad.r, "col":ryad.cols++, "val": col, "type": 0};
             ryad3.push(p);
            
           })
           ryad.cols = 1;
           ryad.r++;
           ryad2.push(ryad3);
          
         
            })
                 ;

       setHallp(ryad2);
        
       console.log(hallp);
      
     
  }
  


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
    loadData(); loadHalls();
  
   
  }, [ ]);

  const [success, setSuccess] = useState(false);
 
  const [movie_id, setMovieId] = useState(1);
  const [day, setDay] = useState("");
  const [hall, setHall] = useState(1);
  const [hallp, setHallp] = useState([]);
  const [time, setTime] = useState("");
  const [finished, setFinished] = useState(0);
  const [price_ch, setPriceCh] = useState(0);
  const [price_st, setPriceSt] = useState(0);
  const [price_ad, setPriceAd] = useState(0);

  const [message, setMessage] = useState("");

  const [reload, setReload] = useState(0);


  const [cookieJWT, setCookieJWT, removeCookieJWT] = useCookies(['jwt']);
  var ryad = {"r" : 1, "cols": 1};

   function getHall(s) {
     halls?.forEach(element => {
       console.log(element.id);
       if (element.id == s){
        var ryad2 = []
        JSON.parse(element.places ).forEach(row => { 
          var ryad3 = []
              row.forEach(col => { 
                
          
              var p = {"row":ryad.r, "col":ryad.cols++, "val": col, "type": 0};
              ryad3.push(p);
             
            })
            ryad.cols = 1;
            ryad.r++;
            ryad2.push(ryad3);
           
          
             })
                  ;

        setHallp(ryad2);
         
        console.log(hallp);
       }
     });

  }

  
  const handleMovieChange = event =>{
    setMovieId(event.target.value);
    
  }
  const handleDayChange = event =>{
    setDay(event.target.value);
  }
  const handleHallChange = event =>{ 
    
    setHall(event.target.value);
    setReload(Math.random());
   getHall(event.target.value);
   setReload(Math.random());
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

  
  function RolerPreview(props){

    let btn = <button  className="   btn-outline-secondary seatF"></button> 
 

        
       

      if (props.props.val == "x"){
         btn =  <button  className=" invisible  btn-outline-secondary  seatF2"></button> 
      }

      if (props.props.val == "0") {
        btn =  <button  className="   btn-success  seatF2"></button> 
      } 
      if (props.props.val == "disabled") {
        btn =  <button  className="   btn-secondary  seatF2"></button> 
      } 


  return <span> 
 {btn}
</span>
}

  const handleSubmit = event =>{
    
     
    const inputData = {movie_id, day,hall,time,finished,price_ch,price_st,price_ad}
    addSchedule(inputData);

  //  setTitle("");
  //  setPic("");

    event.preventDefault();

  }
  

  async function addSchedule(data){

    const bearer = "Bearer " + cookieJWT['jwt'].jwtToken;

    const response = await fetch("http://localhost:8000/api/addschedule", {
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
    <h1 className="text-center"><b>Add schedule</b></h1>
      <div className = "row" style={{color:'black'}}>
        <div className = " card shadow-lg col-6 mx-auto">
        <div className = "form-group">
        <Link to="/schedules_crud" className="btn btn-info mt-3">BACK</Link> </div>
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
            Hall
              <select className = "form-control" value = {hall} onChange = {handleHallChange} required>
                 
              {halls?.map(row=>(
              <option value={row.id}> {row.number} hall </option>
            ))}

</select>
 
            </div>





            <div className="minw" style={{ overflow:"auto", whiteSpace:"nowrap" }} >
        {hallp.map(row=>(

<div key={row[0].row} style={{height:"16px"}} >
 

{row?.map(row2=>(

<RolerPreview key={row2.row + row2.col} props = {row2}/>



        ))}
 

</div>

        ))}
</div>











          <div className = "form-group">
            Time 
            <input type = "time" step="1"  className = "form-control" value = {time} onChange = {handleTimeChange} required/>
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

            <div className = "form-group">
              <button className = "btn btn-success float-right mb-3" >ADD SCHEDULE</button>
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

export default Addschedule;