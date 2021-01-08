import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  contactsList = [];
  contactsCount: number;

  constructor(private httpService: HttpService) { }

  ngOnInit(): void {
    this.getAddressBookDataFromServer();
  }
  
  getAddressBookDataFromServer() {
    this.httpService.getData()
                    .subscribe((response) =>{  
                          this.contactsList  = response.data;
                          this.setContactsCount();
                    });
  }

  setContactsCount() {
        this.contactsCount = this.contactsList.length; 
  }

}
