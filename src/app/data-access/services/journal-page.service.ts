import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {JournalList} from '../interfaces/journal-page.interface';

export interface Grades {
  student_id: number;
  mark: number;
  date_for: string;
}

@Injectable({
  providedIn: 'root'
})
export class JournalPageService {
  http = inject(HttpClient);
  baseApiUrl = 'http://localhost:8080/api/v1/journals';

  constructor(private route: ActivatedRoute) {
  }

  getJournal(edu_group_id: number, subject_id: number, date: string): Observable<JournalList[]>  {
    return this.http.get<JournalList[]>(`${this.baseApiUrl}/find_marks?edu_group_id=${edu_group_id}&subject_id=${subject_id}&date=${date}`);
  }

  setMarks(grades: Grades[], edu_group_id: number, subject_id: number): Observable<{message: string}> {
    return this.http.post<{message: string}>(`${this.baseApiUrl}/set_marks?edu_group_id=${edu_group_id}&subject_id=${subject_id}`, grades, {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true
    });
  }
}
