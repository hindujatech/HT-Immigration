import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { ImmigrationService } from '../service/immigration.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  managerTgl = false;
  imgTgl:any = false;
  user: any;
  managerView: boolean;
  // imgView: boolean;
  manager_id:any;
  @Output() toggleEvent = new EventEmitter<object>();
  @Input() imgView: any;
  isManger:any;
  isImg:any;
  user_name:any;
  constructor(private immigrationService: ImmigrationService, private _snackBar: MatSnackBar, private router: Router, private route: ActivatedRoute) { }
  
  ngOnInit(): void {
    
    this.user = JSON.parse(localStorage.getItem("currentUser"));
    this.imgView = JSON.parse(localStorage.getItem("imgView"));
    this.user_name = this.user.first_name
    // document.getElementById("user_name").innerHTML = this.user.first_name;
    console.log(this.user);
    if(this.user.is_manager){
      console.log("sdasdasdsa")
    this.manager_id = this.user.id
    }
    console.log('img', this.imgView);
    if(this.imgView) {
      this.imgTgl = true;
      this.toggleEvent.emit({img: this.imgTgl, manager: false });
      localStorage.removeItem("imgView");
    }
    this.isManger = JSON.parse(localStorage.getItem("isManager"));
    this.isImg = JSON.parse(localStorage.getItem("isImg"));
    console.log("thisasa",this.isManger)
    if(this.isManger != null && this.isManger.manager == true){
      console.log("sadsdad");
      this.managerTgl = true
    }
    if(this.isImg != null && this.isImg.img == true){
      console.log("sadsdad");
      this.imgTgl = true
    }
  }
 
  
  toggle1(event: MatSlideToggleChange) {
    this.managerTgl = event.checked; 
    if(this.managerTgl == true) {
      this.imgTgl = false;
      localStorage.setItem("isManager",JSON.stringify({img: this.imgTgl, manager: this.managerTgl,manager_id: this.manager_id}) );
      localStorage.removeItem("isImg");
    } else{
      console.log("dfsfsdsdfsfs")
      localStorage.removeItem("isManager");
    }
    this.router.navigate(['/homepage']);
    console.log(this.managerTgl,'manager');
    console.log(this.imgTgl,'img');
    this.toggleEvent.emit({img: this.imgTgl, manager: this.managerTgl,manager_id: this.manager_id});
    console.log("ytyuty",this.manager_id);
    // this.immigrationService.reporteList(this.manager_id).subscribe((data: any)=> {
    //   console.log(data);
    //   // this.openSnackBar();
    //   // window.location.reload();
    // });  

  }
  toggle2(event: MatSlideToggleChange) {
    console.log(event);
    this.imgTgl = event.checked; 
    if(this.imgTgl == true) {
      this.managerTgl =  false;
      localStorage.setItem("isImg",JSON.stringify({img: this.imgTgl, manager: this.managerTgl}) );
      localStorage.removeItem("isManager");
    } else{
      localStorage.removeItem("isImg");
    }
    console.log(this.managerTgl,'manager');
    console.log(this.imgTgl,'img');
    this.toggleEvent.emit({img: this.imgTgl, manager: this.managerTgl });
  }

  logOut() {
    // this.bottomSheetRef.dismiss();
    //     this.dialogRef.closeAll();
    // window.localStorage.removeItem("currentUser");
    // window.localStorage.clear();
    localStorage.removeItem('currentUser');
    localStorage.clear();
    this.router.navigate(['/login']);
  }

}
