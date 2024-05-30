import { Component, OnInit } from '@angular/core';
import { Chart, ChartConfiguration, ChartData, registerables } from 'chart.js';

@Component({
  selector: 'app-gauge-chart',
  templateUrl: './gauge-chart.component.html',
  styleUrls: ['./gauge-chart.component.scss'],
})
export class GaugeChartComponent implements OnInit {
  public chart!: Chart<'doughnut'>;

  constructor() {
    Chart.register(...registerables);
  }

  ngOnInit() {
    this.createChart();
  }

  createChart() {
    const canvas = document.getElementById('canvas2') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');

    const data: ChartData<'doughnut'> = {
      labels: ['Chance of Rain', ''],
      datasets: [
        {
          data: [70, 30], // Misal, 70% chance of rain
          backgroundColor: [
            'rgba(54, 162, 235, 0.5)',
            'rgba(200, 200, 200, 0.5)',
          ],
          borderColor: ['rgba(54, 162, 235, 1)', 'rgba(200, 200, 200, 1)'],
          borderWidth: 1,
        },
      ],
    };

    const options: ChartConfiguration<'doughnut'>['options'] = {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '70%', // Membuat gauge chart
      plugins: {
        legend: {
          display: false,
        },
      },
    };

    this.chart = new Chart(ctx!, {
      type: 'doughnut',
      data: data,
      options: options,
    });
  }
}
