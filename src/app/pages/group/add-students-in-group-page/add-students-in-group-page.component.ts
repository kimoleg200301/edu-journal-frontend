import {Component, inject} from '@angular/core';
import {StudentPageService} from '../../../data-access/services/student-page.service';
import {StudentList} from '../../../data-access/interfaces/student-page.interface';
import {response} from 'express';

@Component({
  selector: 'app-add-students-in-group-page',
  imports: [],
  templateUrl: './add-students-in-group-page.component.html',
  standalone: true
})
export class AddStudentsInGroupPageComponent {
  studentPageService = inject(StudentPageService);
  studentsList: StudentList[] = [];

  constructor() {
    this.studentPageService.getStudentList()
      .subscribe(value => {
        this.studentsList = value;
      });
  }

  onAddStudents() {
    const newStudents = {
      student_id: 0,
      firstname: '',
      lastname: '',
      birth_date: '',
      gender: '',
      iin: '',
      living_adress: '',
      edu_group_id: 0
    };

    this.studentPageService.saveStudent(newStudents)
      .subscribe({
        next: response => console.log('Успешно добавлен: ', response),
        error: err => console.error('Ошибка добавления: ', err)
      });
  }
}
