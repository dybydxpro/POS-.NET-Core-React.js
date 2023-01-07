import axios from "axios";

export default axios.create({
    baseURL: "https://localhost:44348/api",
    headers: authReturn()
})

function authReturn(){
    var dt = {};

    if(sessionStorage.getItem('token') !== undefined && sessionStorage.getItem('token') !== ""){
        return dt = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + sessionStorage.getItem('token')
        }
    }
    else{
        return dt = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    }
}

//https://localhost:7253/api
//https://localhost:44383/api