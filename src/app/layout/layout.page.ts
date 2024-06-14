import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.page.html',
  styleUrls: ['./layout.page.scss'],
})
export class LayoutPage implements OnInit, OnDestroy {
  private intervalId: any;
  constructor() {}

  ngOnInit() {
    // this.startInterval();
  }

  ngOnDestroy() {
    this.stopInterval();
  }

  startInterval() {
    this.intervalId = setInterval(() => {
      location.reload();
    }, 10000); // 10000 milidetik = 10 detik
  }

  stopInterval() {
    clearInterval(this.intervalId);
  }
}
