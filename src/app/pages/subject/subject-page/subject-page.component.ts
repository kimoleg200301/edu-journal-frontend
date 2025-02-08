import {Component, inject} from '@angular/core';
import {SubjectPageService} from '../../../data-access/services/subject-page.service';
import {SubjectList} from '../../../data-access/interfaces/subject-page.interface';

@Component({
  selector: 'app-subject-page',
  imports: [],
  standalone: true,
  templateUrl: './subject-page.component.html',
})
export class SubjectPageComponent {
  subjectListService = inject(SubjectPageService);
  subjectsList: SubjectList[] = [];

  constructor() {
    this.subjectListService.getSubjectList()
      .subscribe(value => {
        this.subjectsList = value;
      })
  }
}
