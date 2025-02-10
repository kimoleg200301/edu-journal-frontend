import {Component, inject} from '@angular/core';
import {SubjectPageService} from '../../../data-access/services/subject-page.service';
import {SubjectList} from '../../../data-access/interfaces/subject-page.interface';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-subject-card-page',
  imports: [
    FormsModule
  ],
  templateUrl: './subject-card-page.component.html',
  standalone: true
})
export class SubjectCardPageComponent {
  subjectPageService = inject(SubjectPageService);
  subject: SubjectList = {
    subject_id: 0,
    name: '',
    subject_code: '',
    credits: 0
  }
  constructor() {
    this.subjectPageService.getSubjectById()
      .subscribe(value => {
        this.subject = value
      });
  }
}
