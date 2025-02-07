import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {SubjectPageComponent} from './pages/subject/subject-page/subject-page.component';
import {StudentListComponent} from './pages/student/student-page/student-page.component';
import {GroupPageComponent} from './pages/group/group-page/group-page.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, SubjectPageComponent, StudentListComponent, GroupPageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'edu-journal-frontend';
  age = 0;
}
