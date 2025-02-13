import {Component, inject} from '@angular/core';
import {StudentList} from '../../../data-access/interfaces/student-page.interface';
import {GroupPageService} from '../../../data-access/services/group-page.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormsModule} from '@angular/forms';

export interface Student_ids {
  student_id: number;
}

@Component({
  selector: 'app-add-students-in-group-page',
  imports: [
    FormsModule
  ],
  templateUrl: './add-students-in-group-page.component.html',
  standalone: true
})
export class AddStudentsInGroupPageComponent {
  groupPageService = inject(GroupPageService);
  edu_group_id = 0;
  studentsList: StudentList[] = [];
  student_ids: Student_ids[] = [];

  constructor(private router: Router, private route: ActivatedRoute) {
    this.edu_group_id = Number(this.route.snapshot.queryParamMap.get('edu_group_id'));
    this.groupPageService.getUnaddedStudentsByGroupId()
      .subscribe(value => {
        this.studentsList = value;
      });
  }

  toggleSelection(student_id: number, event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked;

    if (isChecked) {
      this.student_ids.push({ student_id });
    } else {
      this.student_ids = this.student_ids.filter(student => student.student_id !== student_id);
    }
  }

  onAddStudents() {
    console.log(this.edu_group_id);
    console.log(this.student_ids);
    this.groupPageService.addStudentsInGroup(this.student_ids, this.edu_group_id)
      .subscribe({
        next: response => console.log('Успешно добавлены: ', response),
        error: error => console.log('Ошибка добавления: ', error),
      });
    this.router.navigate(['/inGroupStudents'], { queryParams: { edu_group_id: this.edu_group_id } });
  }
}
