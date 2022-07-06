import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
// import { user } from '../app.global';
import { ImmigrationService } from '../service/immigration.service';

@Component({
  selector: 'app-request-create',
  templateUrl: './request-create.component.html',
  styleUrls: ['./request-create.component.css']
})
export class RequestCreateComponent implements OnInit {
  personalDetails: any;
  projectDetails: any;
  passportDetails: any;
  user: any;
  visaDetails: any;
  maxSize: number = 2097152;
  minDate = new Date();
  maxDate:any;
  saveBtn: any;
  maritalStatus: any;
  genderStatus: any;
  cityStatus: any;
  countryStatus: any;
  selectedCriteria: any;
  unitstatus: any
  passport_date_issue: any;
  passport_number: any;
  passport_place_issue: any;
  birth_date: any;
  manager_name: any = []
  report_manager: any;
  emp_project_name: any = []
  project_manager_name: any = ''
  manager_id: any;
  date_formate: any;
  snapshot: any;
  band: any = [
    {
      "id": 44,
      "name": "GC"
    },
    {
      "id": 48,
      "name": "PC"
    },
    {
      "id": 34,
      "name": "VC"
    },
    {
      "id": 33,
      "name": "DC"
    },
    {
      "id": 47,
      "name": "AC1"
    },
    {
      "id": 45,
      "name": "AP1"
    },
    {
      "id": 46,
      "name": "AT1"
    },
    {
      "id": 12,
      "name": "AT2"
    },
    {
      "id": 13,
      "name": "A1"
    },
    {
      "id": 14,
      "name": "A2"
    },
    {
      "id": 8,
      "name": "L1"
    },
    {
      "id": 9,
      "name": "L2"
    },
    {
      "id": 5,
      "name": "M1"
    },
    {
      "id": 6,
      "name": "M2"
    },
    {
      "id": 10,
      "name": "M3"
    },
    {
      "id": 15,
      "name": "E1"
    },
    {
      "id": 35,
      "name": "E2"
    },
    {
      "id": 36,
      "name": "E3"
    },
    {
      "id": 2,
      "name": "EE"
    },
    {
      "id": 3,
      "name": "EX"
    }
  ];
  units: any = [
    {
      "id": "1",
      "name": "Product Engineering Services"
    },
    {
      "id": "2",
      "name": "Digital Technology Solutions"
    },
    {
      "id": "3",
      "name": "Enabling Function"
    }
  ]
  nationalities: any = [
    { "name": "Indian", "code": "IND" },
    { "name": "American", "code": "USA" },
    { "name": "Canadian", "code": "CAN" },
    { "name": "Mexican", "code": "MEX" },
    { "name": "British", "code": "UK" },
    { "name": "Germany", "code": "GER" },
    { "name": "Swedish", "code": "SWED" },
    { "name": "French", "code": "FRANCE" },
    { "name": "Romanian", "code": "ROM" },
    { "name": "UAE", "code": "UAE" },
    { "name": "Chinese", "code": "CHIN" },
    { "name": "Japnese", "code": "JAP" },
    { "name": "Korean", "code": "SKOR" }
  ]
  countries: any = [
    {
      "code": "1",
      "name": "USA"
    },
    {
      "code": "2",
      "name": "Canada"
    },
    {
      "code": "3",
      "name": "Mexico"
    },
    {
      "code": "4",
      "name": "United Kingdom"
    },
    {
      "code": "5",
      "name": "Germany"
    },
    {
      "code": "6",
      "name": "Sweden"
    },
    {
      "code": "7",
      "name": "France"
    },
    {
      "code": "8",
      "name": "Romania"
    },
    {
      "code": "9",
      "name": "UAE"
    },
    {
      "code": "10",
      "name": "China"
    },
    // {
    //     "code": "11",
    //     "name": "Japan"
    // },
    // {
    //     "code": "12",
    //     "name": "South Korea"
    // },
    {
      "code": "13",
      "name": "India"
    }

  ]
  requestValue: any;


  constructor(private immigrationService: ImmigrationService, private _snackBar: MatSnackBar, private router: Router, private route: ActivatedRoute) { }


