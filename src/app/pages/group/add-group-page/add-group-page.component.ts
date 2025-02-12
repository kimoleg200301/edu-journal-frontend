import {Component, inject} from '@angular/core';
import {Router} from '@angular/router';
import {GroupPageService} from '../../../data-access/services/group-page.service';
import {GroupList} from '../../../data-access/interfaces/group-page.interface';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-add-group-page',
  imports: [
    FormsModule
  ],
  templateUrl: './add-group-page.component.html',
  standalone: true
})
export class AddGroupPageComponent {
  groupPageService = inject(GroupPageService);
  newGroup: GroupList = {
    edu_group_id: 0,
    name: '',
    created: ''
  }

  constructor(private router: Router) {
  }

  onAddGroup() {
    this.groupPageService.saveGroup(this.newGroup)
      .subscribe({
        next: response => console.log('Успешно добавлен: ', response),
        error: err => console.error('Ошибка добавления: ', err)
      });
    this.router.navigate(['/groupList']);
  }
}
