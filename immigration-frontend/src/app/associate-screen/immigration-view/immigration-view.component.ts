import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { ImmigrationService } from 'src/app/service/immigration.service';
import { saveAs } from 'file-saver';
import * as JSZip from 'jszip';
import * as FileSaver from 'file-saver';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as XLSX from 'xlsx';
import { BACK_END_URL } from 'src/app/app.global';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { files } from 'jszip';



@Component({
  selector: 'app-immigration-view',
  templateUrl: './immigration-view.component.html',
  styleUrls: ['./immigration-view.component.css']
})
export class ImmigrationViewComponent implements OnInit {
  element: any;
  employeeDocs: any;
  files: any = [];
  caseDetail: any;
  id: any;
  user: any
  excelFile: any = [];
  gmrDocs: any;
  test;
  emp_data: any;
  isVisa: boolean;
  img_id: any;
  emp_docs: any;
  gmr_bool: any;
  img_docs_bool: any;


  constructor(private immigrationService: ImmigrationService, private _snackBar: MatSnackBar, private router: Router, private route: ActivatedRoute,
    private http: HttpClient) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    this.user = JSON.parse(localStorage.getItem("currentUser"));
    console.log("asdsa", this.user)
    this.img_id = this.user.id
    this.immigrationService.getRequestById(this.route.snapshot.params.id).subscribe((data: any) => {
      this.element = data.data[0];
      localStorage.setItem("chatEmpDetails", JSON.stringify(this.element));
      this.emp_data = { emp_id: this.route.snapshot.params.id, chat_on: 'img', emp_number: this.element.emp_Id }
      console.log(this.element);
      if (this.element.status == "Awaiting Manager Approval") {
        this.img_docs_bool = false
      } else {
        this.img_docs_bool = true
      }
      if (this.element.img_status == 'Visa Approved' || this.element.img_status == 'Visa Denied') {
        this.isVisa = false
        console.log("sdasd")
      } else {
        this.isVisa = true
        console.log("sdasdsdfserew")
      }
      this.excelFile.push(this.element);
      console.log("asdwda", typeof data.data[0].employee_docs, data.data[0].employee_docs)

      this.employeeDocs = data.data[0].employee_docs;
      this.gmrDocs = data.data[0].gmr_docs;
      if (this.element.employee_docs.length == 0) {
        this.emp_docs = false
        console.log("werwer")
      } else {
        this.emp_docs = true
        console.log("asdasderter")
      }
      if (this.gmrDocs.length == 0) {
        this.gmr_bool = false
      } else {
        this.gmr_bool = true
      }
      this.caseDetail = new FormGroup({
        case_status: new FormControl(this.element.img_status, [Validators.required])
      });
      console.log(this.employeeDocs[0])
    });

  }

  getFilterData(event) {
    console.log(event, 'works');
    this.router.navigate(['/homepage']);
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

  downloadAllEmpDocuments() {
    var zip = new JSZip();
    for (let i = 0; i < this.employeeDocs?.length; i++) {
      let headers = new HttpHeaders({
        "Authorization": "Bearer " + this.user.token,
      });
      this.http.get(BACK_END_URL + this.employeeDocs[i].filepath, { headers, responseType: "blob" })
        .toPromise()
        .then(blob => {
          saveAs(blob, this.employeeDocs[i].originalname);
        })
        .catch(err => console.error("download error = ", err));
      //  for (let i = 0; i < this.employeeDocs?.length; i++) {

      //  saveAs(BACK_END_URL+this.employeeDocs[i].filepath, this.employeeDocs[i].originalname); 

    }

  }

  onFileChange(pFileList: any) {
    if ((pFileList.target as HTMLInputElement).files) {
      pFileList = pFileList.target.files;
    } else if (pFileList[0].name != null) {
      pFileList = pFileList;
    }
    let filename: any;
    filename = Object.keys(pFileList).map((key: any) => pFileList[key]);
    this.files.push(pFileList[0]);
    console.log(this.files)
    this._snackBar.open("Successfully upload!", 'Close', {
      duration: 2000,
    });
  }

  deleteFile(f: any) {
    this.files = this.files.filter(function (w: any) { return w.name != f.name });
    this._snackBar.open("Successfully delete!", 'Close', {
      duration: 2000,
    });
  }

  onSubmit() {
    console.log(this.caseDetail.value.case_status);
    if (this.caseDetail.invalid) {
      this._snackBar.open('Please select the status', '', {
        duration: 5000,
      });
      return;
    } else {

      console.log(this.files, 'files');
      if (this.files.length > 0) {
        let formData: FormData = new FormData();
        for (const file of this.files) {
          formData.append('file', file);
        }
        let postValue = { _id: this.route.snapshot.params.id, employee_docs: this.employeeDocs, gmr_docs: this.gmrDocs };
        formData.append('tags', JSON.stringify(postValue));
        console.log(formData);
        this.immigrationService.addGmrDocuments(formData).subscribe((data: any) => {
          if (data.status == 201) {
            console.log(data);
          }
        });
      }
      let postValue = { _id: this.route.snapshot.params.id, img_status: this.caseDetail.value.case_status, employee_docs: this.employeeDocs, gmr_docs: this.gmrDocs };
      this.immigrationService.imgStatusUpdate(postValue, this.img_id).subscribe((data: any) => {
        if (data.status == 201) {
          this._snackBar.open(data.message, '', {
            duration: 5000,
          });
          this.test = true;
          localStorage.setItem("imgView", JSON.stringify(this.test));
          this.router.navigate(['/homepage']);
        }
      })

    }

  }

  ExportTOExcel() {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.excelFile);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'SheetJS.xlsx');

  }

  imgCheck(val) {
    this.test = val;
    console.log(this.test);
    localStorage.setItem("imgView", JSON.stringify(this.test));
  }

}