  ngOnInit(): void {
    console.log(this.route.snapshot);
    this.maxDate = new Date();
    this.snapshot = this.route.snapshot.url[0].path
    this.user = JSON.parse(localStorage.getItem("currentUser"));
    console.log("userdetails", this.user)
    this.selectedCriteria = this.nationalities[0];
    this.unitstatus = this.units[0];
    this.report_manager = this.user.manager;
    this.immigrationService.getEmployeeDetails(this.user.id).subscribe((response: any) => {
      console.log("data", response);
      var project_details = response.data['employee_detail']['project_detail']
      if (this.snapshot == 'request-create') {
        var emp_passport_details = response.data['employee_detail']['emp_passport_details']
        console.log("data", emp_passport_details);
        this.manager_name = [];
        this.emp_project_name = [];
        if (emp_passport_details.length != 0) {
          this.cityStatus = emp_passport_details[0].city;
          this.countryStatus = emp_passport_details[0].country;
          this.selectedCriteria = emp_passport_details[0].nationality;
          this.passport_date_issue = emp_passport_details[0].passport_date_issue;
          this.passport_number = emp_passport_details[0].passport_number;
          this.passport_place_issue = emp_passport_details[0].passport_place_issue;
          this.birth_date = emp_passport_details[0].birth_date;
          if (emp_passport_details[0].name == 'PES') {
            this.unitstatus = 'Product Engineering Services'
          } else if (emp_passport_details[0].name == 'DTS') {
            this.unitstatus = 'Digital Technology Solutions'
          } else {
            this.unitstatus = 'Enabling Function'
          }
        }
      }

      if (project_details.length != 0) {
        project_details.forEach((data) => {
          this.manager_name.push({ "name": data.project_manager, 'manager_name': data.project_manager, 'manager_id': data.project_manager_id })
          this.emp_project_name.push({ "name": data.project_name, 'manager_name': data.project_manager, 'manager_id': data.project_manager_id })
        })
        console.log("sdsaddasd", this.manager_name)
      }
      this.emp_project_name.push({ "name": 'Others' })
      // else{
      //   this.immigrationService.getEmployeeDetails(this.user.manager).subscribe((manager_details: any) => {
      //     console.log("manager_details",manager_details.data["employee_detail"]["employee_name"]);
      //     this.project_manager_name = manager_details.data["employee_detail"]["employee_name"]
      //     this.manager_id = this.user.manager
      //   })
      //   console.log("dsdfsdccedsxz")
      //   this.emp_project_name.push({"name": 'Others'})
      // }
      console.log("sdsad", this.emp_project_name)
    })
    // this.immigrationService.getEmpPassportDetails(this.user.id).subscribe((response: any) => {
    //   console.log("datadedfd",response);
    // })
    if (this.user.marital_status == 'm') {
      this.maritalStatus = 'married'
    } else {
      this.maritalStatus = 'single'
    }
    if (this.user.gender == 'm') {
      this.genderStatus = 'male'
    } else {
      this.genderStatus = 'female'
    }
    this.saveBtn = 'Save & Next';
    this.personalDetails = new FormGroup({
      firstname: new FormControl("", [Validators.required]),
      lastname: new FormControl("", [Validators.required]),
      gender: new FormControl("", [Validators.required]),
      date_of_birth: new FormControl("", [Validators.required]),
      email: new FormControl("", [Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]),
      // phone_no: new FormControl("",[Validators.pattern('^[0-9]*$')]),
      phone_no: new FormControl("", [Validators.required, Validators.pattern('^[6-9]{1}[0-9]{9}')]),
      marital_status: new FormControl("", [Validators.required]),
      city: new FormControl("", [Validators.required]),
      country: new FormControl("", [Validators.required]),
      dependency: new FormControl("")
    });

    this.projectDetails = new FormGroup({
      designation: new FormControl("", [Validators.required]),
      band: new FormControl("", [Validators.required]),
      business_unit: new FormControl("", [Validators.required]),
      base_location: new FormControl("", [Validators.required]),
      project_name: new FormControl("", [Validators.required]),
      report_manager_name: new FormControl("disabled: true", [Validators.required]),
    });

    this.passportDetails = new FormGroup({
      nationality: new FormControl("", [Validators.required]),
      passport_number: new FormControl("", [Validators.required]),
      issue: new FormControl("", [Validators.required]),
      issue_date: new FormControl("", [Validators.required]),
      expiry_date: new FormControl("", [Validators.required]),
      place_of_birth: new FormControl("", [Validators.required,Validators.pattern('^[a-zA-Z]{1}[a-zA-Z0-9\ \-\_\/\0]*$'),Validators.maxLength(30),Validators.minLength(3)])
    });

    this.visaDetails = new FormGroup({
      from: new FormControl("", [Validators.required]),
      to: new FormControl("", [Validators.required]),
      visa_type: new FormControl("", [Validators.required]),
      visa_category: new FormControl("", [Validators.required]),
      report: new FormControl("")
    });

    // set default value to India //    
    this.visaDetails.controls.from.setValue('India');

    this.passportDetails.controls.issue_date.valueChanges.subscribe(value => {
      this.passportDetails.controls["expiry_date"].setValue(null)
      console.log("value", value);
      if (value != undefined) {
        var d = new Date(value);
        var year = d.getFullYear();
        var month = d.getMonth();
        var day = d.getDate();
        var c = new Date(year + 10, month, day - 1);
        console.log(c);
        var isoDateString = c.toISOString();
        console.log("isoDateString", isoDateString);
        var x = new Date(isoDateString)
        this.date_formate = x;
        var dd = x.getDate();
        var m = x.getMonth() + 1;
        console.log("month", m)
        var y = x.getFullYear();
        console.log("date", dd + '/' + m + '/' + y)
        this.passportDetails.controls["expiry_date"].setValue(m + '/' + dd + '/' + y);
      }

    })

    this.projectDetails.controls.project_name.valueChanges.subscribe(value => {
      console.log("serwerwer", value);
      if (value != 'Others') {
        this.projectDetails.controls["report_manager_name"].setValue(null);
        if (value && this.emp_project_name) {
          this.emp_project_name.forEach((data) => {
            console.log("dsfsd", data);
            if (value == data.name) {
              this.project_manager_name = data.manager_name;
              this.manager_id = data.manager_id;
            }
          })
        }
      } else {
        this.immigrationService.getEmployeeDetails(this.user.manager).subscribe((manager_details: any) => {
          console.log("manager_details", manager_details.data["employee_detail"]["employee_name"]);
          this.project_manager_name = manager_details.data["employee_detail"]["employee_name"]
          this.manager_id = this.user.manager
        })
      }
    });

    // edit function 

    if (this.route.snapshot.url[0].path == 'request-edit') {
      this.saveBtn = 'UPDATE';
      this.immigrationService.getRequestById(this.route.snapshot.params.id).subscribe((data: any) => {
        this.requestValue = data;
        console.log(data, this.requestValue, this.requestValue.data[0].firstname);

        this.personalDetails = new FormGroup({
          firstname: new FormControl(this.requestValue.data[0].firstname, [Validators.required]),
          lastname: new FormControl(this.requestValue.data[0].lastname, [Validators.required]),
          gender: new FormControl(this.requestValue.data[0].gender, [Validators.required]),
          date_of_birth: new FormControl(this.requestValue.data[0].date_of_birth, [Validators.required]),
          email: new FormControl(this.requestValue.data[0].email, [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]),
          phone_no: new FormControl(this.requestValue.data[0].phone_no, [Validators.required, Validators.pattern('^[0-9]*$')]),
          marital_status: new FormControl(this.requestValue.data[0].marital_status, [Validators.required]),
          city: new FormControl(this.requestValue.data[0].city, [Validators.required]),
          country: new FormControl(this.requestValue.data[0].country, [Validators.required])
        });
        this.projectDetails = new FormGroup({
          designation: new FormControl(this.requestValue.data[0].designation, [Validators.required]),
          band: new FormControl(this.requestValue.data[0].band, [Validators.required]),
          business_unit: new FormControl(this.requestValue.data[0].business_unit, [Validators.required]),
          base_location: new FormControl(this.requestValue.data[0].base_location, [Validators.required]),
          project_name: new FormControl(this.requestValue.data[0].project_name, [Validators.required]),
          other: new FormControl(""),
          report_manager_name: new FormControl(this.requestValue.data[0].report_manager_name, [Validators.required])
        });

        this.passportDetails = new FormGroup({
          nationality: new FormControl(this.requestValue.data[0].nationality, [Validators.required]),
          passport_number: new FormControl(this.requestValue.data[0].passport_number, [Validators.required]),
          issue: new FormControl(this.requestValue.data[0].issue, [Validators.required]),
          issue_date: new FormControl(this.requestValue.data[0].issue_date, [Validators.required]),
          expiry_date: new FormControl("", [Validators.required]),
          place_of_birth: new FormControl(this.requestValue.data[0].place_of_birth, [Validators.required,Validators.pattern('^[a-zA-Z]{1}[a-zA-Z0-9\ \-\_\/\0]*$'),Validators.maxLength(30),Validators.minLength(3)]),
          // ECNR_status: new FormControl(this.requestValue.data[0].ECNR_status)
        });

        this.visaDetails = new FormGroup({
          from: new FormControl(this.requestValue.data[0].from, [Validators.required]),
          to: new FormControl(this.requestValue.data[0].to, [Validators.required]),
          visa_type: new FormControl(this.requestValue.data[0].visa_type, [Validators.required]),
          visa_category: new FormControl(this.requestValue.data[0].visa_category, [Validators.required]),
          report: new FormControl(this.requestValue.data[0].report)
        });
        var x = new Date(this.requestValue.data[0].expiry_date)
        this.date_formate = x;
        var dd = x.getDate();
        var m = x.getMonth() + 1;
        console.log("month", m)
        var y = x.getFullYear();
        console.log("date", dd + '/' + m + '/' + y)
        var update_date = m + '/' + dd + '/' + y
        this.passportDetails.controls["expiry_date"].setValue(m + '/' + dd + '/' + y);
      });
      this.passportDetails.get("issue_date").valueChanges.subscribe(x => {
        console.log('firstname value changed')
        console.log(x)
      })
      //     this.passportDetails.controls.issue_date.valueChanges.subscribe(value => {
      //       console.log("wdqwwqwqd")
      //       this.passportDetails.controls["expiry_date"].setValue(null)
      // console.log("value",value);
      // var d = new Date(value);
      //     var year = d.getFullYear();
      //     var month = d.getMonth();
      //     var day = d.getDate();
      //     var c = new Date(year + 10, month, day - 1);
      //     console.log(c);
      //     var isoDateString = c.toISOString();
      //     console.log("isoDateString",isoDateString);
      //     var x = new Date(isoDateString)
      //     this.date_formate = x;
      //     var dd = x.getDate();
      //     var m = x.getMonth()+1;
      //     console.log("month",m)
      //     var y = x.getFullYear();
      // console.log("date",dd+'/' + m + '/'+ y)
      //     this.passportDetails.controls["expiry_date"].setValue(m+'/' + dd + '/'+ y);
      //     })

    }
  }

