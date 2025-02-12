import {Component, inject} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {SubjectPageService} from '../../../data-access/services/subject-page.service';
import {SubjectList} from '../../../data-access/interfaces/subject-page.interface';

@Component({
  selector: 'app-add-subject-page',
  imports: [
    FormsModule
  ],
  templateUrl: './add-subject-page.component.html',
  standalone: true
})
export class AddSubjectPageComponent {
  subjectPageService = inject(SubjectPageService);
  newSubject: SubjectList = {
    subject_id: 0,
    name: '',
    subject_code: '',
    credits: 0
  }

  onAddSubject() {
    this.subjectPageService.saveSubject(this.newSubject)
      .subscribe({
        next: response => console.log('Успешно добавлен: ', response),
        error: err => console.error('Ошибка добавления: ', err)
      });
  }
}
