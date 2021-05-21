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



function Ucrud(){

    
  const [cookieJWT, setCookieJWT, removeCookieJWT] = useCookies(['jwt']);
    

  const [data, setData] = useState([]);

 

  async function loadData() {
    const bearer = "Bearer " + cookieJWT['jwt'].jwtToken;
    let response = await fetch("http://localhost:8000/api/allusers", {
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
        <Link to={"/adduser"} className="btn btn-primary mt-3 mb-3 ">ADD+</Link>
      <table className = "table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>EMAIL</th>
            <th>FULL NAME</th>
            <th>AVATAR</th>
            <th>ROLES</th>
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
                  {row.email}
                </td>
                <td>
                  {row.fullName}
                </td>
                <td>
                <img src={row.avatar} className="border border-primary" width="110" height="110"/>
                </td>
              
                <td>
                {row.roles?.map(row2=>(
                 <span> {row2.role} <br/></span> 

                ))}
                </td>
                
                <td width = "10%">
                    <Link to = {`/edituser/${row.id}`} className = "btn btn-primary  " >EDIT</Link>
                </td>
              </tr>
            ))}

        </tbody>
      </table>
  </div>
    )
}

export default Ucrud;