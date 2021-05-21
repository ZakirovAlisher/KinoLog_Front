import React, { useState, useEffect, useContext} from 'react';
import {useCookies} from 'react-cookie';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";



function Hcrud(){

    
  const [cookieJWT, setCookieJWT, removeCookieJWT] = useCookies(['jwt']);
    

  const [data, setData] = useState([]);

 

  async function loadData() {
    const bearer = "Bearer " + cookieJWT['jwt'].jwtToken;
    let response = await fetch("http://localhost:8000/api/allhalls", {
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
    loadData();
  }, []);

  


  function HallPlan(props){
    function RolerPreview(props){

      let btn = <button  className="   btn-outline-secondary seatF2"></button> 
   
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
    var ryad = {"r" : 1, "cols": 1};
    var ryad2 = []


    JSON.parse(props.props ).forEach(row => { 
      var ryad3 = []
          row.forEach(col => { 
            
      
          var p = {"row":ryad.r, "col":ryad.cols++, "val": col, "type": 0};
          ryad3.push(p);
         
        })
        ryad.cols = 1;
        ryad.r++;
        ryad2.push(ryad3);
       
      
         });
         console.log(ryad2);
            
   

return(
<div style={{ overflow:"auto", whiteSpace:"nowrap" }}>

{ryad2.map(row=>(

<div key={row[0].row} style={{height:"16px"}}>
 

{row?.map(row2=>(

<RolerPreview key={row2.row + row2.col} props = {row2}/>



        ))}
 

</div>

        ))}
 

  </div>

)

  }


    return (
      <div className = "container shadow pb-5 pt-2" style={{backgroundColor:"white"}}>
         <Link to ={"/addhall"} className="btn btn-primary mt-3 mb-3 ">ADD+</Link>
      <table className = "table table-striped">
        <thead>
          <tr>
          <th>ID</th>
            <th>NUMBER</th>
            <th className="text-center">HALL PLAN</th>
             
            <th>EDIT</th>
          </tr>
        </thead>
        <tbody>
        
        {data?.map(row=>(
              <tr key = {row.id} className=" ">
                <td>
                 {row.id}
                </td>
                <td>
                 <h1> {row.number} </h1>
                </td>
                <td className="text-center">
                  
                  <HallPlan props={row.places} />


                </td>
               
                
                <td width = "10%">
                <Link  to = {`/edithall/${row.id}`}  className = "btn btn-primary  ">EDIT</Link>
                </td>
              </tr>
            ))}

        </tbody>
      </table>
  </div>
    )
}

export default Hcrud;