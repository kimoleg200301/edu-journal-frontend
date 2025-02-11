import { Component } from '@angular/core';

@Component({
  selector: 'app-slide-bar',
  imports: [],
  templateUrl: './slide-bar.component.html',
  standalone: true
})
export class SlideBarComponent {
  isOpen = false;
  menuItems = [
    { label: 'Студенты' },
    { label: 'Группы' },
    { label: 'Дисциплины' },
    { label: 'Журнал' },
  ];

  toggle() {
    this.isOpen = !this.isOpen;
  }
}
