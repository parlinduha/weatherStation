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
  selector: 'app-pressure',
  templateUrl: './pressure.component.html',
  styleUrls: ['./pressure.component.scss'],
})
export class PressureComponent implements OnInit {
  absolute: number | null = null;
  unitAbs: string = '';
  relative: number | null = null;
  unitRel: string = '';

  constructor(private weatherService: WeatherService) {}

  ngOnInit() {
    this.getPressure();
  }

  getPressure() {
    const localStorageData = localStorage.getItem('anemometer');
    if (localStorageData) {
      const parsedData = JSON.parse(localStorageData);
      const wh25Data = parsedData.wh25[0];
      if (wh25Data) {
        this.absolute = parseFloat(wh25Data.abs.split(' ')[0]);
        this.unitAbs = wh25Data.abs.split(' ')[1];
        this.relative = parseFloat(wh25Data.rel.split(' ')[0]);
        this.unitRel = wh25Data.rel.split(' ')[1];
      }
    }
  }
  getPressureRelative(): string {
    return this.relative !== null ? this.relative.toFixed(1) : '--/--';
  }
  getPressureAbsolute(): string {
    return this.absolute !== null ? this.absolute.toFixed(1) : '--/--';
  }
}