  getFilterData(event) {
    console.log(event, 'works');
    this.router.navigate(['/homepage']);
  }

  imgCheck(val) {
    if (this.route.snapshot.url[0].path == 'request-edit') {
      // var test = val;
      console.log(this.route.snapshot);
      var temp = '/imgr-view/'+this.route.snapshot.url[1].path;
      console.log(temp)
      this.router.navigate([temp]);
      // localStorage.setItem("imgView", JSON.stringify(test));
    } else {
      this.router.navigate(['/homepage'])
    }
  }

  dateFun() {
    // console.log("event",event)
    this.passportDetails.controls.issue_date.valueChanges.subscribe(value => {
      this.passportDetails.controls["expiry_date"].setValue(null)
      console.log("value", value);
      var d = new Date(value);
      var year = d.getFullYear();
      var month = d.getMonth();
      var day = d.getDate();
      var c = new Date(year + 10, month, day - 1);
      console.log(c);
      var isoDateString = c.toISOString();
      console.log("isoDateString", isoDateString);
      var x = new Date(isoDateString)
      this.date_formate = x;
      var dd = x.getDate();
      var m = x.getMonth() + 1;
      console.log("month", m)
      var y = x.getFullYear();
      console.log("date", dd + '/' + m + '/' + y)
      this.passportDetails.controls["expiry_date"].setValue(m + '/' + dd + '/' + y);
    })
  }

