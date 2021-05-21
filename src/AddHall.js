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

function AddHall(){
   const [cookieJWT, setCookieJWT, removeCookieJWT] = useCookies(['jwt']);
  
   const [brush, setBrush] = useState("0");
  const [data, setData] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [reload, setReload] = useState(0);
  const [places, setPlaces] = useState([]);
  const [places2, setPlaces2] = useState([]);
  const [message, setMessage] = useState();
  const [preview, setPreview] = useState([]);
  const [number, setNumber] = useState();

  var ryad = {"r" : 1, "cols": 1};


  useEffect(() => {
    getItem();
  
  
 }, [ ]);

 const handleIdChange = event =>{
  setNumber(event.target.value);
}
  async function getItem() {
        
    var A = [];
    for (var i = 0; i < 40; i++) {
        A[i] = [];
        for (var j = 0; j < 40; j++) {
            A[i][j] = 'x';
        }
    }
 
    var ryad2 = []
 

    A.forEach(row => { 

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
        setPreview([]);
        console.log(places);

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
    console.log(Pic);
    setPreview(Pic);

  }
   

    function ticketRight( row,e) {
       e.preventDefault();
 

        
        if (brush == "0")
       places[row.row-1][row.col-1].val = "0";
      if (brush == "disabled")
      places[row.row-1][row.col-1].val = "disabled";

      updatePic();

       setReload(Math.random());
       
      console.log(row.row + " " + row.col );
     


    }

    function removeTicket( row,e) {
      e.preventDefault();
 
       
 
    
      places[row.row-1][row.col-1].val = "x";
      updatePic();

      setReload(Math.random());

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
  async function addHall(data){

    const bearer = "Bearer " + cookieJWT['jwt'].jwtToken;

    const response = await fetch("http://localhost:8000/api/addhall", {
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
  

  const handleSubmit = event =>{
    
    var hallplaces =[];

    preview.forEach(row => { 
      hallplaces[row[0].row-1] = [];
      row.forEach(col => {
        hallplaces[col.row-1][col.col-1] = col.val;
      })
    })

    console.log(hallplaces);

    const inputData = {number, hallplaces}
    addHall(inputData);

    event.preventDefault();

  }
  if(!success){
   return (
  


        <div className = "text-center   container-fluid" style={{backgroundColor:"white"}}>





         <div className = "row">

      

<div className=" text-center col-10 " style={{ overflow:"auto", whiteSpace:"nowrap" }}>
<div className=" text-center container p-2 " style={{ overflow:"auto", whiteSpace:"nowrap" ,minHeight:"250px",position:"relative"}}>
<img src="https://www.kinopark.kz/static/img/icons/screen.svg"/>
        {preview?.map(row=>(

<div key={row[0]?.row}>
<span className=" "  style={{minWidth:"30px", position:"absolute", left:"210px"}}>  <b>  {row[0].row}</b></span>  
<span className=" "  >  </span> 

{row?.map(row2=>(

<RolerPreview key={row2.row + row2.col} props = {row2}/>



        ))}

 

</div>

        ))}
 
 

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


         <div className = "border border-info p-5 shadow" style={{color:'black',position:"relative", right:"170px", top:"260px"}}>
         

                <b> BRUSH:</b><br/>
         <button onClick={(e) => setBrush("disabled") } className="  btn btn-secondary seat">DISABLED PLACES</button> <br/>
         <button onClick={(e) => setBrush("0")  } className="  btn btn-success seat">AVAILABLE PLACES</button> 
         <br/>
         <br/> <br/> <br/> <br/>
         <button onClick={(e) => getItem()  } className="  btn btn-danger seat">CLEAR ALL</button> <br/> <br/>
         <div className = "form-group">
               <b> Number</b>
                  <input type = "number" className = "form-control" value = {number} onChange = {handleIdChange} required/>
                </div> 
         <button onClick={handleSubmit} className="  btn btn-info seat">ADD HALL</button> 


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

export default AddHall;