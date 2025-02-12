import {Component, inject} from '@angular/core';
import {StudentPageService} from '../../../data-access/services/student-page.service';
import {StudentList} from '../../../data-access/interfaces/student-page.interface';
import {FormsModule} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-student-page',
  imports: [
    FormsModule
  ],
  templateUrl: './add-student-page.component.html',
  standalone: true
})
export class AddStudentPageComponent {
  studentPageService = inject(StudentPageService);
  newStudent: StudentList = {
    student_id: 0,
    firstname: '',
    lastname: '',
    birth_date: '',
    gender: '',
    iin: '',
    living_adress: '',
    edu_group_id: 0
  };

  constructor(private router: Router) {
  }

  onAddStudent() {
    this.studentPageService.saveStudent(this.newStudent)
      .subscribe({
        next: response => console.log('Успешно добавлен: ', response),
        error: err => console.error('Ошибка добавления: ', err)
      });
    this.router.navigate(['/']);
  }
}
