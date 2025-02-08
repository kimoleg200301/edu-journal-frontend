import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StudentsInGroup } from '../interfaces/in-group-page.interface';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InGroupPageService {
  http = inject(HttpClient);
  baseApiUrl = 'http://localhost:8080/api/v1/groups/added_students_by_group_id';

  constructor(private route: ActivatedRoute) {}

  getStudentsInGroup(): Observable<StudentsInGroup[]> {
    return this.route.queryParamMap.pipe(
      map(params => params.get('edu_group_id') || '0'), // Значение по умолчанию
      switchMap(edu_group_id =>
        this.http.get<StudentsInGroup[]>(`${this.baseApiUrl}?edu_group_id=${edu_group_id}`)
      )
    );
  }
}
