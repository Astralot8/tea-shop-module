import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { SearchService } from '../../../services/search.service';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  public searchValue: string = '';
  
  public searchSubject: Subject<string> = new Subject<string>();
  constructor(
    private router: Router,
    public searchService: SearchService
  ) {

    this.searchSubject.subscribe(query => {
      this.searchService.setSearchQuery(query); // передача запроса в сервис
    })
  }

  ngOnInit(): void {
    
  }

  searchProducts() {
    this.searchSubject.next(this.titleCaseWord(this.searchValue));
    this.router.navigate(['/products'])
  }

  resetSearch() {
    this.searchValue = '';
    this.searchSubject.next(this.searchValue);
  }

  titleCaseWord(searchValue: string): string {
    if(searchValue !== ''){
      return searchValue[0].toUpperCase() + searchValue.substring(1).toLowerCase();
    }
    return searchValue;
    
  }
}
