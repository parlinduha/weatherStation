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
  selector: 'app-humidity',
  templateUrl: './humidity.component.html',
  styleUrls: ['./humidity.component.scss'],
})
export class HumidityComponent implements OnInit {
  humidity: number | null = null;

  constructor(private weatherService: WeatherService) {}

  ngOnInit() {
    this.getHumidity();
  }

  getHumidity() {
    const localStorageData = localStorage.getItem('anemometer');
    if (localStorageData) {
      const parsedData = JSON.parse(localStorageData);
      const humidityData = parsedData.common_list.find(
        (item: any) => item.id === '0x07'
      );
      if (humidityData) {
        this.humidity = parseFloat(humidityData.val);
      }
    }
  }
  getHumidityDisplay(): string {
    return this.humidity !== null ? this.humidity.toString() : '--/--';
  }
}
