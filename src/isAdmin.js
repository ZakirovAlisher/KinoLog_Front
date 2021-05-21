 

function isAdmin(){

  async function check(cookieJWT){

    const bearer = "Bearer "+cookieJWT['jwt'].jwtToken;

    const response = await fetch("http://localhost:8000/api/profile", {
        method:'GET',
        headers: {
          "Content-Type": "application/json",
          "Authorization": bearer
        }
    });

    let profData = await response.json();

    for(let i=0; i<profData.roles.length; i++){
    if (profData.roles[i].role == "ROLE_ADMIN"){
    console.log(profData.roles[i].role);
    return true;
    
  }
    }
    return false;
  }

    

}

export default isAdmin;