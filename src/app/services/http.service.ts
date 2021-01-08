import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private httpClient: HttpClient) { }

  saveContact(contact) {
    const postURL = 'http://localhost:8080/addressbook/create' 
    return this.httpClient.post(postURL, contact);
  }

  getData(): Observable<any> {
    const getURL = 'http://localhost:8080/addressbook/' 
    return this.httpClient.get(getURL);
  }
}
