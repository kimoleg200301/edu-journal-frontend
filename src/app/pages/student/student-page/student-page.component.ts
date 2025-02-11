import {Component, inject} from '@angular/core';
import {JsonPipe} from '@angular/common';
import {StudentList} from '../../../data-access/interfaces/student-page.interface';
import {StudentPageService} from '../../../data-access/services/student-page.service';

@Component({
  selector: 'app-student-page',
  imports: [],
  standalone: true,
  templateUrl: './student-page.component.html',
})
export class StudentListComponent {
  studentPageService = inject(StudentPageService);
  studentsList: StudentList[] = [];

  constructor() {
    this.studentPageService.getStudentList()
      .subscribe(value => {
        this.studentsList = value
      });
  }
}
