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
      if (response) {
        // Jika ada data response dari API, simpan data ke localStorage.
        localStorage.setItem('anemometer', JSON.stringify(response));
      } else {
        // Jika tidak ada data response dari API, clear semua data anemometer di localStorage.
        localStorage.removeItem('anemometer');
      }
    });
  }
}
