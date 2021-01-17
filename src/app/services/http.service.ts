import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private baseURL:string = 'http://localhost:8080/addressbook';

  constructor(private httpClient: HttpClient) { }

  saveContact(contact: any) {
    const postURL = this.baseURL + '/create' 
    return this.httpClient.post(postURL, contact);
  }

  getData(): Observable<any> {
    const getURL = this.baseURL; 
    return this.httpClient.get(getURL);
  }

  deleteContactData(id: number) {
    const deleteURL = this.baseURL + '/delete/' + id; 
    return this.httpClient.delete(deleteURL);
  }

  getEmployeePayrollDataById(id: any) {
    const getURL = this.baseURL + '/get/' + id; 
    return this.httpClient.get(getURL);
  }

  updateContact(id: any, contactData) {
    const putURL = this.baseURL + '/update/' + id; 
    return this.httpClient.put(putURL, contactData);
  }
}
