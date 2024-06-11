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
  selector: 'app-humidity',
  templateUrl: './humidity.component.html',
  styleUrls: ['./humidity.component.scss'],
})
export class HumidityComponent implements OnInit {
  humidity: number | null = null;

  constructor() {}

  ngOnInit() {
    this.getHumidity();
  }

  getHumidity() {
    const localStorageData = localStorage.getItem('anemometer');
    if (localStorageData) {
      const parsedData: WindDirectionData = JSON.parse(localStorageData);
      // console.log('object is', parsedData);

      if (parsedData && parsedData.data && parsedData.data.sensor) {
        const windSensor = parsedData.data.sensor.find(
          (sensor: Sensor) => sensor.title === 'Outdoor'
        );
        if (windSensor) {
          const windSpeedData = windSensor.list.find(
            (item: [string, string, string]) => item[0] === 'Humidity'
          );
          if (windSpeedData) {
            this.humidity = parseFloat(windSpeedData[1]);
          }
        }
      }
    }
  }
}
