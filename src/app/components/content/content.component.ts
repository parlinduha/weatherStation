import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
})
export class ContentComponent implements OnInit {
  isCelsius = true;

  constructor() {}

  ngOnInit() {
    this.switchTemperature(null);
  }

  switchTemperature(event?: any) {
    this.isCelsius = event.detail.value === 'celcius';
  }
}
