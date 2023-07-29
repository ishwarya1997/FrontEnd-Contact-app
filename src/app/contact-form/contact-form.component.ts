import { Component, ViewChild, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
// import { Contact } from '../contact.interface';
import { state } from 'src/assets/json/state';
import { country } from 'src/assets/json/country';
import { contact } from '../model/contact';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Validation } from 'src/app/common/validation';
import { ContactService } from '../services/contact.service';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})

export class ContactFormComponent implements OnInit {
  addcontact!: FormGroup;
  private validation=new Validation();
  stateList!: any[];
  countryList!: any[];
  contact: contact = {
    id: undefined,
    firstName: undefined,
    lastName: undefined,
    email: undefined,
    phoneNumber: undefined,
    address: undefined,
    city: undefined,
    state: '',
    country: '',
    postalCode: ''
  };

  constructor(private router: Router,private contactservice: ContactService) {}

  ngOnInit() {   
    this.stateList = state
    this.countryList = country
    this.addcontact = new FormGroup({
      FirstName: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      LastName: new FormControl('', [Validators.required, Validators.maxLength(15)]),
      PhoneNumber: new FormControl('',[Validators.required, Validators.maxLength(10)]),
      Email: new FormControl('',[Validators.required, Validators.maxLength(10)]),
      Address: new FormControl('',[Validators.required, Validators.maxLength(40)]),
      City: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      State: new FormControl(''),
      Country: new FormControl(''),
      PostalCode: new FormControl(''),

    });
  }
  //---------Number Press Event-------------------------
  numberOnly(event: any) {
    this.validation.number(event);
   }
   keyPressAlpha(event:any){
     this.validation.keyPressAlpha(event);
   }
   keyPressAlphanumeric(event:any){
     this.validation.keyPressAlphanumeric(event);
   }
   keyPressexceptional(event:any){
     this.validation.keyPressexceptional(event);
   }
   NavigateToList(){
    this.router.navigate(['/content-list']);
  }
   savedata(): void {
    if (this.addcontact.valid) {
      const contactValue = this.addcontact.value;
      // this.contactservice.setContactValue(contactValue);
      this.NavigateToList();
    }
  }
 
}
