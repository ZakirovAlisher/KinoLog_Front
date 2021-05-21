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



function Categcrud(){

    
  const [cookieJWT, setCookieJWT, removeCookieJWT] = useCookies(['jwt']);
    

  const [data, setData] = useState([]);

 

  async function loadData() {
    const bearer = "Bearer " + cookieJWT['jwt'].jwtToken;
    let response = await fetch("http://localhost:8000/api/allcategories", {
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

    


    return (
      <div className = "container shadow pb-5 pt-2" style={{backgroundColor:"white"}}>
        <Link to ={"/addcategory"} className="btn btn-primary mt-3 mb-3 ">ADD+</Link>
      <table className = "table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>NAME</th>
            <th>COLOR</th>
            <th>VIEW</th>
          
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
                  {row.name}
                </td>
                 
                <td>
                 <div style={{backgroundColor:row.color, width:'170px', height:'20px'}}> </div>
                </td>
                <td>
                <span style={{borderColor: row.color ,borderWidth:"2px", borderStyle:"solid", textAlign: "center", paddingRight:"11px", color:row.color}}  className="border-rounded cat   pb-1 mr-1 mb-1 pl-2"  >   {row.name}</span> 

                </td>
              
                <td width = "10%">
                    <Link to= {`/editcategory/${row.id}`} className = "btn btn-primary  " >EDIT</Link>
                </td>
              </tr>
            ))}

        </tbody>
      </table>
  </div>
    )
}

export default Categcrud;