import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private httpClient: HttpClient) { }

  saveContact(contact) {
    const postURL = 'http://localhost:8080/addressbook/create' 
    return this.httpClient.post(postURL, contact);
  }
}
