import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {StudentList} from '../interfaces/student-page.interface';
import {ActivatedRoute} from '@angular/router';
import {Observable, switchMap} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StudentPageService {
  http = inject(HttpClient);
  baseApiUrl = 'http://localhost:8080/api/v1/students';

  constructor(private router: ActivatedRoute ) {
  }

  getStudentList(): Observable<StudentList[]> {
    return this.http.get<StudentList[]>(`${this.baseApiUrl}/`)
  }

  getStudentById(): Observable<StudentList> {
    return this.router.queryParamMap.pipe(
      map(params => params.get('student_id')),
      switchMap(student_id =>
        this.http.get<StudentList>(`${this.baseApiUrl}/info_student?student_id=${student_id}`)
      )
    );
  }

  saveStudent(data: StudentList): Observable<StudentList> {
    return this.http.post<StudentList>(`${this.baseApiUrl}/save_student`, data, {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true
    });
  }

  updateStudent(data: StudentList): Observable<StudentList> {
    return this.http.put<StudentList>(`${this.baseApiUrl}/update_student`, data, {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true
    });
  }

  deleteStudent(student_id: number): Observable<Object> {
    console.log(student_id);
    return this.http.delete(`${this.baseApiUrl}/delete_student/${student_id}`);
  }
}
