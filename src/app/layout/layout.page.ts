import { Component, OnDestroy, OnInit } from '@angular/core';
import { WeatherService } from '../utils/weather.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.page.html',
  styleUrls: ['./layout.page.scss'],
})
export class LayoutPage implements OnInit {
  constructor(private weatherService: WeatherService) {}

  ngOnInit() {
    setInterval(() => {
      this.getDataFromAPI();
    }, 3000);
  }

  getDataFromAPI(): void {
    this.weatherService.service_get_data_live().subscribe(
      (response) => {
        if (response) {
          const oldData = localStorage.getItem('anemometer');
          const newData = JSON.stringify(response);

          if (oldData !== newData) {
            // Jika data baru berbeda dengan data lama, reload halaman
            localStorage.setItem('anemometer', newData);
            location.reload();
          } else {
            // Jika data baru sama dengan data lama, tidak perlu reload
            console.log('Data tidak berubah, tidak perlu reload.');
          }
        } else {
          // Jika tidak ada data response dari API, clear semua data anemometer di localStorage.
          localStorage.removeItem('anemometer');
          location.reload();
        }
      },
      (error) => {
        // Tangani error dari API dan hapus data dari localStorage
        console.error('Error fetching data from API:', error);
        localStorage.removeItem('anemometer');
        location.reload();
      }
    );
  }
}
