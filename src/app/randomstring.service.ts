import { Injectable } from '@angular/core';  
import {HttpClient} from '@angular/common/http';  
import { Observable } from 'rxjs';  
import { DropDown } from './models/DropDown';  

@Injectable({
  providedIn: 'root'
})
export class RandomstringService {

  Url = 'http://localhost:53666/api/v1';  
  constructor(private http:HttpClient) { }  
  getRandomStrings(): Observable<string[]>  
  {  
    return this.http.get<string[]>(`${this.Url}/randomStrings`);  
  }  
}

  
