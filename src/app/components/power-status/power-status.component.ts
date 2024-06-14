import { Component, OnInit } from '@angular/core';
import { WeatherService } from 'src/app/utils/weather.service';

interface Sensor {
  title: string;
  list: [string, string, string][];
}

interface Battery {
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
  selector: 'app-power-status',
  templateUrl: './power-status.component.html',
  styleUrls: ['./power-status.component.scss'],
})
export class PowerStatusComponent implements OnInit {
  powerStatus: string = '';
  constructor(private weatherService: WeatherService) {}

  ngOnInit() {
    this.getPowerStatus();
  }

  getPowerStatus() {
    this.weatherService.service_get_data_live().subscribe((data) => {
      const parsedData: WindDirectionData = data;
      if (parsedData && parsedData.data && parsedData.data.battery) {
        const batteryData = parsedData.data.battery.list.find(
          (item: string) => item === 'All batteries are okay'
        );
        if (batteryData) {
          this.powerStatus = batteryData;
          console.log(this.powerStatus);
        }
      }
    });
  }
}
