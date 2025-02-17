import {Component, inject} from '@angular/core';
import {SubjectPageService} from '../../../data-access/services/subject-page.service';
import {SubjectList} from '../../../data-access/interfaces/subject-page.interface';
import {FormsModule} from '@angular/forms';
import {Router} from '@angular/router';

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
  constructor(private route: Router) {
    this.subjectPageService.getSubjectById()
      .subscribe(value => {
        this.subject = value
      });
  }

  onUpdateSubject() {
    this.subjectPageService.updateSubject(this.subject)
      .subscribe({
        next: (response: {message: string}) => alert(response.message),
        error: (error: {message: string}) => alert(error.message),
      });
    this.route.navigate(['/subjectList']);
  }

  onClose() {
    this.route.navigate(['/subjectList']);
  }
}
