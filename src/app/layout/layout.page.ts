import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import { Router } from '@angular/router';
import { WeatherService } from '../utils/weather.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.page.html',
  styleUrls: ['./layout.page.scss'],
})
export class LayoutPage implements OnInit {
  temperatureUnit = 'C';
  data: any[] = [];
  feelsLike: string = '';
  currentDate: string = '';
  currentDay: string = '';
  humidity: string = '';
  wind: string = '';
  rain: string = '';
  uv: string = '';
  latitude: string = '';
  longitude: string = '';

  constructor(private weatherService: WeatherService, private router: Router) {}

  ngOnInit() {
    this.printCurrentPosition();
    this.setCurrentDate();
    this.getDataLive();
  }

  getDataLive() {
    this.weatherService.service_get_data_live().subscribe(
      (response: any) => {
        // console.log('Data Anemometer', response);
        localStorage.setItem('anemometer', JSON.stringify(response));
        this.data = response.data.sensor;
        console.log('Data Anemometer', this.data);

        const indoorData = this.data.find((item) => item.title === 'Outdoor');
        if (indoorData) {
          const humidityData = indoorData.list.find(
            (subItem: any) => subItem[0] === 'Humidity'
          );
          if (humidityData) {
            this.humidity = humidityData[1] + humidityData[2]; // Contoh: "48%"
          }
        }
        // Find the "Feels Like" data
        const feelsLikeData = this.data.find(
          (item) => item.name === 'Feels Like'
        );
        if (feelsLikeData) {
          this.feelsLike = feelsLikeData.value;
        }
        // Find additional data
        // Find additional data
        const windData = this.data.find((item) => item.name === 'Wind Speed');
        if (windData) {
          this.wind = windData.value;
        }

        // Set UV Index value
      },
      (error: HttpErrorResponse) => {
        console.error('An error occurred:', error);
        // Handle error here
      }
    );
  }

  printCurrentPosition = async () => {
    const coordinates = await Geolocation.getCurrentPosition();

    this.latitude = coordinates.coords.latitude.toString();
    this.longitude = coordinates.coords.longitude.toString();

    console.log('Current position:', coordinates);
  };

  toggleSidebar() {}

  convertCelsiusToFahrenheit(celsius: number) {
    return (celsius * 9) / 5 + 32;
  }

  toggleTemperatureUnit() {
    this.temperatureUnit = this.temperatureUnit === 'C' ? 'F' : 'C';
  }

  getFeelsLikeTemperature() {
    const feelsLikeCelsius = parseFloat(this.feelsLike);
    if (this.temperatureUnit === 'C') {
      return `${feelsLikeCelsius}°C`;
    } else {
      const feelsLikeFahrenheit =
        this.convertCelsiusToFahrenheit(feelsLikeCelsius);
      return `${feelsLikeFahrenheit.toFixed(1)}°F`;
    }
  }

  setCurrentDate() {
    const date = new Date();
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    };
    const formattedDate = date.toLocaleDateString('en-US', options);
    this.currentDay = formattedDate.split(',')[0];
    this.currentDate = formattedDate.split(',')[1].trim().replace(/\/|-/g, ' ');
  }

  showLink() {
    this.router.navigate(['/show-data']);
  }
}
