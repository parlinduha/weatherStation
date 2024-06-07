import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { HumidityComponent } from '../components/humidity/humidity.component';
import { PowerStatusComponent } from '../components/power-status/power-status.component';
import { PressureComponent } from '../components/pressure/pressure.component';
import { TemperatureComponent } from '../components/temperature/temperature.component';
import { WindComponent } from '../components/wind/wind.component';
import { WindDirectionComponent } from '../components/wind-direction/wind-direction.component';
import { WindStatusComponent } from '../components/wind-status/wind-status.component';

@NgModule({
  declarations: [
    HumidityComponent,
    PowerStatusComponent,
    PressureComponent,
    TemperatureComponent,
    WindComponent,
    WindDirectionComponent,
    WindStatusComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule, IonicModule, RouterModule],
  exports: [
    HumidityComponent,
    PowerStatusComponent,
    PressureComponent,
    TemperatureComponent,
    WindComponent,
    WindDirectionComponent,
    WindStatusComponent,
  ],
})
export class SharedModule {
  static forRoot(): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
      providers: [
        // ...
      ],
    };
  }
}
