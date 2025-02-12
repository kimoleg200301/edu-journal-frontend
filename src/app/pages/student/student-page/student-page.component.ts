import {Component, inject} from '@angular/core';
import {JsonPipe} from '@angular/common';
import {StudentList} from '../../../data-access/interfaces/student-page.interface';
import {StudentPageService} from '../../../data-access/services/student-page.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-student-page',
  imports: [],
  standalone: true,
  templateUrl: './student-page.component.html',
})
export class StudentListComponent {
  studentPageService = inject(StudentPageService);
  studentsList: StudentList[] = [];

  constructor(private route: Router) {
    this.studentPageService.getStudentList()
      .subscribe(value => {
        this.studentsList = value
      });
  }

  onEditStudent(studentId: StudentList) {
    this.route.navigate(['/studentCard'], { queryParams: { student_id: studentId.student_id} });
  }

  onAddStudent() {
    this.route.navigate(['/addStudent']);
  }
}
