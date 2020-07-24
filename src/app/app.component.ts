import { Component, OnInit } from '@angular/core';
import {DropdownService} from './dropdown.service';
import {RandomstringService} from './randomstring.service';
import {DropDown} from './models/DropDown';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public _firstDD: DropDown[];  
  public _secondDD: DropDown[];  
  public _thirdDD: DropDown[];  
  public _randStrings: string[]; 
  selFirstDDId:string="0";
  selSecondDDId:string="0";
  selThirdDDId:string="0";
  disableButton:boolean=true;
  _matchedStrings: string[]; 
  _randomTextSelected:string='';
  constructor( private dropdownService: DropdownService, private randomstringService: RandomstringService) { }

  ngOnInit(): void {
    this.dropdownService.getFirstDropDown()
      .subscribe(data => this._firstDD = data);
    this.randomstringService.getRandomStrings()
      .subscribe(data => this._randStrings = data);    
  }

  fillSecondDDL(id) {
    debugger
    this.selFirstDDId = id;
    this._validation();
    if(id == '0') {
      this.selSecondDDId = '0';
      return
    }
    
    this.dropdownService.getSecondDropDown(id)
      .subscribe(data => this._secondDD = data);
  }

  fillThirdDDL(id) {
    this.selSecondDDId = id;
    this._validation();
    if(id == '0') {
      this.selThirdDDId = '0';
      return;
    }
    this.dropdownService.getThirdDropDown(id)
      .subscribe(data => this._thirdDD = data);
  }

  onChangeThirdDDL(id) {
    this.selThirdDDId = id;
    this._validation();
    if(id == '0') return;
  }

  getRandomString(txt) {
    this._randomTextSelected = txt;
    this._validation();
    if (txt.length >= 1) {
       this._searchForString(txt);
    }
  }

  _searchForString(txt) {
    this._matchedStrings = [];
    for (let index = 0; index < this._randStrings.length; ++index) {
      if(this._randStrings[index].indexOf(txt) > 0) {
        this._matchedStrings.push(this._randStrings[index]);
      }
    }
    return this._matchedStrings;
  }
  _validation() {
    if(this._randomTextSelected.length > 0 && this.selFirstDDId!='0' && this.selSecondDDId!='0' && this.selThirdDDId!='0') {
      this.disableButton = false;
    }
    else {
      return;
    }
  }
}
