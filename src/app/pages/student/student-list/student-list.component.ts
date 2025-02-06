import {Component, inject} from '@angular/core';
import {StudentListService} from '../../../data-access/services/student-list.service';
import {JsonPipe} from '@angular/common';
import {StudentList} from '../../../data-access/interfaces/student-list.interface';

@Component({
  selector: 'app-student-list',
  imports: [
    JsonPipe
  ],
  standalone: true,
  templateUrl: './student-list.component.html',
  styleUrl: './student-list.component.css'
})
export class StudentListComponent {
  studentListService = inject(StudentListService);
  studentsList: StudentList[] = [];

  constructor() {
    this.studentListService.getStudentList()
      .subscribe(val => {
        this.studentsList = val
      });
  }
}
