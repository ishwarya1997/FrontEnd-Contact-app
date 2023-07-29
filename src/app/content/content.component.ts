import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { ActivatedRoute } from '@angular/router';
import { ContactService } from '../services/contact.service';
import { contact } from '../model/contact';
import { Router } from '@angular/router';
// import { Contact } from '../contact.interface';
import { state } from 'src/assets/json/state';
import { country } from 'src/assets/json/country';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Validation } from 'src/app/common/validation';

import Swal from "sweetalert2";


@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit{
  addcontact!: FormGroup;
  private validation=new Validation();
  contactid!:number;
  stateList!: any[];
  countryList!: any[];
  contacts: any[] = [];
  ContactList: any = [];
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

  // constructor(private router: Router,private contactservice: ContactService) {}
  constructor(private formBuilder: FormBuilder,private router: Router,
    private contactservice: ContactService) {
    this.addcontact = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      country: ['', Validators.required],
      postalCode: ['']
    });
  }

  ngOnInit() {   
    this.stateList = state
    this.countryList = country
this.getContactList();
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
      this.contactservice.addContact(contactValue).subscribe(res => {
        console.log(res.toString());
      });
      console.log(contactValue);
      this.addcontact.reset();  
    
    }
    this.Popup('Data Saved Successfully.....!');
  }
  selectedContact: any; // Replace 'any' with the appropriate contact type
  modalOpen: boolean = false;
  isEditMode: boolean = false;

editContact(contact: any) {
  this.selectedContact = { ...contact }; // Make a copy of the contact to avoid modifying the original object
  this.isEditMode = true;
  this.contactid=this.selectedContact.id;
  console.log(this.selectedContact.id);
}
updateContact(contact: any) {
  if (this.addcontact.valid) {
    // const contactValue = this.addcontact.value;
    this.contactservice.updateContact(contact.value,this.contactid).subscribe(res => {
      console.log(res.toString());
    });
    console.log(contact);
    this.addcontact.reset();  
    this.Popup('Data Updated Successfully.....!');
  }

}
deleteContact(contact: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'No, cancel!',
      cancelButtonColor:' #A11F21',
      confirmButtonText: 'Yes, delete it!',
      confirmButtonColor: '#007500',
      customClass: {
        actions: 'my-actions',
        cancelButton: 'order-1 right-gap',
        confirmButton: 'order-2',
      }
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title:'Deleted!',
          text:'your file has been deleted',
          icon:'success',
          confirmButtonColor:'green',
          confirmButtonText:'OK',
          customClass:{
            confirmButton:'btn btn-success fw-bold col px-md-5',
          },
          buttonsStyling: false, 
        })
       try {
       console.log(contact.id);
        this.contactservice.deleteContact(contact.id).subscribe(data => {
          console.log(data.toString());
          this.getContactList();
        })
          } catch (e) {}
        }else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          Swal.fire(
            {
              title:'Cancelled!',
              text:'Your file is safe :)',
              icon:'error',
              confirmButtonColor:'green',
              confirmButtonText:'OK',
              customClass:{
                confirmButton:'btn btn-success fw-bold col px-md-5',
              },
              buttonsStyling: false, 
            }
          )
        }
       })
}

resetForm() {
  this.addcontact.reset(); // Reset the form to its initial state
  this.selectedContact = null; // Clear the selected contact
  this.isEditMode = false; // Reset the edit mode flag
}
Popup(msg:any){
  Swal.fire({
      position: 'center',
      icon: 'success',
      title: msg,
      showConfirmButton: true,
      customClass:{
        confirmButton:'btn btn-success fw-bold col px-md-5',
      },
      buttonsStyling: false, 
    }).then(ok=>{
      if(ok){
     // Reset the form and close the modal
     this.resetForm();
     this.modalOpen = false;
     this.getContactList();
      }
    })
}

getContactList() {
  this.contactservice.getContactList().subscribe(data => {
    this.ContactList = data;
    console.log(this.ContactList); // Move the console.log here
  });
}

}
