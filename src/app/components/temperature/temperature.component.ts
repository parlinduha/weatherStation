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
  selector: 'app-temperature',
  templateUrl: './temperature.component.html',
  styleUrls: ['./temperature.component.scss'],
})
export class TemperatureComponent implements OnInit {
  temperature: number | null = null;
  unit: string = '';

  constructor() {}

  ngOnInit() {
    this.getTemperature();
  }

  getTemperature() {
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
            (item: [string, string, string]) => item[0] === 'Temperature'
          );
          if (windSpeedData) {
            let temperature = parseFloat(windSpeedData[1]);
            let unit = windSpeedData[2];
            if (unit === 'Â°F') {
              temperature = (temperature - 32) * (5 / 9);
              unit = 'C';
            }
            this.temperature = parseInt(temperature.toString(), 10);
            this.unit = unit;
            // console.log("Temperature",this.temperature);
          }
        }
      }
    }
  }
}
