import { Component, OnInit } from '@angular/core';
import { WeatherService } from 'src/app/utils/weather.service';

@Component({
  selector: 'app-power-status',
  templateUrl: './power-status.component.html',
  styleUrls: ['./power-status.component.scss'],
})
export class PowerStatusComponent implements OnInit {
  powerStatus: string = '';
  constructor(private weatherService: WeatherService) {}

  ngOnInit() {
    this.getPowerStatus();
  }

  getPowerStatus() {
    const localStorageData = localStorage.getItem('anemometer');
    if (localStorageData) {
      const parsedData = JSON.parse(localStorageData);
      const batteryData = parsedData.piezoRain.find(
        (item: any) => item.id === '0x13'
      );
      console.log('object battery data : ', JSON.stringify(batteryData));
      if (batteryData) {
        const batteryLevel = parseFloat(batteryData.battery);
        console.log('object: ' + JSON.stringify(batteryLevel));
        this.powerStatus = batteryLevel > 1 ? 'ON' : 'OFF';
        console.log(this.powerStatus);
      }
    }
  }
}
