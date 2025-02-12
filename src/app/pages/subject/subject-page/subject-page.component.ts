import {Component, inject} from '@angular/core';
import {SubjectPageService} from '../../../data-access/services/subject-page.service';
import {SubjectList} from '../../../data-access/interfaces/subject-page.interface';
import {Router} from '@angular/router';

@Component({
  selector: 'app-subject-page',
  imports: [],
  standalone: true,
  templateUrl: './subject-page.component.html',
})
export class SubjectPageComponent {
  subjectListService = inject(SubjectPageService);
  subjectsList: SubjectList[] = [];

  constructor(private route: Router) {
    this.subjectListService.getSubjectList()
      .subscribe(value => {
        this.subjectsList = value;
      })
  }

  onEditSubject(subjectId: SubjectList) {
    this.route.navigate(['subjectCard'], { queryParams: { subject_id: subjectId.subject_id } });
  }

  onAddSubject() {
    this.route.navigate(['addSubject']);
  }
}
