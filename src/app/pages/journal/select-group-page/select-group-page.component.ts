import {Component, inject} from '@angular/core';
import {Router} from '@angular/router';
import {GroupPageService} from '../../../data-access/services/group-page.service';
import {GroupList} from '../../../data-access/interfaces/group-page.interface';

@Component({
  selector: 'app-select-group-page',
  imports: [],
  templateUrl: './select-group-page.component.html',
  standalone: true
})
export class SelectGroupPageComponent {
  groupPageService = inject(GroupPageService);
  groupsList: GroupList[] = [];

  constructor(private router: Router) {
    this.groupPageService.getGroupList()
      .subscribe(value => {
        this.groupsList = value;
      });
  }

  onEntrySubject(edu_group_id: number) {
    this.router.navigate(['/selectSubject'], { queryParams: {edu_group_id} });
  }
}
