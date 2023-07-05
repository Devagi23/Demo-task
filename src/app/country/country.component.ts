import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css'],
})
export class CountryComponent implements OnInit {
  dataArray: any;
  subscription?: Subscription;
  expandedCountry: number | null = null;
  showContent = true;
  show = true;
  currentPage = 1;
  totalPages = 10;
  fullArray: any;
  totalcourse = 0;
  sortKey = 'best_rank';
  countries: { id: number; name: string }[] = [
    { id: 1, name: 'America' },
    { id: 2, name: 'Africa' },
    { id: 3, name: 'India' },
    { id: 4, name: 'Italy' },
    { id: 5, name: 'Indonesia' },
    { id: 6, name: 'Greece' },
    { id: 7, name: 'China' },
    { id: 8, name: 'Brazil' },
    { id: 9, name: 'France' },
    { id: 10, name: 'Canada' },
  ];
  desciplines: { id: number; name: string }[] = [
    { id: 1, name: 'Arts' },
    { id: 2, name: 'Agriculture' },
    { id: 3, name: 'Biology' },
    { id: 4, name: 'Computer science' },
    { id: 5, name: 'Chemistry' },
    { id: 6, name: 'Maths' },
    { id: 7, name: 'Economics' },
    { id: 8, name: 'History' },
    { id: 9, name: 'Law' },
    { id: 10, name: 'Others' },
  ];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.getData();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  getData(): void {
    const id = { application_id: '946917d1-a3f8-4b23-84b5-06c203532cee' };
    const pageSize = 10;
    this.sortKey =
      this.activeTab == 3
        ? 'acceptance_rate'
        : this.activeTab == 4
        ? 'tuition_fee'
        : 'best_rank';
    this.subscription = this.apiService
      .postData(id, this.activeTab, this.currentPage, pageSize, this.sortKey)
      .subscribe(
        (res: any) => {
          this.dataArray = res.data.results;
          this.fullArray = res.data;
          this.totalcourse = res.data.total;
          this.apiService.setArray(this.fullArray);
        },
        (error: any) => {}
      );
  }

  toggleContent(): void {
    this.showContent = !this.showContent;
  }

  toggleSearchBox(event: Event, countryId: number): void {
    event.stopPropagation();
    if (this.expandedCountry === countryId) {
      this.expandedCountry = null;
    } else {
      this.expandedCountry = countryId;
    }
  }

  activeTab = 1;
  setActiveTab(tabNumber: number): void {
    this.activeTab = tabNumber;
    this.currentPage = 1;
    this.getData();
  }

  toggleDisciplines(): void {
    this.show = !this.show;
  }

  getPageNumbers(): number[] {
    const totalPages = this.totalPages;
    const displayRange = 5;
    const currentPage = this.currentPage;
    const rangeStart = Math.max(1, currentPage - displayRange);
    const rangeEnd = Math.min(totalPages, currentPage + displayRange);
    return Array.from(
      { length: rangeEnd - rangeStart + 1 },
      (_, i) => rangeStart + i
    );
  }

  goToPage(pageNumber: number): void {
    if (pageNumber >= 1 && pageNumber <= this.totalPages) {
      this.currentPage = pageNumber;
      this.getData();
    }
  }
}
