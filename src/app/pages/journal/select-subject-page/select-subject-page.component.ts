import {Component, inject} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {SubjectPageService} from '../../../data-access/services/subject-page.service';
import {SubjectList} from '../../../data-access/interfaces/subject-page.interface';
import {GroupPageService} from '../../../data-access/services/group-page.service';

@Component({
  selector: 'app-select-subject-page',
  imports: [],
  templateUrl: './select-subject-page.component.html',
  standalone: true
})
export class SelectSubjectPageComponent {
  groupPageService = inject(GroupPageService);

  edu_group_id: number = 0;
  subjectsList: SubjectList[] = [];

  constructor(private router: Router, private route: ActivatedRoute) {
    this.edu_group_id = Number(this.route.snapshot.queryParamMap.get('edu_group_id'));

    this.groupPageService.getSubjectsByGroupId()
      .subscribe(value => {
        this.subjectsList = value;
      });
  }

  onEntrySubject(subject_id: number) {
    this.router.navigate(['/journal'], { queryParams: { edu_group_id: this.edu_group_id, subject_id: subject_id } });
  }
}
