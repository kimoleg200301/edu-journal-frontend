import {Component, inject} from '@angular/core';
import {InGroupPageService} from '../../../data-access/services/in-group-page.service';
import {StudentsInGroup} from '../../../data-access/interfaces/in-group-page.interface';

@Component({
  selector: 'app-in-group-page',
  imports: [],
  templateUrl: './in-group-page.component.html',
})
export class InGroupPageComponent {
  getStudentsInGroup = inject(InGroupPageService);
  studentsInGroup: StudentsInGroup[] = [];

  constructor() {
    this.getStudentsInGroup.getStudentsInGroup()
      .subscribe(value => {
        this.studentsInGroup = value;
      });
  }
}
