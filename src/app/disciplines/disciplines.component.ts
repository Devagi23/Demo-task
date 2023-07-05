import { Component } from '@angular/core';

@Component({
  selector: 'app-disciplines',
  templateUrl: './disciplines.component.html',
  styleUrls: ['./disciplines.component.css']
})
export class DisciplinesComponent {
  disciplines: string[] = ['Agriculture', 'Anthropology and Archaeology', 'Architecture'];
  selectedDiscipline: string | null = null;
  disciplineSearchTerm: string = '';

  toggleSearch(discipline: string) {
    this.selectedDiscipline = this.selectedDiscipline === discipline ? null : discipline;
  }
}