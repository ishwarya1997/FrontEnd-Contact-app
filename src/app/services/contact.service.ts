
import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
   readonly apiUrl = 'https://localhost:7064/api/Contacts';
   constructor(private http: HttpClient) { }

 // Get All COntacts
  getContactList(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
  getContactbyid(contactId: number): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl+contactId);
  }
  addContact(contact: any): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<any>(this.apiUrl, contact, httpOptions);
  }

  updateContact(contact: any,id:number): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.put<any>(this.apiUrl+"/"+id, contact, httpOptions);
  }

  deleteContact(contactId: number): Observable<number> {
    console.log(contactId);
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.delete<number>(this.apiUrl+"/" + contactId, httpOptions);
  }


}
