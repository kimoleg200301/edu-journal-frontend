import {Component, inject} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {SubjectPageService} from '../../../data-access/services/subject-page.service';
import {SubjectList} from '../../../data-access/interfaces/subject-page.interface';
import {Router} from '@angular/router';

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

  constructor(private router: Router) {
  }

  onAddSubject() {
    this.subjectPageService.saveSubject(this.newSubject)
      .subscribe({
        next: (response: {message: string}) => alert(response.message),
        error: (error: {message: string}) => alert(error.message),
      });
    this.router.navigate(['/subjectList']);
  }
}
