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
}
