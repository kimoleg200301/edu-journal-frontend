import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {StudentList} from '../interfaces/student-list.interface';

@Injectable({
  providedIn: 'root'
})
export class StudentListService {
  http = inject(HttpClient);
  baseApiUrl = 'http://localhost:8080/api/v1/students/';
  getStudentList() {
    return this.http.get<StudentList[]>(`${this.baseApiUrl}`)
  }
}
