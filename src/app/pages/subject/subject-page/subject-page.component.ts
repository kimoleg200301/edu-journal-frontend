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
  subjectPageService = inject(SubjectPageService);
  subjectsList: SubjectList[] = [];

  constructor(private route: Router) {
    this.subjectPageService.getSubjectList()
      .subscribe(value => {
        this.subjectsList = value;
      })
  }

  onEditSubject(subjectId: number) {
    this.route.navigate(['/subjectCard'], { queryParams: { subject_id: subjectId } });
  }

  onAddSubject() {
    this.route.navigate(['/addSubject']);
  }

  onDeleteSubject(subjectId: number) {
    this.subjectPageService.deleteSubject(subjectId)
      .subscribe({
        next: (response: {message: string}) => alert(response.message),
        error: (error: {message: string}) => alert(error.message),
      });
    window.location.reload();
  }
}
