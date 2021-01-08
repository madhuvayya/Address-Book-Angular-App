import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { HttpService } from '../../services/http.service'

@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.scss']
})
export class AddressFormComponent implements OnInit {
  contact: FormGroup;
  errorText: string;
  contactForm: any;
  contactObj = {    
    fullName: '',
    phoneNumber: '',
    address: '',
    city: '',
    state: '',
    zipcode: ''
  };

  constructor(private formBuilder: FormBuilder, private httpService: HttpService ) {}

  ngOnInit(){
    this.resetForm();
  }

  resetForm() {
    this.contactForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipcode: ['', Validators.required]
    });
  }

  onNameChange() {
    let nameRegex = RegExp('^[A-Z]{1}[a-zA-Z\\s]{2,}$');
    if (nameRegex.test(this.contactForm.value.fullName))
        this.errorText = "";
    else
        this.errorText = 'Name is incorrect!';
  }

  onPhoneNumberChange() {
    const phoneNumberRegex = RegExp('^([+])?(91)?[6-9]{1}[0-9]{9}$');
    if (phoneNumberRegex.test(this.contactForm.value.phoneNumber))
        this.errorText = '';
    else
        this.errorText = 'Entered invalid phone number.'
  }

  onAddressChange(){
    const addressRegex = RegExp('^.{3,}$');
    var addressArray = this.contactForm.value.address.split(",");
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

  save(){
    this.setContactData();
    alert(JSON.stringify(this.contactObj));
    this.saveContact();
    this.resetForm();
  }

  setContactData() {
    this.contactObj.fullName = this.contactForm.value.fullName;
    this.contactObj.phoneNumber = this.contactForm.value.phoneNumber;
    this.contactObj.address = this.contactForm.value.address;
    this.contactObj.city = this.contactForm.value.city;
    this.contactObj.state = this.contactForm.value.state;
    this.contactObj.zipcode = this.contactForm.value.zipcode;
  }

  saveContact() {
    this.httpService.saveContact(this.contactObj)
                      .subscribe((response: any) => { 
                        console.log(response.data);
                      });
  }
}