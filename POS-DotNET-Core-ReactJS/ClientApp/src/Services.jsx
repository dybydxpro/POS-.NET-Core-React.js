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

    GetAllItemsASC(){
        return httpCommon.get("/Item/ASC")
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

    GetAllStocksASC(id){
        return httpCommon.get(`/Stock/ASC/${id}`)
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

    //Supplier Functions
    GetAllSuppliers(){
        return httpCommon.get("/Supplier")
    }

    GetAllSuppliersASC(){
        return httpCommon.get("/Supplier/ASC")
    }

    GetOneSupplier(id){
        return httpCommon.get(`/Supplier/${id}`)
    }

    GetSearchSuppliers(text){
        return httpCommon.get(`/Supplier/Search/${text}`)
    }

    PostSupplier(data){
        return httpCommon.post("/Supplier", data)
    }

    EditSupplier(data){
        return httpCommon.put("/Supplier", data)
    }

    //GRN Function
    GetAllGRNs(){
        return httpCommon.get("/GRN")
    }

    GetOneGRN(id){
        return httpCommon.get(`/GRN/${id}`)
    }

    GetSearchGRNs(text){
        return httpCommon.get(`/GRN/Search/${text}`)
    }

    PostGRNs(id){
        return httpCommon.post(`/GRN/${id}`)
    }

    //GRN Cart Function
    GetAllGRNCarts(id){
        return httpCommon.get(`/GRNCart/GetByUser/${id}`)
    }

    PostGRNCart(data){
        return httpCommon.post("/GRNCart", data)
    }

    EditGRNCart(data){
        return httpCommon.get("/GRNCart", data)
    }

    DeleteGRNCart(id){
        return httpCommon.delete(`/GRNCart/${id}`)
    }

    //Sale Cart Function
    GetAllCart(id){
        return httpCommon.get(`/Cart/${id}`)
    }

    PostCart(data){
        return httpCommon.post("/Cart", data)
    }

    DeleteCart(id){
        return httpCommon.delete(`/Cart/${id}`)
    }

    //Sale Function
    ProcessBill(id){
        return httpCommon.post(`/Sale/${id}`)
    }

    PrintBill(billid){
        return httpCommon.get(`/Sale/Bill/${billid}`)
    }
}

export default new Services();