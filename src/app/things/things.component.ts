import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-things',
  templateUrl: './things.component.html',
  styleUrls: ['./things.component.css']
})
export class ThingsComponent implements OnInit {

  selFirstDDTxt:string="0";
  selSecondDDTxt:string="0";
  selThirdDDTxt:string="0"; 
  _randomTextSelected:string='';
  routerLinkVariable:string = "/";
  isShowContent:boolean = false;
  constructor(private activatedRoute: ActivatedRoute, private router:Router) { }

  ngOnInit(): void {
    if(this.activatedRoute.snapshot.params) {
      this.selFirstDDTxt = this.activatedRoute.snapshot.params['selFirstDDTxt'];
      this.selSecondDDTxt = this.activatedRoute.snapshot.params['selSecondDDTxt'];
      this.selThirdDDTxt = this.activatedRoute.snapshot.params['selThirdDDTxt'];
      this._randomTextSelected = this.activatedRoute.snapshot.params['randomTextSelected'];
      this.isShowContent = true;
    }
  }

}
