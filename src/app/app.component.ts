import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {SubjectPageComponent} from './pages/subject/subject-page/subject-page.component';
import {StudentListComponent} from './pages/student/student-page/student-page.component';
import {GroupPageComponent} from './pages/group/group-page/group-page.component';
import {InGroupPageComponent} from './pages/group/in-group-page/in-group-page.component';
import {SelectGroupPageComponent} from './pages/journal/select-group-page/select-group-page.component';
import {SelectSubjectPageComponent} from './pages/journal/select-subject-page/select-subject-page.component';
import {StudentCardPageComponent} from './pages/student/student-card-page/student-card-page.component';
import {SubjectCardPageComponent} from './pages/subject/subject-card-page/subject-card-page.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, SubjectPageComponent, StudentListComponent, GroupPageComponent, InGroupPageComponent, SelectGroupPageComponent, SelectSubjectPageComponent, StudentCardPageComponent, SubjectCardPageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'edu-journal-frontend';
  age = 0;
}
