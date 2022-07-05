import axios from "axios";

export default axios.create({
    baseURL: "https://localhost:44383/api",
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
})

//https://localhost:7253/api
//https://localhost:44383/api