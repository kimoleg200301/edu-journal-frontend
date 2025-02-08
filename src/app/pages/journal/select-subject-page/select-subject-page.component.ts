import {Component, inject} from '@angular/core';
import {SelectSubjectPageService} from '../../../data-access/services/select-subject-page.service';
import {SelectSubjectPageInterface} from '../../../data-access/interfaces/select-subject-page.interface';

@Component({
  selector: 'app-select-subject-page',
  imports: [],
  templateUrl: './select-subject-page.component.html',
})
export class SelectSubjectPageComponent {
  selectSubjectPageService = inject(SelectSubjectPageService);
  subjectsList: SelectSubjectPageInterface[] = [];

  constructor() {
    this.selectSubjectPageService.getSubjectList()
      .subscribe(value => {
        this.subjectsList = value;
      });
  }
}
