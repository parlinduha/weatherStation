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
    // const localStorageData = localStorage.getItem('anemometer');
    this.weatherService.service_get_data_live().subscribe((data) => {
      const parsedData: WindDirectionData = data;
      // console.log('object is', parsedData);

      if (parsedData && parsedData.data && parsedData.data.sensor) {
        const windSensor = parsedData.data.sensor.find(
          (sensor: Sensor) => sensor.title === 'Pressure'
        );
        if (windSensor) {
          const absoluteData = windSensor.list.find(
            (item: [string, string, string]) => item[0] === 'Absolute'
          );
          if (absoluteData) {
            this.absolute = parseFloat(absoluteData[1]);
            this.unitAbs = absoluteData[2];
          }
          const relativeData = windSensor.list.find(
            (item: [string, string, string]) => item[0] === 'Relative'
          );
          if (relativeData) {
            this.relative = parseFloat(relativeData[1]);
            this.unitRel = relativeData[2];
          }
        }
      }
    });
  }
  getPressureRelative(): string {
    return this.relative !== null ? this.relative.toFixed(2) : '--/--';
  }
  getPressureAbsolute(): string {
    return this.absolute !== null ? this.absolute.toFixed(2) : '--/--';
  }
}
