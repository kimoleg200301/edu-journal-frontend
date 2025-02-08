import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SelectGroupPageInterface} from '../interfaces/select-group-page.interface';

@Injectable({
  providedIn: 'root'
})
export class SelectGroupPageService {
  http = inject(HttpClient);
  baseUrlApi = "http://localhost:8080/api/v1/groups";

  getGroupList() {
    return this.http.get<SelectGroupPageInterface[]>(`${this.baseUrlApi}/`)
  }
}
