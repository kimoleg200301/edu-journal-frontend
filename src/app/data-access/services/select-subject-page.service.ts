import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SelectSubjectPageInterface} from '../interfaces/select-subject-page.interface';
import {ActivatedRoute} from '@angular/router';
import {Observable, switchMap} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SelectSubjectPageService {
  http = inject(HttpClient);
  baseUrlApi = "http://localhost:8080/api/v1/groups"

  constructor(private route: ActivatedRoute) {
  }

  getSubjectList(): Observable<SelectSubjectPageInterface[]> {
    return this.route.queryParamMap.pipe(
      map(params => params.get('edu_group_id') || '0'),
      switchMap(edu_group_id =>
        this.http.get<SelectSubjectPageInterface[]>(`${this.baseUrlApi}/find_subjects_in_group?edu_group_id=${edu_group_id}`)
      )
    );
  }
}
