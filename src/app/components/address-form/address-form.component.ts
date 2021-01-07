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

  onNameChange() {
    let nameRegex = RegExp('^[A-Z]{1}[a-zA-Z\\s]{2,}$');
    if (nameRegex.test(this.contact.value.fullName))
        this.errorText = "";
    else
        this.errorText = 'Name is incorrect!';
  }

  onPhoneNumberChange() {
    const phoneNumberRegex = RegExp('^([+])?(91)?[6-9]{1}[0-9]{9}$');
    if (phoneNumberRegex.test(this.contact.value.phoneNumber))
        this.errorText = '';
    else
        this.errorText = 'Entered invalid phone number.'
  }

  onAddressChange(){
    const addressRegex = RegExp('^.{3,}$');
    var addressArray = this.contact.value.address.split(",");
    let validWords = 0;
    addressArray.forEach( word => {
        if(addressRegex.test(word)){
            validWords++;
        }
    });
    if (addressArray.length == validWords)
        this.errorText = "";
    else
        this.errorText = 'Enter proper address!';  
  }

}