  onSubmit() {
    console.log("sdfsdfdsf", this.manager_id)
    console.log(this.personalDetails.value, this.passportDetails.value, this.projectDetails.value, this.visaDetails.value);
    if (this.personalDetails.invalid || this.passportDetails.invalid || this.projectDetails.invalid || this.visaDetails.invalid) {
      this._snackBar.open('Please fill all mandatory fields', '', {
        duration: 5000,
      });
      return;
    } else {
      let postValue = { ...this.personalDetails.value, ...this.passportDetails.value, ...this.projectDetails.value, ...this.visaDetails.value, };

      console.log(postValue);
      if (this.route.snapshot.url[0].path == 'request-edit') {
        postValue._id = this.route.snapshot.params.id;
        postValue.employee_docs = this.requestValue.data[0].employee_docs;
        postValue.gmr_docs = this.requestValue.data[0].gmr_docs;
        this.immigrationService.updateRequest(postValue, "none").subscribe((data: any) => {
          console.log(data);
          if (data.status == 201) {
            this._snackBar.open('Updated Successfully', '', {
              duration: 5000,
            });
            this.router.navigate(['/homepage']);
          }
        });
      } else if (this.route.snapshot.url[0].path == "request-create") {
        console.log('dsfdsfsdfsdf')
        postValue.status = 'Awaiting Documents';
        postValue.img_status = 'Yet to be done';
        postValue.emp_Id = this.user.id;
        postValue.manager_id = this.report_manager
        postValue.report_manager_id = this.manager_id
        postValue.expiry_date = this.date_formate
        console.log("postValue", postValue);
        this.immigrationService.requestAdd(postValue).subscribe((data: any) => {
          console.log(data);
          if (data.status == 201) {
            this._snackBar.open('Request Added Successfully', '', {
              duration: 5000,
            });
            this.router.navigate(['/add-document/' + data.data._id]);
          }
        });
      }
    }
  }

  openSnackBar() {
    this._snackBar.open('Added Successfully', '', {
      duration: 5000,
    });
  }

}
