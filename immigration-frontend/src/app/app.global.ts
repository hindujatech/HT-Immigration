import { HttpHeaders } from "@angular/common/http";
 var user = JSON.parse(localStorage.getItem("currentUser"));
const authToken = user;
console.log(authToken);
export const BACK_END_URL = 'https://immigration.hindujatech.com:3695/';
export var httpOptions;
if(authToken == null){
    console.log('ifcondition');
    localStorage.removeItem("currentUser");
    localStorage.clear();
} else {
    console.log('else');
    httpOptions = {
        headers: new HttpHeaders({
          'Authorization': 'Bearer '+ authToken.token
        })
      };
}

