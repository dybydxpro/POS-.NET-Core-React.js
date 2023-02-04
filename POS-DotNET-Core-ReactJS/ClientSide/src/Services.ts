import httpCommon from "./http-common";

class Services{
    //User Functions
    login(data: any){
        return httpCommon.post("/User/Login", data);
    }

    getAllUser(){
        return httpCommon.get("/User")
    }

    CreateUser(data: any){
        return httpCommon.post("/User", data)
    }

    getOneUser(id: number){
        return httpCommon.get(`/User/${id}`)
    }

    EditUser(data: any){
        return httpCommon.put("/User/EditUser", data)
    }

    ResetPW(data: any){
        return httpCommon.put("/User/ResetPassword", data)
    }

    ADAccount(id: number){
        return httpCommon.put(`/User/ActiveAccount/${id}`)
    }

    SearchUser(text: string){
        return httpCommon.get(`/User/Search/${text}`)
    }

    //Item Functions
    GetAllItems(){
        return httpCommon.get("/Item")
    }

    GetAllItemsASC(){
        return httpCommon.get("/Item/ASC")
    }

    GetOneItem(id: number){
        return httpCommon.get(`/Item/${id}`)
    }

    GetSearchItems(text: string){
        return httpCommon.get(`/Item/Search/${text}`)
    }

    PostItem(data: any){
        return httpCommon.post("/Item", data)
    }

    EditItem(data: any){
        return httpCommon.put("/Item", data)
    }

    //Stack Functions
    GetAllStocks(){
        return httpCommon.get("/Stock")
    }

    GetAllStocksASC(id: number){
        return httpCommon.get(`/Stock/ASC/${id}`)
    }

    GetOneStock(id: number){
        return httpCommon.get(`/Stock/${id}`)
    }

    GetSearchStocks(text: string){
        return httpCommon.get(`/Stock/Search/${text}`)
    }

    PostStock(data: any){
        return httpCommon.post("/Stock", data)
    }

    EditStock(data: any){
        return httpCommon.put("/Stock", data)
    }

    //Supplier Functions
    GetAllSuppliers(){
        return httpCommon.get("/Supplier")
    }

    GetAllSuppliersASC(){
        return httpCommon.get("/Supplier/ASC")
    }

    GetOneSupplier(id: number){
        return httpCommon.get(`/Supplier/${id}`)
    }

    GetSearchSuppliers(text: string){
        return httpCommon.get(`/Supplier/Search/${text}`)
    }

    PostSupplier(data: any){
        return httpCommon.post("/Supplier", data)
    }

    EditSupplier(data: any){
        return httpCommon.put("/Supplier", data)
    }

    //GRN Function
    GetAllGRNs(){
        return httpCommon.get("/GRN")
    }

    GetOneGRN(id: number){
        return httpCommon.get(`/GRN/${id}`)
    }

    GetSearchGRNs(text: string){
        return httpCommon.get(`/GRN/Search/${text}`)
    }

    PostGRNs(id: number){
        return httpCommon.post(`/GRN/${id}`)
    }

    //GRN Cart Function
    GetAllGRNCarts(id: number){
        return httpCommon.get(`/GRNCart/GetByUser/${id}`)
    }

    PostGRNCart(data: any){
        return httpCommon.post("/GRNCart", data)
    }

    EditGRNCart(data: any){
        return httpCommon.get("/GRNCart", data)
    }

    DeleteGRNCart(id: number){
        return httpCommon.delete(`/GRNCart/${id}`)
    }

    //Sale Cart Function
    GetAllCart(id: number){
        return httpCommon.get(`/Cart/${id}`)
    }

    PostCart(data: any){
        return httpCommon.post("/Cart", data)
    }

    DeleteCart(id: number){
        return httpCommon.delete(`/Cart/${id}`)
    }

    //Sale Function
    ProcessBill(id: number){
        return httpCommon.post(`/Sale/${id}`)
    }

    PrintBill(billid: number){
        return httpCommon.get(`/Sale/Bill/${billid}`)
    }

    FetchAllBills(){
        return httpCommon.get("/Sale")
    }

    FetchSearchBills(text: string){
        return httpCommon.get(`/Sale/Search/${text}`)
    }

    //Return Function
    GetAllReturns(){
        return httpCommon.get("/Return")
    }

    GetOneReturn(id: number){
        return httpCommon.get(`/Return/${id}`)
    }

    GetSearchReturn(text: string){
        return httpCommon.get(`/Return/Search/${text}`)
    }

    PostReturn(data: any){
        return httpCommon.post("/Return", data)
    }

    EditReturn(data: any){
        return httpCommon.put("/Return", data)
    }

    DeleteReturn(id: number){
        return httpCommon.delete(`/Return/${id}`)
    }

    //Dashboard Functions
    DailySales(){
        return httpCommon.get("/Dashboard/DailySales")
    }

    MonthlySales(){
        return httpCommon.get("/Dashboard/MonthlySales")
    }

    UserCounts(){
        return httpCommon.get("/Dashboard/UserCounts")
    }

    ItemCounts(){
        return httpCommon.get("/Dashboard/ItemCounts")
    }

    SupplierCounts(){
        return httpCommon.get("/Dashboard/SupplierCounts")
    }

    GRNCounts(){
        return httpCommon.get("/Dashboard/GRNCounts")
    }

    DailyBillCounts(){
        return httpCommon.get("/Dashboard/DailyBillCounts")
    }

    MonthlyBillCounts(){
        return httpCommon.get("/Dashboard/MonthlyBillCounts")
    }
}

export default new Services();