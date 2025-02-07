import {Component, inject} from '@angular/core';
import {GroupPageService} from '../../../data-access/services/group-page.service';
import {GroupList} from '../../../data-access/interfaces/group-page.interface';

@Component({
  selector: 'app-group-page',
  imports: [],
  standalone: true,
  templateUrl: './group-page.component.html',
  styleUrl: './group-page.component.css'
})
export class GroupPageComponent {
  groupPageService = inject(GroupPageService);
  groupsList: GroupList[] = [];

  constructor() {
    this.groupPageService.getGroupList()
      .subscribe(value => {
        this.groupsList = value
      });
  }
}
