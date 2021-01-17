import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { HttpService } from '../../services/http.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.scss']
})
export class AddressFormComponent implements OnInit {
  id: any;
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

  constructor(  private formBuilder: FormBuilder, 
                private httpService: HttpService, 
                private router: ActivatedRoute,
                private navRouter: Router
              ) { }

  ngOnInit(){
    this.resetForm();
    this.checkForUpdate();
  }

  checkForUpdate() {
    this.id  = this.router.snapshot.params.id;
    if(this.id === null || this.id === undefined){
        return;
    }
    this.httpService.getEmployeePayrollDataById(this.id)
                          .subscribe((response: any) =>{
                              this.setForm(response.data);
                          });
  }

  setForm(contact: any) {
    this.contactForm = this.formBuilder.group({
      fullName: contact.fullName,
      phoneNumber: contact.phoneNumber,
      address: contact.address,
      city: contact.city,
      state: contact.state,
      zipcode: contact.zipcode
    });
  }

  resetForm() {
    this.contactForm = this.formBuilder.group({
      fullName: ['',Validators.compose([ Validators.required,Validators.pattern( '^[A-Z]{1}[a-zA-Z\\s]{2,}$' ) ]) ],
      phoneNumber: ['', Validators.compose([ Validators.required,Validators.pattern( /^([+])?(91)?[6-9]{1}[0-9]{9}$/ ) ]) ],
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
    addressArray.forEach( (word: string) => {
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
    if (this.validateFormInputs()) {
      alert(JSON.stringify(this.contactObj));
      this.saveOrUpdateContact();
      this.resetForm();
    }
    return;
  }

  validateFormInputs(): boolean {
    if( this.contactForm.controls['fullName'].valid &&
        this.contactForm.controls['phoneNumber'].valid &&
        this.contactForm.controls['address'].valid &&
        this.contactForm.controls['city'].valid &&
        this.contactForm.controls['state'].valid &&
        this.contactForm.controls['zipcode'].valid) {
    return true 
    } else {
      // this.contactForm.markAllAsTouched();
      console.log("Form validation is false");
      return false;
    }
  }

  setContactData() {
    this.contactObj.fullName = this.contactForm.value.fullName;
    this.contactObj.phoneNumber = this.contactForm.value.phoneNumber;
    this.contactObj.address = this.contactForm.value.address;
    this.contactObj.city = this.contactForm.value.city;
    this.contactObj.state = this.contactForm.value.state;
    this.contactObj.zipcode = this.contactForm.value.zipcode;
  }

  saveOrUpdateContact() {
    if(this.id === null || this.id === undefined){
      this.httpService.saveContact(this.contactObj)
                          .subscribe((response: any) => { 
                              console.log(response.data);
                          });
    } else {
      this.httpService.updateContact(this.id, this.contactObj)
                          .subscribe((response: any) => { 
                              console.log(response.data);
                          });
    }     
  }
}