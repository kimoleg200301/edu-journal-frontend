import {Component, inject} from '@angular/core';
import {StudentPageService} from '../../../data-access/services/student-page.service';
import {StudentList} from '../../../data-access/interfaces/student-page.interface';
import {FormsModule} from '@angular/forms';
import {Router} from '@angular/router';

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

  constructor(private route: Router) {
    this.studentPageService.getStudentById()
      .subscribe(value => {
        this.student = value;
      })
  }

  onUpdateStudent() {
    this.studentPageService.updateStudent(this.student)
      .subscribe({
        next: response => console.log('Успешно обновлен: ', response),
        error: error => console.log('Ошибка обновления: ', error),
      });
    this.route.navigate(['/']);
  }

  onClose() {
    this.route.navigate(['/']);
  }
}
