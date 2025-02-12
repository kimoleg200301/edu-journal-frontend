import {Component, inject} from '@angular/core';
import {GroupPageService} from '../../../data-access/services/group-page.service';
import {GroupList} from '../../../data-access/interfaces/group-page.interface';
import {Router} from '@angular/router';

@Component({
  selector: 'app-group-page',
  imports: [],
  standalone: true,
  templateUrl: './group-page.component.html',
})
export class GroupPageComponent {
  groupPageService = inject(GroupPageService);
  groupsList: GroupList[] = [];

  constructor(private router: Router) {
    this.groupPageService.getGroupList()
      .subscribe(value => {
        this.groupsList = value
      });
  }

  onEntryGroup(edu_group_id: number) {
    this.router.navigate(['/inGroup'], { queryParams: { edu_group_id: edu_group_id } });
  }

  onAddGroup() {
    this.router.navigate(['/addGroup']);
  }
}
