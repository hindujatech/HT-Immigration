import { Component, OnInit } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { FileUploader } from 'ng2-file-upload';
import { FileService } from '../service/file.service';
import { ImmigrationService } from '../service/immigration.service';
import { saveAs } from 'file-saver';


@Component({
  selector: 'app-add-document',
  templateUrl: './add-document.component.html',
  styleUrls: ['./add-document.component.css']
})
export class AddDocumentComponent implements OnInit {

  files: any = [];
  id: any;
  progress: number;

  // uploader:FileUploader = new FileUploader({url:uri});
  //  uploader:FileUploader = new FileUploader({
  //   url: uri, 
  //   disableMultipart:true
  //   });
  attachmentList:any = [];


  constructor(private immigrationService: ImmigrationService, private _snackBar: MatSnackBar, private _fileService:FileService, private router: Router, private route: ActivatedRoute) 
  { }
  
  ngOnInit(){
    this.id = this.route.snapshot.params.id;
    console.log(this.id);
    
  }

  download(index){
    var filename = this.attachmentList[index].uploadname;
    this._fileService.downloadFile(filename)
    .subscribe(
        data => saveAs(data, filename),
        error => console.error(error)
    );
  }


  onFileChange(pFileList: any) {
    console.log(pFileList.target.files)
    if ((pFileList.target as HTMLInputElement).files) {
      pFileList = pFileList.target.files;
    } else if (pFileList[0].name != null) {
      console.log('works');
      pFileList = pFileList;
    }
    let filename: any;
    filename = Object.keys(pFileList).map((key: any) => pFileList[key]);
    for (var key in pFileList) {
      console.log("key", key)
      // skip loop if the property is from prototype
      if (!pFileList.hasOwnProperty(key)) continue;
      console.log("pFileList[key]", pFileList[key]);
      this.files.push(pFileList[key]);
      this._snackBar.open("Uploaded Successfully !", 'Close', {
        duration: 2000,
      });
    }
  }
  // onFileChange(pFileList: any){
  //   console.log(pFileList.target.files)
  //   if ((pFileList.target as HTMLInputElement).files) {
  //     pFileList = pFileList.target.files;
  //   } else if(pFileList[0].name != null) {
  //     console.log('works');
  //     pFileList = pFileList;
  //   }
  //   let filename: any;
  //   filename = Object.keys(pFileList).map((key: any) => pFileList[key]);
  //   this.files.push(pFileList[0]);
  //   console.log(this.files)
  //   this._snackBar.open("Successfully upload!", 'Close', {
  //     duration: 2000,
  //   });
   
  // }

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
    formData.append('_id',this.id);
    formData.append('status','Awaiting Manager Approval');
    console.log(formData)
    this.immigrationService.addDocuments(formData).subscribe((data:any) => {
      console.log(data);
      if(data.status == 201) {
        this._snackBar.open(data.message, '', {
          duration: 5000,
        });
        this.router.navigate(['/homepage']);
      }
    });
  }

}
