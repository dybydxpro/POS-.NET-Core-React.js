class Common{
    responseManage(response){
        if(response.status === 401){
            sessionStorage.setItem('userID', 0);
            sessionStorage.setItem('userName', "");
            sessionStorage.setItem('type', "");
            sessionStorage.setItem('token', "");
            window.location.replace("/login");
            // console.warn(response.status);
        }
    }

    // tokenExpiration = () =>{
    //     sessionStorage.setItem('userID', 0);
    //     sessionStorage.setItem('userName', "");
    //     sessionStorage.setItem('type', "");
    //     sessionStorage.setItem('token', "");
    //     // navigate("/");
    //     window.location.replace("/");
    // }
}

export default new Common();