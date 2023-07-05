import {
  Component,
  Output,
  EventEmitter,
  OnInit,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { ApiService } from '../services/api.service';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css'],
})
export class SearchBoxComponent implements OnInit {
  dataArray: any;
  searchTerm: string = '';
  @Output() searchQuery = new EventEmitter<string>();

  subscription?: Subscription;
  constructor(private apiService: ApiService) {
    this.dataArray = this.apiService.getArray();
  }
  ngOnInit(): void {
    setTimeout(() => {
      this.dataArray = this.apiService.getArray();
    }, 3000);
  }

  search() {
    this.searchQuery.emit(this.searchTerm);
  }
  searchText: string = '';
  isFocused: boolean = false;

  onInputChange() {
    // Check if the search input has a value
    if (this.searchText.trim() === '') {
      this.hideClearIcon();
    } else {
      this.showClearIcon();
    }
  }

  onInputFocus() {
    this.isFocused = true;
  }

  clearInput() {
    this.searchText = '';
    this.hideClearIcon();
  }

  hideClearIcon() {
    const clearIcon = document.querySelector('.cross-icon');
    clearIcon?.classList.remove('show');
  }

  showClearIcon() {
    const clearIcon = document.querySelector('.cross-icon');
    clearIcon?.classList.add('show');
  }
}
