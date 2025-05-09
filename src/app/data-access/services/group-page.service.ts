import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GroupList} from '../interfaces/group-page.interface';
import {Observable, switchMap} from 'rxjs';
import {map} from 'rxjs/operators';
import {ActivatedRoute} from '@angular/router';
import {StudentList} from '../interfaces/student-page.interface';
import {SubjectList} from '../interfaces/subject-page.interface';

export interface Student_ids {
  student_id: number;
}

export interface Subject_ids {
  subject_id: number;
}

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
      map(params => params.get('edu_group_id')),
      switchMap(edu_group_id =>
        this.http.get<GroupList>(`${this.baseApiUrl}/info_group?edu_group_id=${edu_group_id}`)
      )
    );
  }

  saveGroup(group: GroupList): Observable<GroupList> {
    return this.http.post<GroupList>(`${this.baseApiUrl}/save_group`, group, {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true
    });
  }

  deleteGroup(edu_group_id: number) {
    console.log(edu_group_id);
    return this.http.delete(`${this.baseApiUrl}/delete_group/${edu_group_id}`);
  }

  getStudentsByGroupId() {
    return this.route.queryParamMap.pipe(
      map(params => params.get('edu_group_id')),
      switchMap(edu_group_id =>
        this.http.get<StudentList[]>(`${this.baseApiUrl}/added_students_by_group_id?edu_group_id=${edu_group_id}`)
      )
    );
  }

  getUnaddedStudentsByGroupId() {
    return this.http.get<StudentList[]>(`${this.baseApiUrl}/unadded_students_by_groups`);
  }

  deleteStudentFromGroup(student_id: number): Observable<Object> {
    console.log(student_id);
    return this.http.delete(`${this.baseApiUrl}/delete_student_from_group?student_id=${student_id}`);
  }

  addStudentsInGroup(student_ids: Student_ids[], edu_group_id: number): Observable<Object> {
    return this.http.put(`${this.baseApiUrl}/add_unadded_students_in_group?edu_group_id=${edu_group_id}`, student_ids, {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true
    });
  }

  getSubjectsByGroupId() {
    return this.route.queryParamMap.pipe(
      map(params => params.get('edu_group_id')),
      switchMap(edu_group_id =>
        this.http.get<SubjectList[]>(`${this.baseApiUrl}/added_subjects_by_group_id?edu_group_id=${edu_group_id}`)
      )
    );
  }

  getUnaddedSubjectsByGroupId(edu_group_id: number) {
    return this.http.get<SubjectList[]>(`${this.baseApiUrl}/unadded_subjects_by_group_id?edu_group_id=${edu_group_id}`);
  }

  deleteSubjectFromGroup(edu_group_id: number, subject_id: number) {
    console.log(subject_id);
    return this.http.delete(`${this.baseApiUrl}/delete_subject_from_group?edu_group_id=${edu_group_id}&subject_id=${subject_id}`);
  }

  addSubjectsInGroup(subject_ids: Subject_ids[], edu_group_id: number): Observable<{ message: string, error: string }> {
    return this.http.put<{ message: string, error: string }>(`${this.baseApiUrl}/add_subjects_in_group?edu_group_id=${edu_group_id}`, subject_ids, {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true
    });
  }
}
