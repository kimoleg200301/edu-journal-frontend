import {Component, inject} from '@angular/core';
import {StudentPageService} from '../../../data-access/services/student-page.service';
import {StudentList} from '../../../data-access/interfaces/student-page.interface';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-student-card-page',
  imports: [
    FormsModule
  ],
  standalone: true,
  templateUrl: './student-card-page.component.html',
})
export class StudentCardPageComponent {
  studentPageService = inject(StudentPageService);
  student: StudentList = {
    student_id: 0,
    firstname: '',
    lastname: '',
    birth_date: '',
    gender: '',
    iin: '',
    living_adress: '',
    edu_group_id: 0
  };

  constructor() {
    this.studentPageService.getStudentById()
      .subscribe(value => {
        this.student = value;
      })
  }
}
