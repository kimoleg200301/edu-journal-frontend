import {Component, inject} from '@angular/core';
import {GroupPageService} from '../../../data-access/services/group-page.service';
import {StudentList} from '../../../data-access/interfaces/student-page.interface';
import {ActivatedRoute, Router} from '@angular/router';
import {map} from 'rxjs/operators';
import {switchMap} from 'rxjs';

@Component({
  selector: 'app-in-group-students-page',
  imports: [],
  templateUrl: './in-group-students-page.component.html',
  standalone: true
})
export class InGroupStudentsPageComponent {
  groupPageService = inject(GroupPageService);

  edu_group_id = 0;
  studentsInGroup: StudentList[] = [];

  groupName: string = '';

  constructor(private router: Router, private route: ActivatedRoute) {
    this.edu_group_id = Number(this.route.snapshot.queryParamMap.get('edu_group_id'));
    this.groupPageService.getStudentsByGroupId()
      .subscribe(value => {
        this.studentsInGroup = value;
      });
  }

  ngOnInit() {
    this.groupPageService.getGroupById().subscribe(result => {
      this.groupName = result.name
    });
  }

  onDeleteStudentFromGroup(student_id: number) {
    this.groupPageService.deleteStudentFromGroup(student_id)
    .subscribe({
      next: (response) => console.log('Successfully deleted', response),
      error: (error) => console.error('Failed to delete student', error)
    });
    window.location.reload()
  }

  onAddStudentsInGroup() {
    this.router.navigate(['/addStudentsInGroup'], { queryParams: { edu_group_id: this.edu_group_id }})
  }
}
