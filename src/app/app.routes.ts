import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {StudentListComponent} from './pages/student/student-page/student-page.component';
import {AddStudentPageComponent} from './pages/student/add-student-page/add-student-page.component';
import {StudentCardPageComponent} from './pages/student/student-card-page/student-card-page.component';
import {SubjectPageComponent} from './pages/subject/subject-page/subject-page.component';
import {SubjectCardPageComponent} from './pages/subject/subject-card-page/subject-card-page.component';
import {GroupPageComponent} from './pages/group/group-page/group-page.component';
import {GroupCardPageComponent} from './pages/group/group-card-page/group-card-page.component';
import {InGroupPageComponent} from './pages/group/in-group-page/in-group-page.component';
import {
  AddStudentsInGroupPageComponent
} from './pages/group/add-students-in-group-page/add-students-in-group-page.component';
import {SelectGroupPageComponent} from './pages/journal/select-group-page/select-group-page.component';
import {SelectSubjectPageComponent} from './pages/journal/select-subject-page/select-subject-page.component';
import {AddSubjectPageComponent} from './pages/subject/add-subject-page/add-subject-page.component';

export const routes: Routes = [
  { path: '', component: StudentListComponent },
  { path: 'addStudent', component: AddStudentPageComponent },
  { path: 'studentCard', component: StudentCardPageComponent },
  { path: 'subjectList', component: SubjectPageComponent },
  { path: 'addSubject', component: AddSubjectPageComponent},
  { path: 'subjectCard', component: SubjectCardPageComponent },
  { path: 'groupList', component: GroupPageComponent },
  { path: 'groupCard', component: GroupCardPageComponent },
  { path: 'inGroup', component: InGroupPageComponent },
  { path: 'addStudentsInGroup', component: AddStudentsInGroupPageComponent },
  { path: 'selectGroup', component: SelectGroupPageComponent },
  { path: 'selectSubject', component: SelectSubjectPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRouting {}
