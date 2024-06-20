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
  selector: 'app-wind',
  templateUrl: './wind.component.html',
  styleUrls: ['./wind.component.scss'],
})
export class WindComponent implements OnInit {
  windSpeed: number | null = null;

  constructor(private weatherService: WeatherService) {}

  ngOnInit() {
    this.getWind();
  }

  getWind() {
    const localStorageData = localStorage.getItem('anemometer');
    if (localStorageData) {
      const parsedData = JSON.parse(localStorageData);
      const windSpeedData = parsedData.common_list.find(
        (item: any) => item.id === '0x0B'
      );
      if (windSpeedData) {
        this.windSpeed = parseFloat(windSpeedData.val);
      }
    }
  }
  getWindSpeedDisplay(): string {
    return this.windSpeed !== null ? this.windSpeed.toString() : '--/--';
  }
}
