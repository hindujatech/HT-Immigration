import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { saveAs } from 'file-saver';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ImmigrationService } from '../service/immigration.service';
import * as XLSX from 'xlsx';
import * as JSZip from 'jszip';
import { MatDialog } from '@angular/material/dialog';
import { UploadDialogComponent } from './upload-dialog/upload-dialog.component';
import { BACK_END_URL } from '../app.global';
import { HeaderComponent } from '../header/header.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-associate-screen',
  templateUrl: './associate-screen.component.html',
  styleUrls: ['./associate-screen.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', visibility: 'hidden' })),
      state('expanded', style({ height: '*', visibility: 'visible' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class AssociateScreenComponent implements OnInit {

  displayedColumns: string[] = ['IMG_code', 'name', 'visa_type', 'destination_country', 'status', 'img_status', 'action'];
  dataSource: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  // dataSource = new MatTableDataSource<Element>(ELEMENT_DATA);
  // @ViewChild(MatPaginator)
  // paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  appovalForm: any;
  approved: any;
  user: any;
  rejected: any;
  view_type: any;
  comments: any;
  // user:any;
  expandedElement: any;
  employeeDocs: any;
  fileName = 'ExcelSheet.xlsx';
  renderedData: any = [];
  exportData: any
  @ViewChild('TABLE') table: ElementRef;
  exportActive: boolean = false;
  gmrDocs: any;
  @ViewChild(HeaderComponent)
  isManger: any;
  isImg: any;
  searchName: any;
  emp_data:any;
  chat_emp_id:any;
  headerComponent: HeaderComponent;
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

  isExpansionDetailRow = (index: any, row: { hasOwnProperty: (arg0: string) => any; }) => row.hasOwnProperty('detailRow');

  constructor(private immigrationService: ImmigrationService, private route: Router, private _snackBar: MatSnackBar, public dialog: MatDialog,
    private http: HttpClient, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    // this.spinner.show();
    this.approved = 'Approved';
    this.rejected = 'Rejected';
    this.user = JSON.parse(localStorage.getItem("currentUser"));

    this.isManger = JSON.parse(localStorage.getItem("isManager"));
    this.isImg = JSON.parse(localStorage.getItem("isImg"));
    console.log("thisasa", this.isManger)
    console.log("thisasa", this.isImg)
    if (this.isManger != null && this.isManger.manager == true) {
      this.getFilterData(this.isManger)
      console.log("manager")
    } else if (this.isImg != null && this.isImg.img == true) {
      this.getFilterData(this.isImg)
      console.log("immigration")
    }
    else {
      this.getEmployeeRequestData();
      console.log("employee")
    }
  }

  // ngAfterViewInit() {
  //   this.dataSource.paginator = this.paginator;
  // }

  // applyFilter(filterValue: string) {
  //   console.log("filterValue", filterValue);
  //   if (filterValue != '') {
  //     this.mapping_data.filter = filterValue.trim().toLowerCase();
  //   } 
  // }

  chekListPdf(data){
    console.log("country",data);
    if(data == 'USA'){
      var path = 'uploads/checklist/UK.pdf'
    }
    else if (data == 'Canada'){
      var path = 'uploads/checklist/UK.pdf'
    } else if (data == 'Mexico'){
      var path = 'uploads/checklist/UK.pdf'
    } else if (data == 'United Kingdom'){
      var path = 'uploads/checklist/UK.pdf'
    } else if (data == 'Germany'){
      var path = 'uploads/checklist/UK.pdf'
    } else if (data == 'Sweden'){
      var path = 'uploads/checklist/UK.pdf'
    } else if (data == 'Romania'){
      var path = 'uploads/checklist/UK.pdf'
    } else if (data == 'UAE'){
      var path = 'uploads/checklist/UK.pdf'
    } else if (data == 'China'){
      var path = 'uploads/checklist/UK.pdf'
    } else if (data == 'India'){
      var path = 'uploads/checklist/UK.pdf'
    } 
    let headers = new HttpHeaders({
      "Authorization": "Bearer " + this.user.token,
    });
    this.http.get(BACK_END_URL + path, { headers, responseType: "blob" })
      .toPromise()
      .then(blob => {
        saveAs(blob, data + " " + 'checklist');
      })
      .catch(err => console.error("download error = ", err));
  }

  getEmployeeRequestData() {
    setTimeout(() => {
      console.log("asdsa", this.user.id)
      this.immigrationService.getEmployeeRequest(this.user.id)
        .subscribe((data: any) => {
          console.log(data.data);
          data.data.sort((a, b) => b.created_date.localeCompare(a.created_date));
          this.view_type = 'employee';
          this.dataSource = new MatTableDataSource(data.data);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.renderedData = data.data;
          console.log("this.renderedData",typeof this.renderedData);
          // this.spinner.hide();
        });
    }, 0);
  }

  getExportRequestData(data) {
    console.log("asdsa", data)
    var renderdata = [];
    data.forEach((res) => {
      // console.log("data", res);
      delete res.employee_docs
      delete res.gmr_docs
      delete res.__v
      delete res.emp_Id
      delete res.manager_id
      var d = new Date(res.created_date);
      var year = d.getFullYear();
      var month = d.getMonth() + 1;
      var day = d.getDate()
      res.created_date = day + "-" + month + "-" + year

      var c = new Date(res.date_of_birth);
      var year = c.getFullYear();
      var month = c.getMonth() + 1;
      var day = c.getDate()
      res.date_of_birth = day + "-" + month + "-" + year

      var b = new Date(res.expiry_date);
      var year = b.getFullYear();
      var month = b.getMonth() + 1;
      var day = b.getDate()
      res.expiry_date = day + "-" + month + "-" + year

      var a = new Date(res.issue_date);
      var year = a.getFullYear();
      var month = a.getMonth() + 1;
      var day = a.getDate()
      res.issue_date = day + "-" + month + "-" + year
      renderdata.push(res)
      // console.log("daasdasd", renderdata)
    })
    this.exportData = renderdata
    console.log("asdasd", this.exportData);
  }

  getFilterData($event) {
    console.log($event, 'works');
    this.spinner.show();
    setTimeout(() => {
      if ($event.img == true) {
        this.immigrationService.getAllRequest('img_team')
          .subscribe((data: any) => {
            console.log(data.data);
            data.data.sort((a, b) => b.created_date.localeCompare(a.created_date));
            this.view_type = 'img_team';
            this.dataSource = new MatTableDataSource(data.data);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            this.renderedData = data.data;
  //           var excelArrayImg = []
  //           this.renderedData.forEach((res) =>{
  // // console.log("adsad",res);
  // excelArrayImg.push(res)
  //           })
  //           console.log("asdasd",excelArrayImg)
  //           this.getExportRequestData(excelArrayImg);
  //         console.log("dsdfds",this.renderedData)
            // this.spinner.hide();
          });
          // setTimeout(() => {
           
          // }, 500);

          this.immigrationService.getAllRequest('img_team').subscribe((result: any) => { 
            this.renderedData = result.data;
            var excelArrayImg =  this.renderedData;
            // this.renderedData.forEach((res) =>{
            //   console.log("adsad",res);
            //   excelArrayImg.push(res)
            // })
            console.log("asdasd",excelArrayImg)
            this.getExportRequestData(excelArrayImg);
            console.log(" this.renderedData",typeof this.renderedData)
            this.spinner.hide();
          })
            
         
      } else if ($event.manager == true) {
        // this.immigrationService.getRepoteeRequestList(this.user.manager)
        // .subscribe((data: any) => {
        //   console.log(data);
        // });
        console.log("asdds", $event.manager_id)
        this.immigrationService.reporteList($event.manager_id).subscribe((data: any) => {
        
          console.log(data);
          // this.openSnackBar();
          // window.location.reload();
          data.data.sort((a, b) => b.created_date.localeCompare(a.created_date));
          this.view_type = 'manager';
          this.dataSource = [];
          this.dataSource = new MatTableDataSource(data.data);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
         
        });

        this.immigrationService.reporteList($event.manager_id).subscribe((result: any) => { 
          this.renderedData = result.data;
          var excelArrayManager =  this.renderedData;
          this.renderedData.forEach((res) =>{
            console.log("adsad",res);
            excelArrayManager.push(res)
          })
          console.log("asdasd",excelArrayManager)
          this.getExportRequestData(excelArrayManager);
          console.log(" this.renderedData",typeof this.renderedData)
          this.spinner.hide();
        })

        
        // this.immigrationService.getAllRequest('manager')
        // .subscribe((data: any) => {
        //   console.log(data);
        //   data.data.sort((a,b) => b.created_date.localeCompare(a.created_date));
        //   this.view_type = 'manager';
        //   this.dataSource = new MatTableDataSource(data.data);
        //   this.dataSource.paginator = this.paginator;
        //   this.dataSource.sort = this.sort;
        //   this.renderedData =data.data;
        //   this.spinner.hide();
        // });
      } else {
        console.log($event);
        this.getEmployeeRequestData();
        this.spinner.hide();
      }
    }, 300);
  }

  expendedFun(element){
    console.log("element",element);
   // this.user = JSON.parse(localStorage.getItem("currentUser"));
    this.chat_emp_id = element._id
    this.emp_data = {emp_id:element._id,chat_on:'emp',emp_number:element.emp_Id}
    console.log("sfsf",this.emp_data)
  }
  viewDocument(path, name) {
    let headers = new HttpHeaders({
      "Authorization": "Bearer " + this.user.token,
    });
    this.http.get(BACK_END_URL + path, { headers, responseType: "blob" })
      .toPromise()
      .then(blob => {
        var _url = window.URL.createObjectURL(blob);
        window.open(_url, name);
      })
      .catch(err => console.error("download error = ", err));
  }

  downloadDocument(path, name) {
    console.log("asdasd",path)
    let headers = new HttpHeaders({
      "Authorization": "Bearer " + this.user.token,
    });
    this.http.get(BACK_END_URL + path, { headers, responseType: "blob" })
      .toPromise()
      .then(blob => {
        saveAs(blob, name);
      })
      .catch(err => console.error("download error = ", err));
  }

  toArray(tilecollection: object) {
    return Object.keys(tilecollection).map(key => tilecollection[key]);
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  navigateRequest(rowValue: any) {
    console.log("rowValue",rowValue);
    if (this.view_type == 'img_team') {
      this.route.navigate(['/imgr-view/' + rowValue._id]);
    } else if (this.view_type == 'employee') {
      this.route.navigate(['/request-edit/' + rowValue._id]);
    }
  }

  onBlurMethod(message) {
    this.comments = message.value;
  }

  onClick(value, id, docs) {
    console.log("docs",docs)
    let postValue = { comments: this.comments, status: value, _id: id, employee_docs: docs };
    // postValue.employee_docs = this.employeeDocs;
    console.log("asdasd",value)
    if (value == 'Approved') {
      this.immigrationService.updateRequest(postValue, "true").subscribe((data: any) => {
        console.log(data);
        this.openSnackBar();
        window.location.reload();
      });
    } else if (value == 'Rejected') {
      this.immigrationService.updateRequest(postValue, "false").subscribe((data: any) => {
        console.log(data);
        this.openSnackBar();
        window.location.reload();
      });
    }


  }

  openSnackBar() {
    this._snackBar.open('Updated Successfully', '', {
      duration: 5000,
    });
  }

  ExportTOExcel() {
    console.log("asdsad",this.exportData)
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.exportData);
    delete (ws['O1'])
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'SheetJS.xlsx');
  }

  // const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.table.nativeElement);
  //   delete (ws['O1'])
  //   /* O1 is your Column in Excel*/

  //   const wb: XLSX.WorkBook = XLSX.utils.book_new();
  //   XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  //   /* save file */
  //   XLSX.writeFile(wb, 'SheetTest.xlsx');

  downloadAllEmpDocuments(files) {
    console.log(files)
    var zip = new JSZip();
    for (let i = 0; i < files?.length; i++) {
      let headers = new HttpHeaders({
        "Authorization": "Bearer " + this.user.token,
      });
      this.http.get(BACK_END_URL + files[i].filepath, { headers, responseType: "blob" })
        .toPromise()
        .then(blob => {
          saveAs(blob, files[i].originalname);
        })
        .catch(err => console.error("download error = ", err));
      //  saveAs(BACK_END_URL+files[i].filepath, files[i].originalname); 
    }
  }

  openDialog(element: any, docs: any): void {
    console.log("element",element);
    const dialogRef = this.dialog.open(UploadDialogComponent, {
      width: '850px',
      data: { name:element._id, docs: docs,img_code:element.IMG_code }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
