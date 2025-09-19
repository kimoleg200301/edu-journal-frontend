import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {API_V1} from '../../commons/api.config';
import {SubjectList} from '../interfaces/subject-page.interface';
import {ActivatedRoute} from '@angular/router';
import {Observable, switchMap} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SubjectPageService {
  http = inject(HttpClient);
  baseApiUrl = `${API_V1}/subjects`;

  constructor(private route: ActivatedRoute) {
  }

  getSubjectList(): Observable<SubjectList[]>  {
    return this.http.get<SubjectList[]>(`${this.baseApiUrl}/`);
  }

  getSubjectById(): Observable<SubjectList> {
    return this.route.queryParamMap.pipe(
      map(params => params.get('subject_id')),
      switchMap(subject_id =>
        this.http.get<SubjectList>(`${this.baseApiUrl}/info_subject?subject_id=${subject_id}`)
      )
    );
  }

  saveSubject(data: SubjectList): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${this.baseApiUrl}/save_subject`, data, {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true
    });
  }

  updateSubject(data: SubjectList): Observable<{ message: string }> {
    return this.http.put<{ message: string }>(`${this.baseApiUrl}/update_subject`, data, {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true
    });
  }

  deleteSubject(subject_id: number): Observable<{ message: string }> {
    console.log(subject_id);
    return this.http.delete<{ message: string }>(`${this.baseApiUrl}/delete_subject/${subject_id}`);
  }
}
