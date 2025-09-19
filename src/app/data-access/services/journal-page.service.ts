import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {API_V1} from '../../commons/api.config';
import {ActivatedRoute} from '@angular/router';
import {Observable, Subject} from 'rxjs';
import {JournalList} from '../interfaces/journal-page.interface';
import {StudentAttend} from '../interfaces/student-attend.interface';

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
  private socket: WebSocket | undefined;
  private messageSubject = new Subject<StudentAttend>();
  baseApiUrl = `${API_V1}/journals`;

  constructor(private route: ActivatedRoute) {
  }

  connect(url: string): void {
    this.socket = new WebSocket(url);

    this.socket.onopen = () => {
      console.log('✅ WebSocket соединение установлено');
    };

    this.socket.onmessage = (event) => {
      console.log('📩 Сообщение от сервера');
      try {
        const parsed = JSON.parse(event.data)
        this.messageSubject.next(parsed);
      } catch (e) {
        console.error('❌ Ошибка парсинга JSON:', e);
      }
    };

    this.socket.onerror = (error) => {
      console.error('❌ Ошибка WebSocket:', error);
    };

    this.socket.onclose = (event) => {
      console.log('❌ Соединение закрыто:', event);
    };
  }

  getJournal(edu_group_id: number, subject_id: number, date: string): Observable<JournalList[]>  {
    return this.http.get<JournalList[]>(`${this.baseApiUrl}/find_marks?edu_group_id=${edu_group_id}&subject_id=${subject_id}&date=${date}`);
  }

  startSession(edu_group_id: number, subject_id: number, date: string, flag: boolean): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${this.baseApiUrl}/start_session?edu_group_id=${edu_group_id}&subject_id=${subject_id}&date=${date}&flag=${flag}`, {}, {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true
    })
  }

  setMarks(grades: Grades[], edu_group_id: number, subject_id: number): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${this.baseApiUrl}/set_marks?edu_group_id=${edu_group_id}&subject_id=${subject_id}`, grades, {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true
    });
  }

  // getReport() {
  //   return this.http.get('/api/reports/' + sessionId, { responseType: 'blob' })
  //     .subscribe(blob => {
  //       const url = window.URL.createObjectURL(blob);
  //       window.open(url, '_blank');
  //     });
  // }

  onMessage(): Observable<StudentAttend> {
    return this.messageSubject.asObservable();
  }
}
