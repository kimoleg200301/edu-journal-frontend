import {Component, inject} from '@angular/core';
import {SelectGroupPageService} from '../../../data-access/services/select-group-page.service';
import {SelectGroupPageInterface} from '../../../data-access/interfaces/select-group-page.interface';

@Component({
  selector: 'app-select-group-page',
  imports: [],
  templateUrl: './select-group-page.component.html',
  standalone: true
})
export class SelectGroupPageComponent {
  selectGroupPageService = inject(SelectGroupPageService);
  groupsList: SelectGroupPageInterface[] = [];

  constructor() {
    this.selectGroupPageService.getGroupList()
      .subscribe(value => {
        this.groupsList = value;
      });
  }
}
