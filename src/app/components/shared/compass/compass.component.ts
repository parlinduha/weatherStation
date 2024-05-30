import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-compass',
  templateUrl: './compass.component.html',
  styleUrls: ['./compass.component.scss'],
})
export class CompassComponent implements OnInit {
  direction: string = '';
  arrowDirection: string = 'rotate-0';
  arrowRotation: number = 0; // This will store the rotation degree
  arrowScale: number = 1;

  directions: string[] = [
    'N',
    'NNE',
    'NE',
    'ENE',
    'E',
    'ESE',
    'SE',
    'SSE',
    'S',
    'SSW',
    'SW',
    'WSW',
    'W',
    'WNW',
    'NW',
    'NNW',
  ];
  rotationClasses: string[] = [
    'rotate-0',
    'rotate-22-5',
    'rotate-45',
    'rotate-67-5',
    'rotate-90',
    'rotate-112-5',
    'rotate-135',
    'rotate-157-5',
    'rotate-180',
    'rotate-202-5',
    'rotate-225',
    'rotate-247-5',
    'rotate-270',
    'rotate-292-5',
    'rotate-315',
    'rotate-337-5',
  ];

  constructor() {}

  ngOnInit() {
    this.getWind();
  }

  updateDirection(degrees: any) {
    if (degrees !== null && degrees !== undefined) {
      const parsedDegrees = parseFloat(degrees);
      if (!isNaN(parsedDegrees)) {
        const index = Math.round(parsedDegrees / 22.5) % 16;
        this.direction = this.directions[index];
        this.arrowDirection = this.rotationClasses[index];
        this.arrowRotation = parsedDegrees; // Update rotation degree
        this.arrowScale = Math.abs(Math.sin(parsedDegrees * (Math.PI / 360)));
      }
    }
  }

  getWind() {
    try {
      const localStorageData = JSON.parse(
        localStorage.getItem('response') || '{}'
      );
      if (
        localStorageData &&
        localStorageData.data &&
        localStorageData.data.weather
      ) {
        const windDirectionData = localStorageData.data.weather.find(
          (item: any) => item.name === 'Wind Direction'
        );

        if (windDirectionData && windDirectionData.value) {
          this.updateDirection(windDirectionData.value);
        } else {
          console.error('Wind Direction data not found in local storage.');
        }
      } else {
        console.error('Invalid data format in local storage.');
      }
    } catch (error) {
      console.error(
        'Error retrieving Wind Direction data from local storage:',
        error
      );
    }
  }
}
