import { Component, OnInit, Input } from '@angular/core';
import { Global } from 'src/app/models/global.model';

@Component({
  selector: 'app-global-card',
  templateUrl: './global-card.component.html',
  styleUrls: ['./global-card.component.css']
})
export class GlobalCardComponent implements OnInit {

  constructor() { }
  @Input()
  data: Global;
  ngOnInit(): void {
    console.log(this.data);
  }

}
