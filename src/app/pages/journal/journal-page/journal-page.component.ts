import {Component, inject} from '@angular/core';
import {JournalPageService} from '../../../data-access/services/journal-page.service';
import {JournalList} from '../../../data-access/interfaces/journal-page.interface';
import {ActivatedRoute, Router} from '@angular/router';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-journal-page',
  imports: [
    FormsModule
  ],
  templateUrl: './journal-page.component.html',
  standalone: true
})
export class JournalPageComponent {
  journalPageService = inject(JournalPageService);
  edu_group_id: number = 0;
  subject_id: number = 0;

  months = [
    { name: 'Январь', value: 1 },
    { name: 'Февраль', value: 2 },
    { name: 'Март', value: 3 },
    { name: 'Апрель', value: 4 },
    { name: 'Май', value: 5 },
    { name: 'Июнь', value: 6 },
    { name: 'Июль', value: 7 },
    { name: 'Август', value: 8 },
    { name: 'Сентябрь', value: 9 },
    { name: 'Октябрь', value: 10 },
    { name: 'Ноябрь', value: 11 },
    { name: 'Декабрь', value: 12 }
  ];
  years = Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - i); // 10 последних лет
  selectedMonth = this.months[1].value; // фильтр месяца
  selectedYear = new Date().getFullYear(); // фильтр года
  get yearAndMonth(): string {
    return `${this.selectedYear}-${this.selectedMonth.toString().padStart(2, '0')}`;
  }
  daysInMonth: {
    value: number;
    index: number;
  }[] = [{
    value: 0,
    index: 0
  }];

  journals: JournalList[] = [];

  constructor(private router: Router, private route: ActivatedRoute) {
    this.updateDaysInMonth();
    this.edu_group_id = Number(this.route.snapshot.queryParamMap.get('edu_group_id'));
    this.subject_id = Number(this.route.snapshot.queryParamMap.get('subject_id'));

    this.journalPageService.getJournal(this.edu_group_id, this.subject_id, "2025-02")
      .subscribe((value) => {
        this.journals = value
      });
    console.log(this.journals);
    // console.log(this.journals[0].day);
  }

  updateDaysInMonth() {
    const days: number = new Date(this.selectedYear, this.selectedMonth, 0).getDate();
    this.daysInMonth = Array.from({ length: days }, (_, index) => ({
      value: index + 1,
      index: index
    }));
  }

  // setMarks() {
  //   this.journalPageService.setMarks(this.grades, this.edu_group_id, this.subject_id)
  //     .subscribe({
  //       next: response => console.log('Оценки успешно выставлены: ', response),
  //       error: error => console.log('Ошибка выставления: ', error),
  //     });
  // }
}
