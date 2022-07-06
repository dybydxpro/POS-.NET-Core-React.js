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

    //Item Functions
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

    //Stack Functions
    GetAllStocks(){
        return httpCommon.get("/Stock")
    }

    GetOneStock(id){
        return httpCommon.get(`/Stock/${id}`)
    }

    GetSearchStocks(text){
        return httpCommon.get(`/Stock/Search/${text}`)
    }

    PostStock(data){
        return httpCommon.post("/Stock", data)
    }

    EditStock(data){
        return httpCommon.put("/Stock", data)
    }
}

export default new Services();