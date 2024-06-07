import { Component } from '@angular/core';
import { WeatherService } from './utils/weather.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.weatherService.service_get_data_live().subscribe((response) => {
      localStorage.setItem('anemometer', JSON.stringify(response));
      // console.log('API Response:', response);
    });
  }
}
