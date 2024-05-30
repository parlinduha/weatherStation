import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  isSidebarOpen = true;
  startX = 0;
  scrollLeft = 0;
  isGridIconClicked = false;
  isBuildIconClicked = false; // deklarasi variabel isBuildIconClicked
  isFlashIconClicked = false; // deklarasi variabel isFlashIconClicked
  constructor() {}

  ngOnInit() {}

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
}
