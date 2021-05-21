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
import 'bootstrap/dist/js/bootstrap.bundle';
import {useCookies} from 'react-cookie';
import { createPortal } from 'react-dom';

function EditHall(){
  let {itemId} = useParams();
   const [cookieJWT, setCookieJWT, removeCookieJWT] = useCookies(['jwt']);
  
   const [brush, setBrush] = useState("0");
  const [data, setData] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [reload, setReload] = useState(0);
  const [places, setPlaces] = useState([]);
  const [places2, setPlaces2] = useState([]);
  const [message, setMessage] = useState();
  const [number, setNumber] = useState();
  const [preview, setPreview] = useState([]);
  const [reload2, setReload2] = useState(0);
  var ryad = {"r" : 1, "cols": 1};


  useEffect(() => {
     loadData();
     
   setDataEd();
   
 }, []);
 
 const [id, setId] = useState(0);

 async function setDataEd(data) {
  setId(itemId);
  


}

 async function loadData() {
   const bearer = "Bearer " + cookieJWT['jwt'].jwtToken;
   let response = await fetch("http://localhost:8000/api/gethall/"+itemId, {
     method:'GET',
     headers: {
       "Content-Type": "application/json",
       "Authorization": bearer
     }


   });
   let tableData = await response.json();
   setNumber(tableData.number);
   let pl = JSON.parse(tableData.places);


   let ll = ( (40-pl.length)/2); 

   for (var i = 0; i < ll; i++) {
    var B = [];
    for (var j = 0; j < 40; j++) {

      B.push('x');

  }
  if (i % 2 != 0){
  pl.unshift(B);}
  else{
    pl.push(B);
  }

  pl.push(B);

  }


  if (pl.length % 2 != 0){
    pl.pop();
  }
  pl.forEach(el=>{
   let ell = ((40 - el.length)/2);
    for (var i = 0; i < ell; i++) {
       

        el.push("x");
        el.unshift("x");
  
   
  }
   
  if (el.length % 2 != 0){
    el.pop();
  }

  })




  console.log(pl);

 
   var ryad2 = []
 

  pl.forEach(row => { 

   var ryad3 = []
   row.forEach(col => { 
     

   var p = {"row":ryad.r, "col":ryad.cols++, "val": col};
   ryad3.push(p);
  
 })
 ryad.cols = 1;
 ryad.r++;
 ryad2.push(ryad3);


  })
        setPlaces(ryad2);
      
       
       console.log(places);
      
       
      


      let firstUpper ;
      let firstLeft= {"row":-1, "col":99999, "val": "x" };
      let endRight= {"row": 999999, "col":-1, "val": "x" };
      let endDowner;
  
      ryad2.forEach(row => { 
        
        row.forEach(col => { 
        
          if(col.val != "x" && firstUpper == null){
            firstUpper = col;
          }
  
          if(col.val != "x" &&( firstLeft.col == null || firstLeft?.col > col.col) ){
            firstLeft = col;
          }
          if(col.val != "x" &&( endRight.col == null || endRight?.col < col.col) ){
            endRight = col;
          }
          if(col.val != "x")
          endDowner = col;
  
       
        })
       
       
      })
  
  
      // console.log("firstUpper " + firstUpper.row + " " + firstUpper.col);
      // console.log("firstLeft " + firstLeft.row + " " + firstLeft.col);
      // console.log("endRight " + endRight.row + " " + endRight.col);
      // console.log("endDowner " + endDowner.row + " " + endDowner.col);
  
      // console.log("Left corner " + firstUpper.row + " " + firstLeft.col);
      // console.log("Right corner " + endDowner.row + " " + endRight.col);
  
      var Pic = [];
      let r = 1;
      let c = 1;
      ryad2.forEach(row => { 
        var row_to_push = []
        row.forEach(col => { 
  
          if(col.row >= firstUpper?.row && col.row <= endDowner?.row && col.col >= firstLeft.col && col.col <= endRight.col)
            
            
            {
              console.log("EST PROBITIE")
              row_to_push.push({"row": r, "col":c++, "val": col.val });
            }
  
  
  
        })
       
  
       if(row_to_push.length>0){
        c = 1;
        r +=1;
         Pic.push(row_to_push);
       }
       
       
      })
      console.log(Pic +"PIIIIIC");
      setPreview(Pic);
       
      setReload(Math.random());

 }
  
  

    function updatePic() {
    let firstUpper ;
    let firstLeft= {"row":-1, "col":99999, "val": "x" };
    let endRight= {"row": 999999, "col":-1, "val": "x" };
    let endDowner;

    places.forEach(row => { 
      
      row.forEach(col => { 
      
        if(col.val != "x" && firstUpper == null){
          firstUpper = col;
        }

        if(col.val != "x" &&( firstLeft.col == null || firstLeft?.col > col.col) ){
          firstLeft = col;
        }
        if(col.val != "x" &&( endRight.col == null || endRight?.col < col.col) ){
          endRight = col;
        }
        if(col.val != "x")
        endDowner = col;

     
      })
     
     
    })


    // console.log("firstUpper " + firstUpper.row + " " + firstUpper.col);
    // console.log("firstLeft " + firstLeft.row + " " + firstLeft.col);
    // console.log("endRight " + endRight.row + " " + endRight.col);
    // console.log("endDowner " + endDowner.row + " " + endDowner.col);

    // console.log("Left corner " + firstUpper.row + " " + firstLeft.col);
    // console.log("Right corner " + endDowner.row + " " + endRight.col);

    var Pic = [];
    let r = 1;
    let c = 1;
    places.forEach(row => { 
      var row_to_push = []
      row.forEach(col => { 

        if(col.row >= firstUpper?.row && col.row <= endDowner?.row && col.col >= firstLeft.col && col.col <= endRight.col)
          
          
          {
            console.log("EST PROBITIE")
            row_to_push.push({"row": r, "col":c++, "val": col.val });
          }



      })
     

     if(row_to_push.length>0){
      c = 1;
      r +=1;
       Pic.push(row_to_push);
     }
     
     
    })
    console.log(Pic +"PIIIIIC");
    setPreview(Pic);
     
    setReload(Math.random());
  }
   

    function ticketRight( row,e) {
       e.preventDefault();
 

        
        if (brush == "0")
       places[row.row-1][row.col-1].val = "0";
      if (brush == "disabled")
      places[row.row-1][row.col-1].val = "disabled";

      updatePic();

    
       
      console.log(row.row + " " + row.col );
     


    }

    function removeTicket( row,e) {
      e.preventDefault();
 
       
 
    
      places[row.row-1][row.col-1].val = "x";
      updatePic();

      

   }


    function Roler(props){

        let btn = <button onClick={(e) => ticketRight(props.props, e) } className="   btn-outline-secondary seat "></button> 
     

            
           
 
          if (props.props.val == "x"){
             btn =  <button onClick={(e) => ticketRight(props.props, e) } className="  btn-outline-secondary seat"></button> 
          }

          if (props.props.val == "0") {
            btn =  <button onClick={(e) => removeTicket(props.props, e) } className="   btn-success seat"></button> 
          } 
          if (props.props.val == "disabled") {
            btn =  <button onClick={(e) => removeTicket(props.props, e) } className="   btn-secondary seat"></button> 
          } 


      return <span> 
      
     {btn}




</span>
    }
    function RolerPreview(props){

      let btn = <button  className="   btn-outline-secondary seatF">{props.props.col}</button> 
   

          
         

        if (props.props.val == "x"){
           btn =  <button  className=" invisible  btn-outline-secondary  seatF">{props.props.col}</button> 
        }

        if (props.props.val == "0") {
          btn =  <button  className="   btn-success  seatF">{props.props.col}</button> 
        } 
        if (props.props.val == "disabled") {
          btn =  <button  className="   btn-secondary  seatF">{props.props.col}</button> 
        } 


    return <span> 
   {btn}
</span>
  }

const [success, setSuccess] = useState(false);
 
  

  const handleSubmit = event =>{
    
    var hallplaces =[];

    preview.forEach(row => { 
      hallplaces[row[0].row-1] = [];
      row.forEach(col => {
        hallplaces[col.row-1][col.col-1] = col.val;
      })
    })

    var places = JSON.stringify( hallplaces);
    const inputData = {id,number, places}
    saveHall(inputData);


    event.preventDefault();

   

  }

  const handleIdChange = event =>{
    setNumber(event.target.value);
  }

  async function saveHall(data){
    const bearer = "Bearer "+cookieJWT['jwt'].jwtToken;

    const response = await fetch("http://localhost:8000/api/savehall", {
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
    console.log(data);

    let messData = await response.json();
    setMessage(messData.id? "Data Saved" : "Error");
    
}

 

async function toDeleteItem() {
  var hallplaces =[];

  preview.forEach(row => { 
    hallplaces[row[0].row-1] = [];
    row.forEach(col => {
      hallplaces[col.row-1][col.col-1] = col.val;
    })
  })

  var places = JSON.stringify( hallplaces);
  const inputData = {id, number, places}

    deleteHall(inputData);

}

async function deleteHall(data){
    const bearer = "Bearer "+cookieJWT['jwt'].jwtToken;

    const response = await fetch("http://localhost:8000/api/deletehall", {
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

 
const Clear = event =>{ 
  event.preventDefault();
  loadData();
  
 
}

if(!success){
   return (
  
    <div className = "text-center   container-fluid" style={{backgroundColor:"white"}}>





    <div className = "row">

 

<div className=" text-center col-10 " style={{ overflow:"auto", whiteSpace:"nowrap" }}>
<div className=" text-center container p-2 " style={{ overflow:"auto", whiteSpace:"nowrap" ,minHeight:"250px", position:"relative"}}>
<img src="https://www.kinopark.kz/static/img/icons/screen.svg"/>
   {preview?.map(row=>(

<div key={row[0]?.row}>
<span className=" "  style={{minWidth:"30px",position:"absolute", left:"210px"}}>  <b>  {row[0].row}</b></span>  
<span className=" "  >  </span> 

{row?.map(row2=>(

<RolerPreview key={row2.row + row2.col} props = {row2}/>



   ))}



</div>

   ))}


<h1>{message}</h1>
    </div>
    
   {places?.map(row=>(

<div key={row[0].row}>


{row?.map(row2=>(

<Roler key={row2.row + row2.col} props = {row2}/>



   ))}



</div>

   ))}



    </div>
    <div className = "col-2 pr-5 pt-5">


    <div className = " border border-info p-5 shadow" style={{color:'black',position:"relative", right:"170px", top:"260px"}}>
    

           <b> BRUSH:</b><br/>
    <button onClick={(e) => setBrush("disabled") } className="  btn btn-secondary seat">DISABLED PLACES</button> <br/>
    <button onClick={(e) => setBrush("0")  } className="  btn btn-success seat">AVAILABLE PLACES</button> 
    <br/>
    <br/> <br/> <br/> <br/>
    <button onClick={Clear } className="  btn btn-danger seat mb-3">RETURN TO INITIAL</button> 
    <div className = "form-group">
          <b> Number</b>
             <input type = "number" className = "form-control" value = {number} onChange = {handleIdChange} required/>
           </div> 
           
<button onClick={handleSubmit} className="  btn btn-info seat">SAVE HALL</button> 
<button onClick={toDeleteItem} className="  btn btn-danger seat">DELETE HALL</button> 

    </div>

</div>


    </div>




    
    
    
    
    
    
    
    
    
    </div>
 )
   
    }
    else{
      return <Redirect to="/halls_crud" />
  }




    

    

}

export default EditHall;
 

