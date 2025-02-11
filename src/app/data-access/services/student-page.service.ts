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

  constructor(private route: ActivatedRoute ) {
  }

  getStudentList(): Observable<StudentList[]> {
    return this.http.get<StudentList[]>(`${this.baseApiUrl}/`)
  }

  getStudentById(): Observable<StudentList> {
    return this.route.queryParamMap.pipe(
      map(params => params.get('student_id') || '0'),
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
}
