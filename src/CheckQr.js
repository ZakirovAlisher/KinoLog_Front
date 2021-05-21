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

function CheckQr(){
  let {itemId} = useParams();
   const [cookieJWT, setCookieJWT, removeCookieJWT] = useCookies(['jwt']);
  
   const [brush, setBrush] = useState("0");
  const [data, setData] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [reload, setReload] = useState(0);
  const [places, setPlaces] = useState([]);
  const [places2, setPlaces2] = useState([]);
  const [msgSt, setMsgst] = useState();
  const [number, setNumber] = useState();
  const [preview, setPreview] = useState([]);
  const [reload2, setReload2] = useState(0);
  var ryad = {"r" : 1, "cols": 1};
  const [t_adult, sett_adult] = useState("");
  const [t_stud, sett_stud] = useState("");
  const [t_child, sett_child] = useState("");

  useEffect(() => {
     loadData();
     
   
 }, []);
 
 const [id, setId] = useState(0);

 

 async function loadData() {
  
   let response = await fetch("http://localhost:8000/api/checkqr/"+itemId, {
     method:'GET',
     headers: {
       "Content-Type": "application/json",
       
     }


   });


   if(response.status==404){
    console.log("404");
    setMsgst("NO PLACE FOUND. Someone is trying to deceive you!!!")
  }

   let tableData = await response.json();
   setData(tableData);
   setNumber(tableData.number);
   let pl = JSON.parse(tableData.places);
   if(tableData.price_ad != -1){
    sett_adult(<span><button className="btn-warning seatF3"> </button> <u>Adult</u> - {data?.price_ch}$ <br/> </span>);
    
 }
 if(tableData.price_st != -1){
  sett_stud(<span><button className="btn-info seatF3"> </button> <u>Student</u> - {data?.price_st} $ <br/> </span>);
  
}
if(tableData.price_ch != -1){
sett_child(<span> <button className="btn-primary seatF3"> </button> <u>Child </u>- {data?.price_ad} $ <br/> </span>);

}

   

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
  
  

   





    function RolerPreview(props){

      let btn = <button  className="   btn-outline-secondary seatF">{props.props.col}</button> 
   

          
         
      
        if (props.props.val != "0"){
           btn =  <button  className="   btn-danger  seatF">{props.props.col}</button> 
        }

        if (props.props.val == "0") {
          btn =  <button  className="   btn-success  seatF">{props.props.col}</button> 
        } 
        if (props.props.val == "disabled") {
          btn =  <button  className="   btn-secondary  seatF">{props.props.col}</button> 
        } 
        if (props.props.val == "LIGHT1") {
          btn =  <button   className="   btn-outline-warning  seatF">◉</button> 
        } 
        if (props.props.val == "LIGHT2") {
          btn =  <button  className="   btn-outline-info  seatF" >◉</button> 

        }  if (props.props.val == "LIGHT3") {
          btn =  <button  className="   btn-outline-primary  seatF">◉</button> 
        }
         if (props.props.val == "x"){
        btn =  <button  className="invisible   btn-danger  seatF">{props.props.col}</button> 
     }
    return <span> 
   {btn}
</span>
  }

const [success, setSuccess] = useState(false);
 
  

 

   
 
 

 
if(!success){
   return (
  


        <div className = "  container pt-3 pb-3 " style={{backgroundColor:"white"}}>
  <div className="row ">

<div className="col-3 pl-5 mb-3">

<img src={data?.movie?.pic} width="180" height="270" style={{border:"3px solid darkblue"}} className="shadow"/>
</div>

<div className="col-6 pt-5">
<div className="pt-5"></div>
<span className=" " style={{fontSize:"25px", position:"relative", right:"45px"}}> <b>{data?.movie?.title} </b> </span> <br/> 




<span  style={{  position:"relative", right:"45px"}}>
{data?.movie?.categories?.map(row5 => (
  <span style={{borderColor: row5.color ,borderWidth:"2px", borderStyle:"solid", textAlign: "center", paddingRight:"11px"}}  className="border-rounded cat   pb-1 mr-1 mb-1 pl-2"  > {row5.name}</span> 

))}
</span>
</div>



<div className="col-3 pt-5 ">

<span style={{fontSize:"20px"}}> {data?.hall} hall </span> <br/>

<b style={{fontSize:"25px"}}> {data?.day},  {data.time?.slice(0, -3)}</b> <br/>



<span style={{fontSize:"20px"}}>
Tariffs: <br/>

{t_adult}
{t_stud}
{t_child}

</span> <br/>

</div>
<div className="container-fluid mt-3 mb-4" style={{ borderBottom: "1px solid lightgray" }}></div>
</div>
<div className=" text-center  p-2 " style={{ overflow:"auto", whiteSpace:"nowrap" }}>
<img src="https://www.kinopark.kz/static/img/icons/screen.svg"/>
 <h1 className="text-danger">{msgSt}</h1>
        {preview.map(row=>(

<div key={row[0]?.row}>
<span className=" "  style={{minWidth:"30px", position:"relative", left:"-73px"}}>  <b>  {row[0].row}</b></span>  
<span className=" "  >  </span> 

{row?.map(row2=>(

<RolerPreview key={row2.row + row2.col} props = {row2}/>
 


        ))}

 

</div>

        ))}
 
 

         </div>






         

 


         
         
         </div>
      )
   
    }
    else{
      return <Redirect to="/" />
  }




    

    

}

export default CheckQr;