import { Component, OnInit } from '@angular/core';
import {DropdownService} from '../dropdown.service';
import {RandomstringService} from '../randomstring.service';
import {DropDown} from '../models/DropDown';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  public _firstDD: DropDown[];  
  public _secondDD: DropDown[];  
  public _thirdDD: DropDown[];  
  public _randStrings: string[]; 
  selFirstDDId:string="0";
  selSecondDDId:string="0";
  selThirdDDId:string="0";
  selFirstDDTxt:string="";
  selSecondDDTxt:string="";
  selThirdDDTxt:string="";
  disableButton:boolean=true;
  _matchedStrings: string[]; 
  _randomTextSelected:string='';
  constructor( private dropdownService: DropdownService, private randomstringService: RandomstringService, private router:Router) { }

  ngOnInit(): void {
    this.dropdownService.getFirstDropDown()
      .subscribe(data => this._firstDD = data);
      
    this.randomstringService.getRandomStrings()
      .subscribe(data => this._randStrings = data);    
  }

  goToThings(){
    const _stateObj = Object.assign({},
      { randomTextSelected: this._randomTextSelected, 
        selFirstDDTxt:this.selFirstDDTxt, 
        selSecondDDTxt: this.selSecondDDTxt, 
        selThirdDDTxt:this.selThirdDDTxt});
    this.router.navigate(['/things',_stateObj]);
  }

  fillSecondDDL(event) {
    let id = event.target.value;
    this.selFirstDDId = id;
    this.selFirstDDTxt = event.target.options[event.target.options.selectedIndex].text;
    this._validation();
    if(id == '0') {
      this.selSecondDDId = '0';
      return
    }
    
    this.dropdownService.getSecondDropDown(id)
      .subscribe(data => this._secondDD = data);
  }

  fillThirdDDL(event) {
    let id = event.target.value;
    this.selSecondDDId = event.target.value;
    this.selSecondDDTxt = event.target.options[event.target.options.selectedIndex].text;
    this._validation();
    if(id == '0') {
      this.selThirdDDId = '0';
      return;
    }
    this.dropdownService.getThirdDropDown(id)
      .subscribe(data => this._thirdDD = data);
  }

  onChangeThirdDDL(event) {
    let id = event.target.value;
    this.selThirdDDTxt = event.target.options[event.target.options.selectedIndex].text;
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
      if(this._randStrings[index].toUpperCase().indexOf(txt.toUpperCase()) > 0) {
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
  onClickSubmit(value) {
    this.goToThings();
  }
}
