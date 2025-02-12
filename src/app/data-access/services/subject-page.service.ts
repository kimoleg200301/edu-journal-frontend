import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SubjectList} from '../interfaces/subject-page.interface';
import {ActivatedRoute} from '@angular/router';
import {Observable, switchMap} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SubjectPageService {
  http = inject(HttpClient);
  baseApiUrl = 'http://localhost:8080/api/v1/subjects';

  constructor(private route: ActivatedRoute) {
  }

  getSubjectList(): Observable<SubjectList[]>  {
    return this.http.get<SubjectList[]>(`${this.baseApiUrl}/`);
  }

  getSubjectById(): Observable<SubjectList> {
    return this.route.queryParamMap.pipe(
      map(params => params.get('subject_id') || '0'),
      switchMap(subject_id =>
        this.http.get<SubjectList>(`${this.baseApiUrl}/info_subject?subject_id=${subject_id}`)
      )
    );
  }

  saveSubject(data: SubjectList): Observable<SubjectList> {
    return this.http.post<SubjectList>(`${this.baseApiUrl}/save_subject`, data, {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true
    });
  }

  updateSubject(data: SubjectList): Observable<SubjectList> {
    return this.http.put<SubjectList>(`${this.baseApiUrl}/update_subject`, data, {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true
    });
  }

  deleteSubject(subject_id: number): Observable<Object> {
    console.log(subject_id);
    return this.http.delete(`${this.baseApiUrl}/delete_subject/${subject_id}`);
  }
}
