import {Component, inject} from '@angular/core';
import {GroupPageService} from '../../../data-access/services/group-page.service';
import {ActivatedRoute, Router} from '@angular/router';
import {SubjectList} from '../../../data-access/interfaces/subject-page.interface';

export interface Subject_ids {
  subject_id: number;
}

@Component({
  selector: 'app-add-subjects-in-group-page',
  imports: [],
  templateUrl: './add-subjects-in-group-page.component.html',
  standalone: true
})
export class AddSubjectsInGroupPageComponent {
  groupPageService = inject(GroupPageService);
  edu_group_id = 0;
  subjectsList: SubjectList[] = [];
  subject_ids: Subject_ids[] = [];

  constructor(private router: Router, private route: ActivatedRoute) {
    this.edu_group_id = Number(this.route.snapshot.queryParamMap.get('edu_group_id'));
    this.groupPageService.getUnaddedSubjectsByGroupId(this.edu_group_id)
      .subscribe(value => {
        this.subjectsList = value;
      });
  } // переделать после создания маршрута на unaddedSubjects

  toggleSelection(subject_id: number, event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked;

    if (isChecked) {
      this.subject_ids.push({ subject_id });
    } else {
      this.subject_ids = this.subject_ids.filter(subject => subject.subject_id !== subject_id);
    }
  }

  onAddSubjects() {
    console.log(this.edu_group_id);
    console.log(this.subject_ids);
    this.groupPageService.addSubjectsInGroup(this.subject_ids, this.edu_group_id)
      .subscribe({
        next: response => console.log('Успешно добавлены: ', response),
        error: error => console.log('Ошибка добавления: ', error),
      });
    this.router.navigate(['/inGroupSubjects'], { queryParams: { edu_group_id: this.edu_group_id } });
  }
}
