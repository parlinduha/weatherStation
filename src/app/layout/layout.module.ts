import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LayoutPageRoutingModule } from './layout-routing.module';

import { LayoutPage } from './layout.page';
import { SharedModule } from '../components/shared/shared.module';
import { LineComponent } from '../components/chart/line/line.component';
import { ChartBarComponent } from '../components/chart/chart-bar/chart-bar.component';
import { GaugeChartComponent } from '../components/chart/gauge-chart/gauge-chart.component';
import { WindChartComponent } from '../components/chart/wind-chart/wind-chart.component';
import { StormChartComponent } from '../components/chart/storm-chart/storm-chart.component';
import { ProgressCircleComponent } from '../components/chart/progress-circle/progress-circle.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LayoutPageRoutingModule,
    SharedModule,
  ],
  declarations: [
    LayoutPage,
    LineComponent,
    ChartBarComponent,
    GaugeChartComponent,
    WindChartComponent,
    StormChartComponent,
    ProgressCircleComponent,
  ],
})
export class LayoutPageModule {}
