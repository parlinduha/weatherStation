import { Component, OnInit } from '@angular/core';
import { WeatherService } from 'src/app/utils/weather.service';

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
  selector: 'app-wind-status',
  templateUrl: './wind-status.component.html',
  styleUrls: ['./wind-status.component.scss'],
})
export class WindStatusComponent implements OnInit {
  gust: number | null = null;
  unitGust: string = '';
  maxDailyGust: number | null = null;
  unitMax: string = '';

  constructor(private weatherService: WeatherService) {}

  ngOnInit() {
    this.getWindStatus();
  }

  getWindStatus() {
    // const localStorageData = localStorage.getItem('anemometer');
    this.weatherService.service_get_data_live().subscribe((data) => {
      const parsedData: WindDirectionData = data;
      // console.log('object is', parsedData);

      if (parsedData && parsedData.data && parsedData.data.sensor) {
        const windSensor = parsedData.data.sensor.find(
          (sensor: Sensor) => sensor.title === 'Wind Speed'
        );
        if (windSensor) {
          const absoluteData = windSensor.list.find(
            (item: [string, string, string]) => item[0] === 'Max Daily Gust'
          );
          if (absoluteData) {
            this.maxDailyGust = parseFloat(absoluteData[1]);
            this.unitMax = absoluteData[2];
          }
          const relativeData = windSensor.list.find(
            (item: [string, string, string]) => item[0] === 'Gust'
          );
          if (relativeData) {
            this.gust = parseFloat(relativeData[1]);
            this.unitGust = relativeData[2];
          }
        }
      }
    });
  }
  
}
