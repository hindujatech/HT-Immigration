import { HttpHeaders } from '@angular/common/http';
// import { Component, HostListener } from '@angular/core';
import { Component, OnInit,HostListener } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ImmigrationService } from '../service/immigration.service';
import {  AuthenticationService } from '../service/auth.service';
import { AlertService } from '../service/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formdata: any;
  loginForm: any;
  returnUrl: any;
  authToken: any;
  httpOptions: any;
  
  constructor(private route: ActivatedRoute,  private alertService: AlertService,private router: Router, private immigrationServicec: ImmigrationService, private authenticationService: AuthenticationService,) {
//     window.location.hash="no-back-button";
// window.location.hash="Again-No-back-button";//again because google chrome don't insert first hash into history
// window.onhashchange=function(){window.location.hash="no-back-button";}
   }
  ngOnInit() {
    this.formdata = new FormGroup({
      user_name: new FormControl("", Validators.compose([Validators.required,Validators.maxLength(10),Validators.minLength(5)])),
      password: new FormControl("", Validators.compose([Validators.required,Validators.maxLength(20),Validators.minLength(5)]))
    });
  //   console.log("localstorage",localStorage.currentUser)
  //   if (localStorage.currentUser) {
  //     var jsonObj = JSON.parse(localStorage.currentUser);
    
  //  var emp_name = jsonObj.first_name+" "+jsonObj.last_name;
  //  var employee_id=jsonObj.employee_number;
  //  console.log(emp_name,employee_id)
  //     this.router.navigate(['homepage']);
  //   } else {
  //     // this.authenticationService.logout();
  //   }
  //   this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || 'login';
  if (localStorage.currentUser) {
    var jsonObj = JSON.parse(localStorage.currentUser);
  console.log("jsonObj",jsonObj)
//  var emp_name = jsonObj.first_name+" "+jsonObj.last_name;
//  var employee_id=jsonObj.employee_number;
 //console.log(emp_name,employee_id)
    this.router.navigate(['/homepage']);
  } else {
    this.authenticationService.logout();
  }
  this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/homepage';
  console.log("returnUrl",this.returnUrl)
  }

  onClickSubmit() {
console.log("asdasdasdas")
    if (this.formdata.valid) {
      (<HTMLInputElement>document.getElementById("submit_btn")).disabled = true;
      console.log("ytftyftcxvxyf",this.formdata.value)
      this.immigrationServicec.userLogin(this.formdata.value.user_name, this.formdata.value.password)
        .subscribe ((data: any) => {
          console.log("data",data);
          const userWithoutHash = data;
          if ( userWithoutHash.employee_number == '17649' || userWithoutHash.employee_number == '17753') {
            userWithoutHash.is_img = true;
          } else {
            userWithoutHash.is_img = false;
          }
          console.log( userWithoutHash)
           localStorage.setItem("currentUser",JSON.stringify(userWithoutHash) );
          //  this.httpOptions = {
          //   headers: new HttpHeaders({
          //     'Authorization': 'Bearer '+ this.authToken.token
          //   })
          // };
           this.router.navigate(['/homepage']);
          },
          error => {
            this.alertService.error("Username or password is incorrect d");
            (<HTMLInputElement>document.getElementById("submit_btn")).disabled = false;
            // alert(error);
          });
    }
  }

  // onClickSubmit() {
  //   if (this.formdata.valid) {
  //     (<HTMLInputElement>document.getElementById("submit_btn")).disabled = true;
    
  //     this.authenticationService.login(this.formdata.value.user_name, this.formdata.value.password)
  //       .subscribe(
  //         data => {
  //           console.log("data",data);
  //         // console.log(this.returnUrl);
  //         this.router.navigate(['/homepage']);
  //         },
  //         error => {
  //           (<HTMLInputElement>document.getElementById("submit_btn")).disabled = false;
  //           // this.alertService.error(error);
  //         });
  //   }

  // }
  @HostListener("window:beforeunload",["$event"])
  clearLocalStorage(event){
      localStorage.clear();
  }

}
// const authToken = JSON.parse(localStorage.getItem("userInfo"));

// export const httpOptions = {
//   headers: new HttpHeaders({
//     'Authorization': 'Bearer '+ authToken.token
//   })
// };

// console.log(httpOptions,'work')
