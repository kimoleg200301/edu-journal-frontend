import {Component, inject} from '@angular/core';
import {JournalPageService} from '../../../data-access/services/journal-page.service';
import {JournalList} from '../../../data-access/interfaces/journal-page.interface';
import {ActivatedRoute, Router} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {Message} from '../../../data-access/interfaces/message.interface';
import {NgIf} from '@angular/common';
import {HttpErrorResponse} from '@angular/common/http';
import {StudentList} from '../../../data-access/interfaces/student-page.interface';
import {StudentAttend} from '../../../data-access/interfaces/student-attend.interface';

export interface Grades {
  student_id: number;
  mark: number;
  date_for: string;
}

export interface Student {
  student_id: number;
  firstname: string;
  lastname: string;
  image: string; // base64 строка или URL
}

@Component({
  selector: 'app-journal-page',
  imports: [FormsModule, NgIf],
  templateUrl: './journal-page.component.html',
  standalone: true
})
export class JournalPageComponent {
  journalPageService = inject(JournalPageService);
  edu_group_id: number = 0;
  subject_id: number = 0;

  start = false;

  studentMap = new Map<number, Student>();

  student: StudentAttend = {
    student_id: 0,
    firstname: '',
    lastname: '',
    birth_date: '',
    gender: '',
    iin: '',
    living_adress: '',
    edu_group_id: 0,
    image: ''
  };

  newStudents: [{ student_id: number, firstname: string, lastname: string, image: string }] = [{
    student_id: 0,
    firstname: '',
    lastname: '',
    image: ''
  }];

  // Список месяцев и лет
  months = [
    {name: 'Январь', value: 1},
    {name: 'Февраль', value: 2},
    {name: 'Март', value: 3},
    {name: 'Апрель', value: 4},
    {name: 'Май', value: 5},
    {name: 'Июнь', value: 6},
    {name: 'Июль', value: 7},
    {name: 'Август', value: 8},
    {name: 'Сентябрь', value: 9},
    {name: 'Октябрь', value: 10},
    {name: 'Ноябрь', value: 11},
    {name: 'Декабрь', value: 12}
  ];
  years = Array.from({length: 10}, (_, i) => new Date().getFullYear() - i);
  selectedMonth = this.months[0].value; // например, февраль
  selectedYear = new Date().getFullYear();

  // Геттер для формирования префикса даты (год-месяц)
  get yearAndMonth(): string {
    return `${this.selectedYear}-${this.selectedMonth.toString().padStart(2, '0')}`;
  }

  // Массив дней в месяце
  daysInMonth: { value: number; index: number }[] = [];

  students: { student_id: number; firstname: string; lastname: string }[] = [];

  // Итоговый массив оценок для отправки
  grades: Grades[] = [];

  // Объект для хранения оценок с двусторонней привязкой:
  // { [studentId]: { [date: string]: number } }
  gradesMap: { [studentId: number]: { [date: string]: number } } = {};

  constructor(private route: ActivatedRoute) {
    this.updateDaysInMonth();
    this.edu_group_id = Number(this.route.snapshot.queryParamMap.get('edu_group_id'));
    this.subject_id = Number(this.route.snapshot.queryParamMap.get('subject_id'));
  }

  ngOnInit() {
    this.journalPageService.connect('ws://localhost:8080/ws');

    this.journalPageService.onMessage()
      .subscribe(msg => {
        this.student = msg;

        if (this.studentMap.has(msg.student_id)) {
          const existing = this.studentMap.get(msg.student_id)!;
          existing.image = msg.image;
        } else {
          const newStudent = {
            student_id: msg.student_id,
            firstname: msg.firstname,
            lastname: msg.lastname,
            image: msg.image
          };
          this.studentMap.set(msg.student_id, newStudent);
          this.newStudents.push(newStudent);
        }
      });

    this.updateJournal();
  }

  updateJournal() {
    // Обновляем массив дней для выбранного месяца и года
    this.updateDaysInMonth();
    console.log("Hello updateJournal!")

    // Запрашиваем оценки для выбранного периода
    this.journalPageService.getJournal(this.edu_group_id, this.subject_id, this.yearAndMonth)
      .subscribe((value: JournalList[]) => {
        // Обновляем данные журнала
        const studentMap = new Map<number, { student_id: number; firstname: string; lastname: string }>();

        value.forEach(entry => {
          if (!studentMap.has(entry.student_id)) {
            studentMap.set(entry.student_id, {
              student_id: entry.student_id,
              firstname: entry.firstname,
              lastname: entry.lastname
            });
          }
          // Инициализируем объект для оценок, если ещё не создан
          if (!this.gradesMap[entry.student_id]) {
            this.gradesMap[entry.student_id] = {};
          }
          // Записываем оценку по дате
          this.gradesMap[entry.student_id][entry.date_for] = entry.mark;
        });
        // Преобразуем мапу студентов в массив для отображения строк таблицы
        this.students = Array.from(studentMap.values());
      });
  }

  updateDaysInMonth() {
    const daysCount: number = new Date(this.selectedYear, this.selectedMonth, 0).getDate();
    this.daysInMonth = Array.from({length: daysCount}, (_, index) => ({
      value: index + 1,
      index: index
    }));
  }

  // Метод для получения даты в формате "YYYY-MM-DD" для конкретного дня месяца
  getDateFor(day: number): string {
    return `${this.yearAndMonth}-${day.toString().padStart(2, '0')}`;
  }

  startSession(flag: boolean) {
    this.journalPageService.startSession(this.edu_group_id, this.subject_id, this.yearAndMonth, flag)
      .subscribe({
        next: (response: { message: string }) => {
          this.start = flag;
          alert(response.message)
          console.log(response.message)
        },
        error: (error: HttpErrorResponse) => {
          this.start = false;
          alert(error.error.message)
          console.log(error.error.message)
        }
      });

    // if (flag) {
    //   this.setMarks(true);
    // }
  }

  // Метод для формирования итогового массива оценок и отправки данных
  setMarks(isAttend: boolean) {
    this.grades = [];
    for (const studentId in this.gradesMap) {
      for (const date in this.gradesMap[studentId]) {
        const mark = this.gradesMap[studentId][date];
        if (mark !== null && mark !== undefined) {
          this.grades.push({
            student_id: Number(studentId),
            mark: +mark,
            date_for: date
          });
        }
      }
    }

    console.log('Отправляемые оценки:', this.grades);

    this.journalPageService.setMarks(this.grades, this.edu_group_id, this.subject_id)
      .subscribe({
        next: (response: { message: string }) => alert(response.message),
        error: (error: { message: string }) => alert(error.message),
      });
    window.location.reload();
  }
}
