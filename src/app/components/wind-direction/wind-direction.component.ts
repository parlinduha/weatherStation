import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-wind-direction',
  templateUrl: './wind-direction.component.html',
  styleUrls: ['./wind-direction.component.scss'],
})
export class WindDirectionComponent implements OnInit {
  windDirection: number = 90;
  positionLabelN: number = (this.windDirection + 0) % 360;
  positionLabelE: number = (this.windDirection + 90) % 360;
  positionLabelS: number = (this.windDirection + 180) % 360;
  positionLabelW: number = (this.windDirection + 270) % 360;

  constructor() {}

  ngOnInit() {
    this.getCompassRotation();
    this.getWindDirection();
    this.getWindDirectionLabel();
  }

  getCompassRotation(): number {
    return this.windDirection;
  }

  getWindDirection(): string {
    const rotation = this.getCompassRotation();
    if (rotation >= 348.75 || rotation < 11.25) {
      return 'North';
    } else if (rotation >= 11.25 && rotation < 33.75) {
      return 'North-Northeast';
    } else if (rotation >= 33.75 && rotation < 56.25) {
      return 'Northeast';
    } else if (rotation >= 56.25 && rotation < 78.75) {
      return 'East-Northeast';
    } else if (rotation >= 78.75 && rotation < 101.25) {
      return 'East';
    } else if (rotation >= 101.25 && rotation < 123.75) {
      return 'East-Southeast';
    } else if (rotation >= 123.75 && rotation < 146.25) {
      return 'Southeast';
    } else if (rotation >= 146.25 && rotation < 168.75) {
      return 'South-Southeast';
    } else if (rotation >= 168.75 && rotation < 191.25) {
      return 'South';
    } else if (rotation >= 191.25 && rotation < 213.75) {
      return 'South-Southwest';
    } else if (rotation >= 213.75 && rotation < 236.25) {
      return 'Southwest';
    } else if (rotation >= 236.25 && rotation < 258.75) {
      return 'West-Southwest';
    } else if (rotation >= 258.75 && rotation < 281.25) {
      return 'West';
    } else if (rotation >= 281.25 && rotation < 303.75) {
      return 'West-Northwest';
    } else if (rotation >= 303.75 && rotation < 326.25) {
      return 'Northwest';
    } else {
      return 'North-Northwest';
    }
  }
  getWindDirectionLabel(): string {
    const rotation = this.getCompassRotation();
    if (rotation >= 348.75 || rotation < 11.25) {
      return 'N';
    } else if (rotation >= 11.25 && rotation < 33.75) {
      return 'NNE';
    } else if (rotation >= 33.75 && rotation < 56.25) {
      return 'NE';
    } else if (rotation >= 56.25 && rotation < 78.75) {
      return 'ENE';
    } else if (rotation >= 78.75 && rotation < 101.25) {
      return 'E';
    } else if (rotation >= 101.25 && rotation < 123.75) {
      return 'ESE';
    } else if (rotation >= 123.75 && rotation < 146.25) {
      return 'SE';
    } else if (rotation >= 146.25 && rotation < 168.75) {
      return 'SSE';
    } else if (rotation >= 168.75 && rotation < 191.25) {
      return 'S';
    } else if (rotation >= 191.25 && rotation < 213.75) {
      return 'SSW';
    } else if (rotation >= 213.75 && rotation < 236.25) {
      return 'SW';
    } else if (rotation >= 236.25 && rotation < 258.75) {
      return 'WSW';
    } else if (rotation >= 258.75 && rotation < 281.25) {
      return 'W';
    } else if (rotation >= 281.25 && rotation < 303.75) {
      return 'WNW';
    } else if (rotation >= 303.75 && rotation < 326.25) {
      return 'NW';
    } else {
      return 'NNW';
    }
  }
}
