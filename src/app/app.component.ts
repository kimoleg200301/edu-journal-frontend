import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {StudentListComponent} from './pages/student/student-list/student-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, StudentListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {

}
