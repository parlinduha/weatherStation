import { Component, OnInit } from '@angular/core';
import { WeatherService } from 'src/app/utils/weather.service';

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
    const localStorageData = localStorage.getItem('anemometer');
    if (localStorageData) {
      const parsedData = JSON.parse(localStorageData);
      const gustData = parsedData.common_list.find(
        (item: any) => item.id === '0x19'
      );
      if (gustData) {
        const gustVal = gustData.val.split(' ');
        this.gust = parseFloat(gustVal[0]);
        this.unitGust = gustVal[1];
      }
      const maxDailyGustData = parsedData.common_list.find(
        (item: any) => item.id === '0x0C'
      );
      if (maxDailyGustData) {
        const maxDailyGustVal = maxDailyGustData.val.split(' ');
        this.maxDailyGust = parseFloat(maxDailyGustVal[0]);
        this.unitMax = maxDailyGustVal[1];
      }
    }
  }

  getGustDisplay(): string {
    return this.gust !== null ? this.gust.toString() : '--/--';
  }

  getMaxDailyGustDisplay(): string {
    return this.maxDailyGust !== null ? this.maxDailyGust.toString() : '--/--';
  }
}
