import httpCommon from "./http-common";

class Services{
    login(data){
        return httpCommon.post("/User/Login", data);
    }

    getAllUser(){
        return httpCommon.get("/User")
    }

    CreateUser(data){
        return httpCommon.post("/User", data)
    }

    getOneUser(id){
        return httpCommon.get(`/User/${id}`)
    }

    EditUser(data){
        return httpCommon.put("/User/EditUser", data)
    }

    ResetPW(data){
        return httpCommon.put("/User/ResetPassword", data)
    }

    ADAccount(id){
        return httpCommon.put(`/User/ActiveAccount/${id}`)
    }

    SearchUser(text){
        return httpCommon.get(`/User/Search/${text}`)
    }
}

export default new Services();