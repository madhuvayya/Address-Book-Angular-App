import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms'

@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.scss']
})
export class AddressFormComponent implements OnInit {
  contact: FormGroup;
  errorText: string;

  constructor() {}

  ngOnInit(){
    this.contact = new FormGroup({
      fullName: new FormControl(),
      phoneNumber: new FormControl(),
      address: new FormControl(),
      city: new FormControl(),
      state: new FormControl(),
      zipcode: new FormControl()
    })
  }

  save(): void{
    console.log(this.contact.value);
  }


}