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
import { useHistory } from "react-router-dom";
function ScheduleDetails(){
  let {itemId} = useParams(); 
  const [total, setTotal] = useState(0);
  const [success, setSuccess] = useState("");
  const [data, setData] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [reload, setReload] = useState(0);
  const [places, setPlaces] = useState([]);
  const [places2, setPlaces2] = useState([]);
  const [message, setMessage] = useState();
  const [bued, setBued] = useState([]);
  var ryad = {"r" : 1, "cols": 1};
  
  const [email, setEmail] = useState("");
  const [card, setCard] = useState("");
  const [cvv, setCvv] = useState("");

  const [cookieJWT, setCookieJWT, removeCookieJWT] = useCookies(['jwt']);

  
  async function loadEmail() {


        
    const bearer = "Bearer "+cookieJWT['jwt'].jwtToken;

    const response = await fetch("http://localhost:8000/api/profile", {
        method:'GET',
        headers: {
          "Content-Type": "application/json",
          "Authorization": bearer
        }
    });

    let profData = await response.json();
    
    setEmail(profData.email);
     

  }

useEffect(() => {
    getItem(itemId);
    if(cookieJWT['jwt']?.jwtToken?.length > 0){
      loadEmail();
    }
  
 }, [ ]);

 
 const history = useHistory();

 let BuyBtn;
 if (tickets.length >0){
   BuyBtn = <button className="btn btn-primary my-3"  data-toggle="modal" data-target="#exampleModal">Go to payment</button>
 }
 const [t_adult, sett_adult] = useState("");
 const [t_stud, sett_stud] = useState("");
 const [t_child, sett_child] = useState("");
  
    async function getItem(itemId) {
        
        let response = await fetch("http://localhost:8000/api/getschedulenotadm/"+itemId,  {
            method:'GET',
            headers: {
              "Content-Type": "application/json",
               
            }
        });
        if(response.status==200){
            let data = await response.json();
             console.log("ALARMMM");

             if (data.finished == 1){
              history.push("/");

             }
            setData(data);
            var ryad2 = []
 
             if(data.price_ad != -1){
                sett_adult(<span><button className="btn-warning seatF3"> </button> <u>Adult</u> - {data?.price_ch}$ <br/> </span>);
                
             }
             if(data.price_st != -1){
              sett_stud(<span><button className="btn-info seatF3"> </button> <u>Student</u> - {data?.price_st} $ <br/> </span>);
              
           }
           if(data.price_ch != -1){
            sett_child(<span> <button className="btn-primary seatF3"> </button> <u>Child </u>- {data?.price_ad} $ <br/> </span>);
            
         }
   
             
     
            
            JSON.parse(data.places ).forEach(row => { 
    var ryad3 = []
        row.forEach(col => { 
          
    
        var p = {"row":ryad.r, "col":ryad.cols++, "val": col, "type": 0};
        ryad3.push(p);
       
      })
      ryad.cols = 1;
      ryad.r++;
      ryad2.push(ryad3);
     
    
       })
            setPlaces(ryad2);
           setTickets([]);
           setTotal(0);
        }else{
            setMessage("404 ITEM NOT FOUND");
        }
      }
   

    function ticketRight( row, type,e) {
       e.preventDefault();
 

       if(tickets.length < 5){

       places[row.row-1][row.col-1].type = type;
      
       let typeStr;
       let price;
       if (type==1){
          typeStr = "Adult";
          price = data.price_ad;
       }
       if (type==2){
        typeStr = "Student";
        price = data.price_st;
     }
     if (type==3){
      typeStr = "Children";
      price = data.price_ch;
   }
       tickets.push({ "row":row.row, "col":row.col, "type":type, "typeStr": typeStr , "price": price });
       setReload(Math.random());
       setTotal(total+price);
      console.log(row.row + " " + row.col + " " + type);
      
  }
  else{
    setMessage("You cant buy more than 5 tickets");
  }
   

    }

    function removeTicket( row,e) {
      e.preventDefault();

      let ind = 0;let indX = 0;
      tickets.forEach(tick =>{
        
        if(tick.row == row.row && tick.col == row.col){
          indX = ind;
          setTotal(total-tick.price);
        }

          ind++;
      })

      tickets.splice(indX,1);
    
      places[row.row-1][row.col-1].type = 0;
      

      setReload(Math.random());

   }
   function removeTicket2( row) {
   

    let ind = 0;let indX = 0;
    tickets.forEach(tick =>{
      
      if(tick.row == row.row && tick.col == row.col){
        indX = ind;
        setTotal(total-tick.price);
      }

        ind++;
    })

    tickets.splice(indX,1);
  
    places[row.row-1][row.col-1].type = 0;
    

    setReload(Math.random());

 }
   


  const handleEmailChange = event =>{
    setEmail(event.target.value);
    
  }
  const handleCvvChange = event =>{
    setCvv(event.target.value);
    
  }

  const handleCardChange = event =>{
    setCard(event.target.value);
    
  }

  const handleSubmit = event =>{
    
     
    const inputData = {itemId, email, tickets};
    console.log(inputData);
    reserveTickets(inputData);

    event.preventDefault();

  }

  async function reserveTickets(data){
    

    const response = await fetch("http://localhost:8000/api/reserve", {
    method: "PUT",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
        "Content-Type": "application/json",
        
  
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(data)
    });
    console.log(data);

    let messData = await response.json();
    setMessage(messData.id? "Data Saved" : "Error");
    if (messData[0]?.row){
      console.log("BUED TICKETS");
      

       messData.forEach(element => {
       removeTicket2(element);
        places.forEach(place => {
          place.forEach(place2 => {

        if(element.col == place2.col && element.row == place2.row){
          console.log("TESTBUED");

          place2.val = "ZANYATO";
          place2.type = 0;
        }
      });
      });
      }); 
      console.log(places);
      setPlaces(places);
      setBued(messData);
      
    }else{
      setSuccess("Tickets successfully bought. Please check your email");
      getItem(itemId);
    }
    
}







    function Roler(props){


      let adult ;
      let student ;
      let child ;
      if (data?.price_ad != -1){
          adult =<a className="dropdown-item" href="#" onClick={(e) => ticketRight(props.props, 1,e)}><button className="btn-warning seatF3"> </button>Adult - {data?.price_ad} $</a> ;
      }
      if (data?.price_st != -1){
        student =<a className="dropdown-item" href="#" onClick={(e) => ticketRight(props.props, 2,e)}><button className="btn-info seatF3"> </button>Student - {data?.price_st} $</a>;
    }
    if (data?.price_ch != -1){
      child =<a className="dropdown-item" href="#" onClick={(e) => ticketRight(props.props, 3,e)}><button className="btn-primary seatF3"> </button>Child - {data?.price_ch}$</a>;
  }

        let btn = <div  className="btn-group"> <button className="btn-success  seatF" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{props.props.col}</button> <div className="dropdown-menu">
          {adult}
           {student}
           {child}
       </div> </div> 
       



       
        useEffect(()=>{
          
            },[  ]);

            
          if (tickets.length >=5 ){
            btn = <div  className="btn-group"> <button className="btn-success  seatF " data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{props.props.col}</button> <div className="dropdown-menu">
            <div className="p-3 "  > You can buy a maximum of 5 tickets.<br/>
            For more than 5 tickets, please re-purchase </div>
            
           </div> </div> 

           
          }
 
          if (props.props.val != "0" ){
             btn =<button  className="btn-group btn-danger seatF  " style={{ }}> </button> 
          }
          if (props.props.val == "x"){
            btn =  <button  className=" invisible  btn-outline-secondary  seatF">{props.props.col}</button> 
         }
         if (props.props.val == "disabled") {
          btn =  <button  className=" btn-group  btn-secondary  seatF"> </button> 
        } 
          if (props.props.type == 1) {
            btn =  <div  className="btn-group"> <button className="btn-warning  seatF" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{props.props.col}</button> <div className="dropdown-menu">
            <a className="dropdown-item" href="#" onClick={(e) => removeTicket(props.props, e)}> <span className=" text-danger  ">×</span> Remove ticket </a>
               
           </div> </div> 
          }
          if (props.props.type == 2) {
            btn =  <div  className="btn-group"> <button className="btn-info  seatF " data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{props.props.col}</button> <div className="dropdown-menu">
            <a className="dropdown-item" href="#" onClick={(e) => removeTicket(props.props, e)}> <span className=" text-danger">×</span> Remove ticket </a>
            </div> </div> 
          }
          if (props.props.type == 3) {
            btn =  <div  className="btn-group"> <button className="btn-primary  seatF" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{props.props.col}</button> <div className="dropdown-menu">
            <a className="dropdown-item" href="#" onClick={(e) => removeTicket(props.props, e)}> <span className="  text-danger">×</span> Remove ticket </a>
            </div> </div> 
          }
          if (props.props.val == "ZANYATO") {
            btn =  <button  className="   btn-outline-danger  seatF">{props.props.col}</button> 
          }

      return <span> 
      
     {btn}




</span>
    }
    
   return (

        <div className = "container shadow pb-5 pt-2" style={{ }} id="mainer">
      
        <div className = "container">
         <h1 className="text-success"> {success} </h1>
       
        
              <div className="row">

              <div className="col-3 pl-5 mb-3">

        <img src={data?.movie?.pic} width="180" height="270" style={{border:"3px solid darkblue"}} className="shadow"/>
 </div>
          
 <div className="col-6 pt-5">
   <div className="pt-5"></div>
       <span className=" " style={{fontSize:"25px", position:"relative", right:"45px"}}> <b>{data?.movie?.title} </b> </span> <br/> 
       
     
       
      
         <span  style={{  position:"relative", right:"45px"}}>
       {data?.movie?.categories?.map(row5 => (
                <span style={{borderColor: row5.color ,borderWidth:"2px", borderStyle:"solid", textAlign: "center", paddingRight:"11px"}}  className="border-rounded cat   pb-1 mr-1 mb-1 pl-2"  > {row5.name}</span> 

              ))}<br/><br/>

<span className=" " style={{fontSize:"25px"}}> Please choose places and buy tickets.</span><br/>
{bued.length>0? <h4 className='text-danger'>Someone bought this tickets:</h4>: ""}
{bued?.map(row=>(
<div className=" card   p-2 pt-3 mb-2">
 
<div className="">
<br/> 
<span  style={{position:"relative", top:"-17px"}}>
   {row.row} row, {row.col} place,  <u>{row.typeStr}</u> 

<span className = "  float-right">
    {row.price} $  
      
   </span>
   </span>
  </div>  
    

 
</div>




         ))}
         {bued.length>0? "Please choose another places": ""}
</span>


</div>


       
        <div className="col-3 pt-5 " style={{position:"relative", top:"-5px"}}>

        <span style={{fontSize:"20px"}}> {data?.hall} hall </span> <br/>

        <b style={{fontSize:"25px"}}> {data?.day},  {data.time?.slice(0, -3)}</b> <br/>
        
       

        <span style={{fontSize:"20px"}}>
          Tariffs: <br/>

          {t_adult}
          {t_stud}
          {t_child}

   </span> <br/>

        </div>
        <div className="container-fluid mt-3 mb-4" id="strip" style={{ }}></div>
              </div>



<div className="row">
<div className="col-8 text-center" style={{ overflow:"auto", whiteSpace:"nowrap" }}>
<img src="https://www.kinopark.kz/static/img/icons/screen.svg"/>


<div className="mt-5">
        {places?.map(row=>(

<div key={row[0].row}>
<span className=" "  style={{minWidth:"30px", position:"absolute", left:"40px"}}>   <b> {row[0].row} </b></span>  
<span className=" "  >  </span> 
{row?.map(row2=>(

<Roler key={row2.row + row2.col} props = {row2}/>



        ))}

<span className="invisible">{ryad.cols = 1}</span>

</div>

        ))}


</div>

<div className="mt-5">
<button className="btn-success seatF3"></button> Available places
<button className=" ml-2 btn-secondary seatF3"></button> Disabled places 
<button className=" ml-2 btn-danger seatF3"></button> Occupied places<br/> 
<button className="btn-outline-danger seatF3"></button> Occupied places when you try to reserve it.
</div>

</div>








<div className="col-4 " style={{ position: "relative"}}>
  <div style={{ position: "absolute", top: "50%",  transform: "translate(0, -50%)" }}>
<h3><b>Total: {total} $</b></h3> 


<div className="border border-info" style={{maxHeight:"250px", overflow:"auto", whiteSpace:"nowrap",color:"black"}}>
         {tickets?.map(row=>(
<div className=" card  p-2 pt-3 mb-2">
<div className="">
{row.row} row, {row.col} place,  <u>{row.typeStr}</u> 

<span className = "ml-4  float-right">
    {row.price} $  <button  className="ml-2 btn btn-danger float-right  mr-2 " style={{position:"relative", top:"-5px"}} onClick={(e) => removeTicket(row, e) }>×</button>
      
   </span>

  
  </div>  
    

 
</div>




         ))}
</div>


         {BuyBtn}
</div>

         </div>

         </div>


         </div>
         
     
         
         
         
         
         
         <div class="modal fade" id="exampleModal" style={{color:'black'}}tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Ticket reservation</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      
      <div class="modal-body">
        

      <div className = "form-group">
            Enter your email
              <input type = "email" className = "form-control" value = {email} onChange = {handleEmailChange} required/>
            </div>
            
            <div className = "form-group">
            Card number
              <input type = "text" className = "form-control" value = {card} onChange = {handleCardChange} required/>
            </div>

            <div className = "form-group">
            CVV code
              <input type = "text" className = "form-control" value = {cvv} onChange = {handleCvvChange} required/>
            </div>


      </div>

      <div className="p-3" >
  <div style={{  }}>
<h3><b>Total: {total} $</b></h3> 


<div  style={{}}>
         {tickets?.map(row=>(
<div className=" card  p-2 pt-3 mb-2">
<div className="">
{row.row} row, {row.col} place,  <u>{row.typeStr}</u> 

<span className = "ml-5  float-right">
    {row.price} $  
   </span>

  
  </div>  
    

 
</div>




         ))}
</div>


         
</div>

         </div>

      <div class="modal-footer">
         
        <button type="button" class="btn btn-success" onClick={handleSubmit} data-dismiss="modal" >Reserve  places</button>
      </div>
       
    </div>
    
  </div>
</div>
         
         
         
         </div>



      )
       





    

    

}

export default ScheduleDetails;