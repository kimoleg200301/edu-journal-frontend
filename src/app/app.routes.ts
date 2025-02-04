import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GradebookComponent } from '../trash/gradebook/gradebook.component';
import { GroupsComponent } from '../trash/groups/groups.component';
import { StudentsComponent } from '../trash/students/students.component';

export const routes: Routes = [
  { path: '', component: GradebookComponent},
  { path: 'groups', component: GroupsComponent},
  { path: 'students', component: StudentsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRouting {}
