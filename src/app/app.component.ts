import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {SubjectPageComponent} from './pages/subject/subject-page/subject-page.component';
import {StudentListComponent} from './pages/student/student-page/student-page.component';
import {GroupPageComponent} from './pages/group/group-page/group-page.component';
import {InGroupStudentsPageComponent} from './pages/group/in-group-students-page/in-group-students-page.component';
import {SelectGroupPageComponent} from './pages/journal/select-group-page/select-group-page.component';
import {SelectSubjectPageComponent} from './pages/journal/select-subject-page/select-subject-page.component';
import {StudentCardPageComponent} from './pages/student/student-card-page/student-card-page.component';
import {SubjectCardPageComponent} from './pages/subject/subject-card-page/subject-card-page.component';
import {GroupCardPageComponent} from './pages/group/group-card-page/group-card-page.component';
import {AddStudentPageComponent} from './pages/student/add-student-page/add-student-page.component';
import {
  AddStudentsInGroupPageComponent
} from './pages/group/add-students-in-group-page/add-students-in-group-page.component';
import {SlideBarComponent} from './commons/components/navigation/slide-bar/slide-bar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, SlideBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
}
