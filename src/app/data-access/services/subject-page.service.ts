import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SubjectList} from '../interfaces/subject-page.interface';

@Injectable({
  providedIn: 'root'
})
export class SubjectPageService {
  http = inject(HttpClient);
  baseApiUrl = 'http://localhost:8080/api/v1/subjects/';

  getSubjectList() {
    return this.http.get<SubjectList[]>(`${this.baseApiUrl}`);
  }
}
