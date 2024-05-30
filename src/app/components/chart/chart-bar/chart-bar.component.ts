import { Component, OnInit } from '@angular/core';
import {
  Chart,
  ChartConfiguration,
  ChartData,
  registerables,
} from 'chart.js/auto';

@Component({
  selector: 'app-chart-bar',
  templateUrl: './chart-bar.component.html',
  styleUrls: ['./chart-bar.component.scss'],
})
export class ChartBarComponent implements OnInit {
  public chart!: Chart<'bar'>;

  constructor() {
    Chart.register(...registerables);
  }

  ngOnInit() {
    this.createChart();
  }

  createChart() {
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');

    const dataValues = [8, 10, 12, 15, 14, 13, 11]; // Data kecepatan angin pada jam-jam tertentu
    const topThreeIndices = dataValues
      .map((value, index) => ({ value, index }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 3)
      .map((item) => item.index);

    const data: ChartData<'bar'> = {
      labels: ['03AM', '06AM', '09AM', '12PM', '03PM', '06PM', '09PM'],
      datasets: [
        {
          label: 'Wind Status (km/h)',
          data: dataValues,
          backgroundColor: dataValues.map((_, index) =>
            topThreeIndices.includes(index)
              ? 'rgb(15, 255, 204)'
              : 'rgb(129, 143, 155)'
          ),
          borderColor: dataValues.map((_, index) =>
            topThreeIndices.includes(index)
              ? 'rgb(15, 255, 204)'
              : 'rgb(129, 143, 155)'
          ),
          borderWidth: 1,
          borderRadius: 5,
          barPercentage: 0.5,
          barThickness: 6,
          maxBarThickness: 8,
          minBarLength: 2,
        },
      ],
    };

    const options: ChartConfiguration<'bar'>['options'] = {
      responsive: true,
      plugins: {
        legend: {
          display: false,
        },
      },
      scales: {
        x: {
          beginAtZero: true,
          display: false,
        },
        y: {
          beginAtZero: true,
          display: false,
          offset: true,
        },
      },
    };

    this.chart = new Chart(ctx!, {
      type: 'bar',
      data: data,
      options: options,
    });
  }
}
