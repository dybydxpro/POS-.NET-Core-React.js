export function responseManage(response: any){
    if(response.status !== undefined){
        if(response.status === 401){
            sessionStorage.setItem('userID', String(0));
            sessionStorage.setItem('userName', "");
            sessionStorage.setItem('type', "");
            sessionStorage.setItem('token', "");
            window.location.replace("/login");
        }
    }
}