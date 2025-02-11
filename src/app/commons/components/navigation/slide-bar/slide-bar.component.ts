import {Component, inject} from '@angular/core';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {selectSelectedItem} from '../../../../data-access/state/slide-bar/slide-bar.selectors';
import {setSelectedItem} from '../../../../data-access/state/slide-bar/slide-bar.action';
import {AsyncPipe} from '@angular/common';

@Component({
  selector: 'app-slide-bar',
  imports: [
    AsyncPipe
  ],
  templateUrl: './slide-bar.component.html',
  standalone: true
})
export class SlideBarComponent {
  private readonly store = inject(Store);
  isOpen = false;
  public readonly selectedItem$ = this.store.select(selectSelectedItem);

  menuItems = [
    { index: 1, label: 'Студенты', route: '/' },
    { index: 2, label: 'Группы', route: '/groupList' },
    { index: 3, label: 'Дисциплины', route: '/subjectList' },
    { index: 4, label: 'Журнал', route: '/selectGroup' }
  ];

  constructor(private router: Router) {}

  toggle() {
    this.isOpen = !this.isOpen;
  }

  onItemClick(item: any) {
    this.store.dispatch(setSelectedItem({ route: item.route }));
    this.router.navigate([item.route]);
    this.toggle();
  }
}
