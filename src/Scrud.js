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



function Scrud(){

    
  const [cookieJWT, setCookieJWT, removeCookieJWT] = useCookies(['jwt']);
    

  const [data, setData] = useState([]);

 

  async function loadData() {
    const bearer = "Bearer " + cookieJWT['jwt'].jwtToken;
    let response = await fetch("http://localhost:8000/api/allschedules", {
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
        <Link to={"/addschedule"} className="btn btn-primary mt-3 mb-3 ">ADD+</Link>
      <table className = "table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>MOVIE</th>
            <th>DAY</th>
           
            <th>HALL</th>
            <th>TIME</th>
            <th>FINISHED</th>
            <th>PRICE(CHILD)</th>
            <th>PRICE(STUDENT)</th>
            <th>PRICE(ADULT)</th>
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
                  {row.movie.title}
                </td>
                 
                <td>
                  {row.day}
                </td>
                <td>
                  {row.hall}
                </td>
                <td>
                  {row.time}
                </td>
                <td className="text-center">
                 
  <input  type="checkbox" defaultChecked={row.finished}   disabled={true}/>
 
 
                </td>
                <td>
                  {row.price_ch}
                </td>
                <td>
                  {row.price_st}
                </td>
                <td>
                  {row.price_ad}
                </td>
                <td width = "10%">
                    <Link to = {`/editschedule/${row.id}`} className = "btn btn-primary  " >EDIT</Link>
                </td>
              </tr>
            ))}

        </tbody>
      </table>
  </div>
    )
}

export default Scrud;