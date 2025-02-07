import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SubjectPageService} from './subject-page.service';
import {GroupList} from '../interfaces/group-page.interface';

@Injectable({
  providedIn: 'root'
})
export class GroupPageService {
  http= inject(HttpClient);
  baseApiUrl = "http://localhost:8080/api/v1/groups/"

  getGroupList () {
    return this.http.get<GroupList[]>(`${this.baseApiUrl}`);
  }
}
