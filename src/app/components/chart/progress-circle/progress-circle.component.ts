import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress-circle',
  templateUrl: './progress-circle.component.html',
  styleUrls: ['./progress-circle.component.scss'],
})
export class ProgressCircleComponent implements OnInit {
  @Input() uvIndex: number = 0;

  uvIndexValue: number = 0;
  uvIndexGradient: string = 'w-0'; // Default to zero width

  constructor() {}

  ngOnInit() {
    try {
      const localStorageData = JSON.parse(
        localStorage.getItem('response') || '{}'
      );
      console.log('Data from local storage:', localStorageData);

      if (
        !localStorageData ||
        !localStorageData.data ||
        !localStorageData.data.weather ||
        !Array.isArray(localStorageData.data.weather)
      ) {
        throw new Error('Weather data not found or not in expected format');
      }

      const uvIndexData = localStorageData.data.weather.filter(
        (item: any) => item.name === 'UV-Index'
      );

      if (uvIndexData.length > 0) {
        const highestUvIndex = Math.max(
          ...uvIndexData.map((item: any) => parseFloat(item.value))
        );
        this.uvIndex = highestUvIndex;
        console.log('Highest UV-Index:', this.uvIndex);
      } else {
        console.log('UV-Index data not found in local storage');
      }

      this.setUvIndexProperties();
    } catch (error) {
      console.error(
        'Error retrieving UV-Index data from local storage:',
        error
      );
    }
  }

  setUvIndexProperties() {
    if (this.uvIndex < 3) {
      this.uvIndexValue = 25;
    } else if (this.uvIndex >= 3 && this.uvIndex < 6) {
      this.uvIndexValue = 50;
    } else if (this.uvIndex >= 6 && this.uvIndex < 8) {
      this.uvIndexValue = 75;
    } else {
      this.uvIndexValue = 100;
    }
    this.uvIndexGradient = `w-${this.uvIndexValue}`;
  }
}
