import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BACK_END_URL, httpOptions } from '../app.global';

@Injectable({
  providedIn: 'root'
})

export class ImmigrationService {

  constructor(private http: HttpClient) { }

  userLogin(username, password){
    return this.http.post(BACK_END_URL+`api/user/login/authenticateUser`, {username: username, password: password})
  }

  requestAdd(postValue: any) {
    return this.http.post(BACK_END_URL+ `api/employee/add/`, postValue);  
  }

  getRequestById(id: any) {
    return this.http.get(BACK_END_URL+ `api/employee/get/` + id);  

  }

  updateRequest(postValue: any,mail) {
    return this.http.put(BACK_END_URL+ `api/employee/update/`+ mail, postValue);  
  }

  getAllRequest(type: any) {
    return this.http.get(BACK_END_URL+ `api/employee/getAll/`+ type);  
  }

  getEmployeeRequest(type: any) {
    console.log("type",type)
    return this.http.get(BACK_END_URL+ `api/employee/getEmployeeRequest/`+ type);  
  }

  getRepoteeRequestList(id: any) {
    return this.http.get(BACK_END_URL+ `api/employee/get_reportee_mapping_list/`+ id);
  }
  
  addDocuments(postValue: any) {
    return this.http.post(BACK_END_URL+ `api/employee/upload/docs/`, postValue);     
  }

  updateDocuments(postValue: any) {
    return this.http.post(BACK_END_URL+ `api/employee/upload/update/docs/`, postValue);     
  }

  reporteList(type: any) {
    console.log("type",type)
    return this.http.get(BACK_END_URL+ `api/employee/reporte_list/`+ type);     
  }

  downloadDocuments(path: any) {
    return this.http.post(BACK_END_URL+`api/employee/download/docs`,path);
  }

  addGmrDocuments(postValue) {
    return this.http.post(BACK_END_URL+ `api/employee/GMR/upload/docs/`, postValue)
  }

  imgStatusUpdate(postValue:any,img_id) { 
    return this.http.post(BACK_END_URL+ `api/employee/gmr/status/update/`+ img_id, postValue)
  }
  
  getEmployeeDetails(employee_id:any) {
    return this.http.get(BACK_END_URL + `api/employee/get_employee_details/` + employee_id)
}

chatEmployeeDetails(employee_id:any) {
  return this.http.get(BACK_END_URL + `api/employee/chat_employee_details/` + employee_id)
}

getEmpPassportDetails(employee_id:any) {
  return this.http.get(BACK_END_URL + `api/employee/get_employee_passport_details/` + employee_id)
}

// getEmployeeChecklist(type: any) {
//   console.log("type",type)
//   return this.http.get(BACK_END_URL+ `api/employee/getEmployeechecklist/`+ type);  
// }

}
