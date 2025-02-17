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

  constructor(private router: Router) {
    this.studentPageService.getStudentList()
      .subscribe(value => {
        this.studentsList = value
      });
  }

  onEditStudent(studentId: number) {
    this.router.navigate(['/studentCard'], { queryParams: { student_id: studentId} });
  }

  onAddStudent() {
    this.router.navigate(['/addStudent']);
  }

  onDeleteStudent(studentId: number) {
    this.studentPageService.deleteStudent(studentId)
      .subscribe({
        next: (response: {message: string}) => alert(response.message),
        error: (error: {message: string}) => alert(error.message),
      });
    window.location.reload();
  }
}
