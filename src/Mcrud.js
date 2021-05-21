import React, { useState, useEffect, useContext} from 'react';
import { Next } from 'react-bootstrap/esm/PageItem';
import {useCookies} from 'react-cookie';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";



function Mcrud(){
  const { title } = useParams();
  const { page } = useParams();
  const { size } = useParams();
  const [reload, setReload] = useState(0);
  const [cookieJWT, setCookieJWT, removeCookieJWT] = useCookies(['jwt']);
    

  const [search, setSeacrh] = useState("");

  const [data, setData] = useState([]);
  var pageN = +page + 1;
  var pageP = +page - 1;

 
  
  var pages=[];
for(var i = 0 ; i< data.totalPages; i++){

  if (page == i){
    pages.push (<button  className="btn btn-primary"   > {+i+1} </button>);
  }
  else
pages.push (<Link to={"/movies_crud/" + title +"/" + i + "/" + size } className="btn btn-info"   > {+i+1} </Link>);


}


 var nextBtn;
 if(+data.totalPages - +page == 1){
  nextBtn = <button  className="btn btn-secondary ml-1"> → </button>

}
else{
nextBtn = <Link to={"/movies_crud/" + title +"/" + pageN + "/" + size } className="btn btn-info ml-1"   > → </Link>
}
var prevBtn;
if(page == 0){
  prevBtn = <button  className="btn btn-secondary"> ← </button>

}
else{
  prevBtn =  <Link to={"/movies_crud/" + title +"/" + pageP + "/" + size } className="btn btn-info"   >← </Link>
}


  async function loadData() {
    const bearer = "Bearer " + cookieJWT['jwt'].jwtToken;
    let response = await fetch("http://localhost:8000/api/allmovies/" + title+"/"+ page+"/"+ size, {
      method:'GET',
      headers: {
        "Content-Type": "application/json",
        "Authorization": bearer
      },
      


    });
    let tableData = await response.json();
    setData(tableData);
   
    
  }
 
 var nothingfound = "";

 if (data.movies?.length == 0){
   nothingfound = <span>NOTHING FOUND <br/>
<img src="https://img.icons8.com/color/452/nothing-found.png" className="pl-5"style={{width:"25vw", height:"45vh" }}/>

   </span>
   prevBtn = "";
   nextBtn ="";
 }

  useEffect(() => { 
   
    loadData();
   

  }, [pageN, pageP, title]);

    
    const [searchBtn, setSearchBtn] = useState(<button  className="btn btn-secondary  mr-1"   > Search </button>);

  const handleSearchChange = event =>{

    setSeacrh(event.target.value);

    if(event.target.value.length === 0){
      setSearchBtn(<button  className="btn btn-secondary   mr-1"   > Search </button>);
    }
    else{

      setSearchBtn(<Link to={"/movies_crud/" + event.target.value +"/" + 0 + "/" + size } className="btn btn-primary   mr-1"   > Search </Link>);
    }
    
    
  }

    return (
      <div className = "container shadow pb-5 pt-2" style={{backgroundColor:"white"}}>
        <Link to={"/addmovie"} className="btn btn-primary mt-3 mb-3 ">ADD+</Link>
 

      <table className = "table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>TITLE

            <div className="row ml-1">
        <input value={search}  onChange={handleSearchChange} type="search" className=" rounded border border-primary mr-2 "  placeholder="Search" aria-label="Search" aria-describedby="search-addon" />
        {searchBtn}
        <Link to={"/movies_crud/" + "all" +"/" + 0 + "/" + size } className="btn btn-info mx-1"   > Back to all </Link>
       
</div>

            </th>
            <th>PIC</th>
           
            <th>RATING</th>
            <th>YEAR</th>
            <th>CATEGORIES</th>
            <th>EDIT</th>
          </tr>
        </thead>
        <tbody>
        
        {data.movies?.map(row=>(
              <tr key = {row.id} className=" ">
                <td>
                  {row.id}
                </td>
                <td>
                  {row.title}
                </td>
                <td>
                <img src={row.pic} width="80" height="110"/>
                </td>
                <td>
                  {row.rating}
                </td>
                <td>
                  {row.year}
                </td>
                <td>
                {row.categories?.map(row2=>(
                 <span> {row2.name} <br/></span> 

                ))}
                </td>
                <td width = "10%">
                    <Link to={`/editmovie/${row.id}`} className = "btn btn-primary  "   >EDIT</Link>
                </td>
              </tr>
            ))}

       



        </tbody>
       
      </table>
      <h1 className="text-center text-danger">{nothingfound} 
      
      
      </h1>
     {prevBtn}

     {pages?.map(row=>(
      <span key={row}> {row}</span>

     ))}
       {nextBtn}
  </div>
    )
}

export default Mcrud;