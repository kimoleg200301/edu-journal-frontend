import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GroupList} from '../interfaces/group-page.interface';
import {Observable, switchMap} from 'rxjs';
import {map} from 'rxjs/operators';
import {SubjectList} from '../interfaces/subject-page.interface';
import {ActivatedRoute} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GroupPageService {
  http= inject(HttpClient);
  baseApiUrl = "http://localhost:8080/api/v1/groups"

  constructor(private route: ActivatedRoute) {
  }

  getGroupList () {
    return this.http.get<GroupList[]>(`${this.baseApiUrl}/`);
  }

  getGroupById(): Observable<GroupList> {
    return this.route.queryParamMap.pipe(
      map(params => params.get('edu_group_id') || '0'),
      switchMap(edu_group_id =>
        this.http.get<GroupList>(`${this.baseApiUrl}/info_group?edu_group_id=${edu_group_id}`)
      )
    );
  }
}
