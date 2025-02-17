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

  saveStudent(data: StudentList): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${this.baseApiUrl}/save_student`, data, {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true
    });
  }

  updateStudent(data: StudentList): Observable<{ message: string }> {
    return this.http.put<{ message: string }>(`${this.baseApiUrl}/update_student`, data, {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true
    });
  }

  deleteStudent(student_id: number): Observable<{ message: string }> {
    console.log(student_id);
    return this.http.delete<{ message: string }>(`${this.baseApiUrl}/delete_student/${student_id}`);
  }
}
