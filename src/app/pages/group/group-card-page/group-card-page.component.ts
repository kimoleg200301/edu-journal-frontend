import {Component, inject} from '@angular/core';
import {GroupPageService} from '../../../data-access/services/group-page.service';
import {SubjectList} from '../../../data-access/interfaces/subject-page.interface';
import {GroupList} from '../../../data-access/interfaces/group-page.interface';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-group-card-page',
  imports: [
    FormsModule
  ],
  templateUrl: './group-card-page.component.html',
  standalone: true
})
export class GroupCardPageComponent {
  groupPageService = inject(GroupPageService);
  group: GroupList = {
    edu_group_id: 0,
    name: '',
    created: ''
  }

  constructor() {
    this.groupPageService.getGroupById()
      .subscribe(result => {
        this.group = result;
      })
  }
}
