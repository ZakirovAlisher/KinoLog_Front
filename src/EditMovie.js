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

import {useCookies} from 'react-cookie';

function EditMovie(){
    const [cookieJWT, setCookieJWT, removeCookieJWT] = useCookies(['jwt']);


    let {itemId} = useParams();
  
    const [id, setId] = useState(0);

    
    const [success, setSuccess] = useState(false);
    const [title1, setTitle1] = useState("");
    const [title, setTitle] = useState("");
    const [pic, setPic] = useState("");
    const [rating, setRating] = useState("");
    const [year, setYear] = useState("");

    const [desc, setDesc] = useState("");
    const [reload, setReload] = useState(0);


    const [message, setMessage] = useState("");

  

    const [dataCats, setDataCats] = useState([]);
    const [cats, setCats2] = useState([]);
 


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
      setDataCats(tableData);
    }
    useEffect(()=>{
      loadData();
      getItem(itemId); 
  },[reload]);

    const handleTitleChange = event =>{
        setTitle(event.target.value);
      }
      const handlePicChange = event =>{
        setPic(event.target.value);
      }
      const handleYearChange = event =>{
        setYear(event.target.value);
      }
      const handleRatingChange = event =>{
        setRating(event.target.value);
      }
      const handleDescChange = event =>{
        setDesc(event.target.value);
      }


 
    const handleSubmit = event =>{
        var categories = cats;
        const inputData = {id, title, desc, pic,rating,year, categories}
        saveMovie(inputData);
   
    
        event.preventDefault();
    
      }

    async function setData(data) {
                setId(data.id);
                setTitle(data.title);
                setPic(data.pic);
                setRating(data.rating);
                setYear(data.year);
                setTitle1(data.title);
                setDesc(data.desc);
                setCats2(data.categories);
    }

    async function saveMovie(data){
        const bearer = "Bearer "+cookieJWT['jwt'].jwtToken;

        const response = await fetch("http://localhost:8000/api/savemovie", {
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
        let messData = await response.json();
        setMessage(messData.id? "Data Saved" : "Error");
        setTitle1(title);
    }

    async function getItem(itemId) {
        const bearer = "Bearer "+cookieJWT['jwt'].jwtToken;

        let response = await fetch("http://localhost:8000/api/getmovie/"+itemId,  {
            method:'GET',
            headers: {
              "Content-Type": "application/json",
              "Authorization": bearer
            }
        });
        if(response.status==200){
            let data = await response.json();
            setData(data);
        }else{
            setMessage("404 ITEM NOT FOUND");
        }
    }

  

    async function toDeleteItem() {
      var categories = cats;
        const inputData = {id, title, pic,rating,year, categories}
        deleteMovie(inputData);
   
    }

    async function deleteMovie(data){
        const bearer = "Bearer "+cookieJWT['jwt'].jwtToken;

        const response = await fetch("http://localhost:8000/api/deletemovie", {
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

    function Roler(props){


      const handleSubmitRole = event =>{
    
        let movie_id = id;
        let cat_id = props.props.id;
        const inputData = {movie_id, cat_id}
        assignCat(inputData);

    
        event.preventDefault();
    
      }

      async function assignCat(data){
        const bearer = "Bearer "+cookieJWT['jwt'].jwtToken;

        const response = await fetch("http://localhost:8000/api/assigncat", {
        method: "POST",
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
        setReload(Math.random());
    }
      const [green, setGreen] = useState(false);

        useEffect(()=>{
          isGreen(); 
            },[]);

      async function isGreen(){
        
    
          cats.forEach((element) => {
            
           if (element.id == props.props.id ){
           
            console.log("SET GREEN")
             setGreen(true);
             
           }
    
          })
    
       
         

      }
      let className = 'row border ';
      if (green) {
        className += ' greeng ';
      }

      return <div> 
        
       
        <form   className={className}   onSubmit = {handleSubmitRole}>

<div className="col-6  text-center  pt-3">
<span style={{borderColor: props.props.color ,borderWidth:"2px", borderStyle:"solid", textAlign: "center", paddingRight:"11px", color:props.props.color}}  className="border-rounded cat   pb-1 mr-1 mb-1 pl-2"  >   {props.props.name}</span> 

 </div>
 <div className="col-6 text-center">
      {!green ?  <button className = "btn btn-success m-2"> + </button> : <button className = "btn btn-danger m-2"> - </button>}
      </div>
  </form>
</div>
    }
    if(!success){
    return (
        <div style ={{paddingTop:"40px", paddingBottom:"100px"}} >
    <div className = "container">

    <h1 className="text-center"><b>Edit {title1}</b></h1>
        <div className = "row" style={{color:'black'}}>
        <div className = " card shadow-lg col-6 mx-auto">
        <div className = "form-group">
        <Link to="/movies_crud/all/0/5" className="btn btn-info mt-3">BACK</Link> </div>
        <div className = "text-center">
        <img src={pic} width="252" height="370" style={{border:"3px solid darkblue"}} className="shadow"/><br/>
        <div  className="mt-2">
              {cats?.map(row5 => (
                <span style={{borderColor: row5.color ,borderWidth:"2px", borderStyle:"solid", textAlign: "center", paddingRight:"11px"}}  className="border-rounded cat   pb-1 mr-1 mb-1 pl-2 mt-2"  >   {row5.name}</span> 

              ))} </div>
        <h1 className="text-center">{message}</h1>
</div>
            <form onSubmit = {handleSubmit}>
               
            <div className = "form-group">
            Title
              <input type = "text" className = "form-control" value = {title} onChange = {handleTitleChange} required/>
            </div>
            <div className = "form-group">
            Pic url
              <input type = "text" className = "form-control" value = {pic} onChange = {handlePicChange} required/>
            </div>
            <div className = "form-group">
            Description
            <textarea  className = "form-control" value = {desc} onChange = {handleDescChange} required/> 
            </div>
            <div className = "form-group">
            Rating
            <input type = "number" className = "form-control" value = {rating} onChange = {handleRatingChange} required/>
          </div>
          <div className = "form-group">
            Year
            <input type = "number" className = "form-control" value = {year} onChange = {handleYearChange} required/>
          </div>



              
                <div className = "form-group">
                <button className = "btn btn-success">SAVE ITEM</button>
                <button type = "button" className = "btn btn-danger ml-2" onClick = {toDeleteItem}>DELETE ITEM</button>
                </div>
            </form> 
            </div>
          



            <div className="col-5  mb-5">
            <div className="card shadow-lg p-4">
<h1 className="text-center"><b>Categories</b></h1>
  {dataCats?.map(row=>(

<Roler key={row.id} props = {row}/>




))}  </div>

</div>









        </div>    
        </div>  </div>
    )}
    else{
return <Redirect to="/movies_crud/all/0/5"/>

    }

}

export default EditMovie;