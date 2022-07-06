import httpCommon from "./http-common";

class Services{
    //User Functions
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

    //User Functions

    GetAllItems(){
        return httpCommon.get("/Item")
    }

    GetOneItem(id){
        return httpCommon.get(`/Item/${id}`)
    }

    GetSearchItems(text){
        return httpCommon.get(`/Item/Search/${text}`)
    }

    PostItem(data){
        return httpCommon.post("/Item", data)
    }

    EditItem(data){
        return httpCommon.put("/Item", data)
    }
}

export default new Services();