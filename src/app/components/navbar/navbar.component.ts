import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  isDropdownOpen = false;
  constructor() {}

  ngOnInit() {}

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
}
