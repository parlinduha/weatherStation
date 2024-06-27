import { Component, OnInit } from '@angular/core';
import { WeatherService } from 'src/app/utils/weather.service';

@Component({
  selector: 'app-temperature',
  templateUrl: './temperature.component.html',
  styleUrls: ['./temperature.component.scss'],
})
export class TemperatureComponent implements OnInit {
  temperature: number | null = null;
  unit: string = '';
  feels: number | null = null;
  unitFeels: string = '';

  constructor(private weatherService: WeatherService) {}

  ngOnInit() {
    this.getTemperature();
    this.getFeels();
  }

  getTemperature() {
    const localStorageData = localStorage.getItem('anemometer');
    if (localStorageData) {
      const parsedData = JSON.parse(localStorageData);
      const temperatureData = parsedData.common_list.find(
        (item: any) => item.id === '0x02'
      );
      if (temperatureData) {
        let temperature = parseFloat(temperatureData.val);
        let unit = temperatureData.unit;
        if (unit === 'Â°F') {
          temperature = (temperature - 32) * (5 / 9);
          unit = 'C';
        }
        this.temperature = parseInt(temperature.toString(), 10);
        this.unit = unit;
      }
    }
  }

  getFeels() {
    const localStorageData = localStorage.getItem('anemometer');
    if (localStorageData) {
      const parsedData = JSON.parse(localStorageData);
      const temperatureData = parsedData.common_list.find(
        (item: any) => item.id === '3'
      );
      if (temperatureData) {
        let temperature = parseFloat(temperatureData.val);
        let unit = temperatureData.unit;
        if (unit === 'Â°F') {
          temperature = (temperature - 32) * (5 / 9);
          unit = 'C';
        }
        this.feels = parseInt(temperature.toString(), 10);
        this.unitFeels = unit;
      }
    }
  }

  getTemperatureDisplay(): string {
    return this.temperature !== null ? this.temperature.toString() : '--/--';
  }

  getFeelsDisplay(): string {
    return this.feels !== null ? this.feels.toString() : '--/--';
  }
}
