import {Component, inject} from '@angular/core';
import {GroupPageService} from '../../../data-access/services/group-page.service';
import {ActivatedRoute, Router} from '@angular/router';
import {SubjectList} from '../../../data-access/interfaces/subject-page.interface';

@Component({
  selector: 'app-in-group-subjects-page',
  imports: [],
  templateUrl: './in-group-subjects-page.component.html',
  standalone: true
})
export class InGroupSubjectsPageComponent {
  groupPageService = inject(GroupPageService);
  edu_group_id = 0;
  subjectsInGroup: SubjectList[] = [];

  constructor(private router: Router, private route: ActivatedRoute) {
    this.edu_group_id = Number(this.route.snapshot.queryParamMap.get('edu_group_id'));
    this.groupPageService.getSubjectsByGroupId()
      .subscribe(value => {
        this.subjectsInGroup = value;
      });
  }

  onDeleteSubjectFromGroup(subject_id: number) {
    this.groupPageService.deleteSubjectFromGroup(this.edu_group_id, subject_id)
      .subscribe({
        next: (response) => console.log('Successfully deleted', response),
        error: (error) => console.error('Failed to delete subject', error)
      });
    window.location.reload()
  }

  onAddSubjectsInGroup() {
    this.router.navigate(['/addSubjectsInGroup'], { queryParams: { edu_group_id: this.edu_group_id }})
  }
}
