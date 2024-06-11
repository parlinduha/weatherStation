import { Component, OnInit } from '@angular/core';

interface Sensor {
  title: string;
  list: [string, string, string][];
}

interface WindDirectionData {
  status: string;
  message: string;
  data: {
    sensor: Sensor[];
    battery: {
      title: string;
      list: string[];
    };
    created_at: string;
  };
}

@Component({
  selector: 'app-wind',
  templateUrl: './wind.component.html',
  styleUrls: ['./wind.component.scss'],
})
export class WindComponent implements OnInit {
  windSpeed: number | null = null;

  constructor() {}

  ngOnInit() {
    this.getWind();
  }

  getWind() {
    const localStorageData = localStorage.getItem('anemometer');
    if (localStorageData) {
      const parsedData: WindDirectionData = JSON.parse(localStorageData);
      // console.log('object is', parsedData);

      if (parsedData && parsedData.data && parsedData.data.sensor) {
        const windSensor = parsedData.data.sensor.find(
          (sensor: Sensor) => sensor.title === 'Wind Speed'
        );
        if (windSensor) {
          const windSpeedData = windSensor.list.find(
            (item: [string, string, string]) => item[0] === 'Wind'
          );
          if (windSpeedData) {
            this.windSpeed = parseFloat(windSpeedData[1]);
          }
        }
      }
    }
  }
}
