import {Component, inject} from '@angular/core';
import {JournalPageService} from '../../../data-access/services/journal-page.service';
import {JournalList} from '../../../data-access/interfaces/journal-page.interface';
import {ActivatedRoute, Router} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {Message} from '../../../data-access/interfaces/message.interface';
import {NgForOf, NgIf} from '@angular/common';
import {HttpErrorResponse} from '@angular/common/http';
import {StudentList} from '../../../data-access/interfaces/student-page.interface';
import {StudentAttend} from '../../../data-access/interfaces/student-attend.interface';
import {GroupPageService} from '../../../data-access/services/group-page.service';
import {SubjectPageService} from '../../../data-access/services/subject-page.service';
import {GroupList} from '../../../data-access/interfaces/group-page.interface';
import {WS_ORIGIN} from '../../../commons/api.config';
import { Chart } from 'chart.js/auto';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export interface Grades {
  student_id: number;
  mark: number;
  date_for: string;
}

export interface Student {
  student_id: number;
  firstname: string;
  lastname: string;
  image?: string; // base64 строка или URL
}

@Component({
  selector: 'app-journal-page',
  imports: [FormsModule, NgIf, NgForOf],
  templateUrl: './journal-page.component.html',
  standalone: true
})
export class JournalPageComponent {
  journalPageService = inject(JournalPageService);
  groupPageService = inject(GroupPageService);
  subjectPageService = inject(SubjectPageService);

  edu_group_id: number = 0;
  subject_id: number = 0;

  groupName: string = '';
  subjectName: string = '';

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

  sessionEnded = false;
  presentStudents: Student[] = [];
  absentStudents: Student[] = [];
  skipStats: { firstname: string; lastname: string; absences: number; percent: number }[] = [];
  mostSkippedStudent: { firstname: string; lastname: string } = { firstname: '', lastname: '' };
  todayString: string = '';

  constructor(private route: ActivatedRoute) {
    this.updateDaysInMonth();
    this.edu_group_id = Number(this.route.snapshot.queryParamMap.get('edu_group_id'));
    this.subject_id = Number(this.route.snapshot.queryParamMap.get('subject_id'));
  }

  ngOnInit() {
    this.journalPageService.connect(`${WS_ORIGIN}/ws?edu_group_id=${this.edu_group_id}`);

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

    this.groupPageService.getGroupById().subscribe(result => {
      this.groupName = result.name;
    });

    this.subjectPageService.getSubjectById().subscribe(result => {
      this.subjectName = result.name;
    })

    this.todayString = this.getTodayDate();
    this.updateJournal();
  }

  getTodayDate(): string {
    const today = new Date();
    const y = today.getFullYear();
    const m = (today.getMonth() + 1).toString().padStart(2, '0');
    const d = today.getDate().toString().padStart(2, '0');
    return `${y}-${m}-${d}`;
  }

  isFutureDate(date: string): boolean {
    return date > this.todayString;
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
          alert(response.message);
          if (!flag) {
            setTimeout(() => {
              this.generateReport();
              this.sessionEnded = true;
              this.markAbsentees();
            }, 0);
          }
        },
        error: (error: HttpErrorResponse) => {
          this.start = false;
          alert(error.error.message);
        }
      });
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

  generateReport() {
    const totalDays = this.daysInMonth.length;
    const attendanceMap = new Map<number, number>();

    this.students.forEach(student => {
      let presentDays = 0;
      for (const day of this.daysInMonth) {
        const date = this.getDateFor(day.value);
        const mark = this.gradesMap[student.student_id]?.[date];
        if (mark !== null && mark !== undefined) {
          presentDays++;
        }
      }
      attendanceMap.set(student.student_id, presentDays);
    });

    this.presentStudents = this.newStudents.filter(s => s.student_id !== 0);
    const presentIds = new Set(this.presentStudents.map(s => s.student_id));
    this.absentStudents = this.students.filter(s => !presentIds.has(s.student_id));

    this.skipStats = this.students.map(s => {
      const present = attendanceMap.get(s.student_id) || 0;
      const absences = totalDays - present;
      const percent = totalDays === 0 ? 0 : Math.round((absences / totalDays) * 100);
      return { firstname: s.firstname, lastname: s.lastname, absences, percent };
    });

    this.mostSkippedStudent = this.skipStats.reduce((max, curr) => curr.absences > max.absences ? curr : max, this.skipStats[0]);

    setTimeout(() => this.renderCharts(), 0);
  }

  renderCharts() {
    const pieCtx = document.getElementById('pieChart') as HTMLCanvasElement;
    const barCtx = document.getElementById('barChart') as HTMLCanvasElement;

    if (!pieCtx || !barCtx) return;

    const labels = this.skipStats.map(stat => `${stat.firstname} ${stat.lastname}`);
    const data = this.skipStats.map(stat => stat.absences);

    new Chart(pieCtx, {
      type: 'pie',
      data: {
        labels,
        datasets: [{
          label: 'Пропуски',
          data,
          backgroundColor: [
            '#FF6384', '#36A2EB', '#FFCE56', '#8E44AD', '#E67E22', '#2ECC71', '#1ABC9C'
          ]
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom'
          }
        }
      }
    });

    new Chart(barCtx, {
      type: 'bar',
      data: {
        labels,
        datasets: [{
          label: 'Пропуски по студентам',
          data,
          backgroundColor: 'rgba(54, 162, 235, 0.5)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 1
            }
          }
        },
        plugins: {
          legend: {
            display: false
          }
        }
      }
    });
  }

  downloadReport() {
    const reportElement = document.querySelector('.report-container') as HTMLElement;
    if (!reportElement) return;

    html2canvas(reportElement).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('attendance-report.pdf');
    });
  }

  markAbsentees() {
    const presentIds = new Set(this.newStudents.map(s => s.student_id));
    const currentDate = this.getTodayDate();

    this.students.forEach(student => {
      if (!presentIds.has(student.student_id)) {
        if (!this.gradesMap[student.student_id]) {
          this.gradesMap[student.student_id] = {};
        }
        this.gradesMap[student.student_id][currentDate] = 0;
      }
    });
  }
}
