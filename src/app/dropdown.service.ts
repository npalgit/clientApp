import { Injectable } from '@angular/core';  
import {HttpClient} from '@angular/common/http';  
import { Observable } from 'rxjs';  
import { DropDown } from './models/DropDown';  
  
@Injectable({  
  providedIn: 'root'  
})  
export class DropdownService {  
  Url = 'http://localhost:53666/api/v1';  
  constructor(private http:HttpClient) { }  
  getFirstDropDown(): Observable<DropDown[]>  
  {  
    return this.http.get<DropDown[]>(`${this.Url}/firstDropDown`);  
  }  
  getSecondDropDown(refId:string): Observable<DropDown[]>  
  {  
    return this.http.get<DropDown[]>(`${this.Url}/secondDropDown/refId/${refId}`);   
  }  
  getThirdDropDown(refId:string): Observable<DropDown[]>  
  {  
    return this.http.get<DropDown[]>(`${this.Url}/thirdDropDown/refId/${refId}`);   
  }  
}  