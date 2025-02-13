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

  onEntryGroupStudents(edu_group_id: number) {
    this.router.navigate(['/inGroupStudents'], { queryParams: { edu_group_id: edu_group_id } });
  }

  onEntryGroupSubjects(edu_group_id: number) {
    this.router.navigate(['/inGroupSubjects'], { queryParams: { edu_group_id: edu_group_id } });
  }

  onAddGroup() {
    this.router.navigate(['/addGroup']);
  }

  onDeleteGroup(edu_group_id: number) {
    this.groupPageService.deleteGroup(edu_group_id)
      .subscribe({
        next: (response) => console.log('Successfully deleted', response),
        error: (error) => console.error('Failed to delete group', error)
      });
    window.location.reload();
  }
}
