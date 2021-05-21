import React, { useState, useEffect, useContext} from 'react';

import { scryRenderedDOMComponentsWithTag } from 'react-dom/test-utils';

 
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams,
    Redirect
  } from "react-router-dom";




function Schedule(){
 

  const [data, setData] = useState([]);

  const [search, setSeacrh] = useState("");

  const handleSearchChange = async event =>{ 

    setSeacrh(event.target.value);
 



if(event.target.value.length === 0)
    {
      

      await loadDataAll();
    } else{

      await loadData();
    }
   
    
    
    
  }

  async function loadData() {
    let response
   
     response = await fetch("http://localhost:8000/api/schedules/"+search, {
      method:'GET',
      headers: {
        "Content-Type": "application/json",
       
      }


    });




    let tableData = await response.json();
    setData(tableData);
     
    
  }


  async function loadDataAll() {
    let response
   
  response = await fetch("http://localhost:8000/api/schedules/all", {
    method:'GET',
    headers: {
      "Content-Type": "application/json",
     
    }


  });



    let tableData = await response.json();
    setData(tableData);
     
    
  }
   
  useEffect(() => {
    loadDataAll();
    
  }, []);
 
 console.log(data);
 
 function Times(props){
  let time=<Link to={"/scheduledetails/" + props.prop.id} className="btn btn-primary imppad" id="times" > { props.prop.time.slice(0, -3)}</Link>
  
  if (props.prop.finished){
  time = <button   className="btn btn-outline-secondary imppad"  ><s>{props.prop.time.slice(0, -3)}</s></button>

  } 


  return <time>
    
    {time}
  </time>


            
            
 }
    return (
        <div className = "container shadow pb-5 pt-2" id="mainer"style={{}}>
      <div className="input-group mt-3">
        <input type="search" value={search}  id="searchbar" onChange={ async (e) => { await handleSearchChange(e)}}  className="form-control rounded border border-primary" placeholder="Search" aria-label="Search" aria-describedby="search-addon" />
        <button type="button" onClick={loadData} id="primary" className="btn btn-primary ml-2">Search</button>
        


      </div>

         
 

        {data?.map(row => (
          <div key={row.id}>
            <div className="container-fluid mt-3" id="strip" style={{ }}></div>
            <h4 className="text-center mt-1"> {row.dayStr}</h4>

            <div className="container-fluid"  id="strip" style={{  }}></div>


            {row.movies?.map(row2 => (

              <div key={row2.id} className="row m-5" >
                <div className="col-3">
                  <img src={row2.movie.pic} className="shadow" style={{ height: "330px", width: "223px" }} />

                </div>
                <div className="col-9">
                  <b style={{fontSize:"24px"}}> {row2.movie.title} ({row2.movie.year})</b><br />
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Star_full.svg/1200px-Star_full.svg.png" style={{ height: "25px", width: "25px" }} /> <b style={{position:'relative',bottom:"-3px"}}>{row2.movie.rating}/10</b> <br />
                  <div div className="mt-2">
              {row2.movie.categories?.map(row5 => (
                <span style={{borderColor: row5.color ,borderWidth:"2px", borderStyle:"solid", textAlign: "center", paddingRight:"11px"}}  className="border-rounded cat   pb-1 mr-1 mb-1 pl-2"  > {row5.name}</span> 

              ))} </div>
                
                
                 <div className="my-3">
                  {row2.movie.desc}

           
                
                
               

                </div>
                <div className="row ml-1">
                  {row2.halls?.map(row3 => (

                    <div key={row3.id} className="col-2 row text-center ">

                      <div className=" p-2" >
                     <h5 className="   ">  <span className="">{row3.hallNumber} hall </span>   <br/>
                     <div className="container-fluid my-1" style={{ borderBottom: "1px solid gray" }}></div>
                      {row3.schedules?.map(row4 => (
                        <span className="mx-2  mt-1 ">

                         <Times  prop={row4} />  <br/>



                        </span>


                      ))} </h5> 

</div>

                    </div>
                  ))} </div>

                </div>






              </div>
              
            ))}

          </div>
        ))}

      </div>
    )
}

export default Schedule;