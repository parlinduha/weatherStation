import {
  Component,
  AfterViewInit,
  QueryList,
  ViewChildren,
  ElementRef,
} from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements AfterViewInit {
  @ViewChildren('navItem', { read: ElementRef })
  navItems!: QueryList<ElementRef>;

  navItemsArray = [
    { text: 'Home', icon: 'apps-outline' },
    { text: 'Settings', icon: 'build-outline' },
  ];

  constructor() {}

  ngAfterViewInit() {
    this.navItems.forEach((navItem, i) => {
      navItem.nativeElement.addEventListener('click', () => {
        this.navItems.forEach((item) => {
          item.nativeElement.classList.remove('active');
        });
        navItem.nativeElement.classList.add('active');
      });
    });
  }

  activateNavItem(index: number) {
    this.navItems.forEach((item) => {
      item.nativeElement.classList.remove('active');
    });
    this.navItems.toArray()[index].nativeElement.classList.add('active');
  }
}
