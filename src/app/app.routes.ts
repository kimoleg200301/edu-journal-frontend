import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GradebookComponent } from './gradebook/gradebook.component';
import { GroupsComponent } from './groups/groups.component';
import { StudentsComponent } from './students/students.component';

const routes: Routes = [
  { path: '', component: GradebookComponent},
  { path: 'groups', component: GroupsComponent},
  { path: 'students', component: StudentsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRouting {}