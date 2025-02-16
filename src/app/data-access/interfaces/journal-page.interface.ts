export interface JournalList {
  journal_id: number;
  list_of_subject_id: number;
  student_id: number;
  firstname: string;
  lastname: string;
  mark: number | null;
  date_for: string | null;
  year: number | null;
  month: number | null;
  day: number | null;
}
