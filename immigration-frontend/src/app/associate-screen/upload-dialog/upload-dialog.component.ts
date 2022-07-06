import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ImmigrationService } from 'src/app/service/immigration.service';

@Component({
  selector: 'app-upload-dialog',
  templateUrl: './upload-dialog.component.html',
  styleUrls: ['./upload-dialog.component.css']
})
export class UploadDialogComponent implements OnInit {
  files: any = [];
  id: any;
  img_code:any;

  constructor(public dialogRef: MatDialogRef<UploadDialogComponent>,private route: Router, @Inject(MAT_DIALOG_DATA) public data, private immigrationService: ImmigrationService, private _snackBar: MatSnackBar, )
   { }

  ngOnInit(): void {
    this.id = this.data.name;
    this.img_code = this.data.img_code
    console.log(this.id, this.data.docs);
  }
  onFileChange(pFileList: any){
    console.log(pFileList.target.files)
    if ((pFileList.target as HTMLInputElement).files) {
      pFileList = pFileList.target.files;
    } else if(pFileList[0].name != null) {
      console.log('works');
      pFileList = pFileList;
    }
    let filename: any;
    filename = Object.keys(pFileList).map((key: any) => pFileList[key]);
    for (var key in pFileList) {
      console.log("key",key)
      // skip loop if the property is from prototype
      if (!pFileList.hasOwnProperty(key)) continue;
  console.log("pFileList[key]",pFileList[key]);
  this.files.push(pFileList[key]);
      var obj = pFileList[key];
      // for (var prop in obj) {
      //     // skip loop if the property is from prototype
      //     // if (!obj.hasOwnProperty(prop)) continue;
  
      //     // your code
      //     console.log(prop + " = " + obj[prop]);
      // }
  }
    // this.files.push(pFileList[0]);
    // console.log(this.files)
    this._snackBar.open("Uploaded Successfully !", 'Close', {
      duration: 2000,
    });
   
  }

  deleteFile(f: any){
    this.files = this.files.filter(function(w: any){ return w.name != f.name });
    this._snackBar.open("Deleted Successfully !", 'Close', {
      duration: 2000,
    });
  }
  
  deleteFromArray(index: any) {
    console.log(this.files);
    this.files.splice(index, 1);
  }

  onSubmit() {
    let formData: FormData = new FormData();
    for (const file of this.files) {
        formData.append('file', file) // file.name is optional
    }
    // formData.append('_id',this.id);
    console.log(formData)
    console.log("ftyyt",this.id);
    let postValue = { _id:this.id, gmr_docs : this.data.docs,img_code:this.img_code};
    formData.append('tags', JSON.stringify(postValue));
    this.immigrationService.updateDocuments(formData).subscribe((data:any) => {
      console.log(data);
      if(data.status == 201) {
        this._snackBar.open(data.message, '', {
          duration: 5000,
        });
        this.dialogRef.close(); 
        this.route.navigate(['/homepage']);
          window.location.reload();       
      }
    });
  }


}
