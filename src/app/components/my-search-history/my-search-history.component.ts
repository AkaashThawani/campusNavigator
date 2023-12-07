import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../api.service';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-search-history',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, FlexLayoutModule, MatCardModule, MatDividerModule, MatTableModule],
  templateUrl: './my-search-history.component.html',
  styleUrl: './my-search-history.component.css'
})
export class MySearchHistoryComponent {
  data: any[] = [];
  userData: any
  displayedColumns = ['from', 'to', 'mode', 'loc', 'act']
  userid: any;
  favArray: any[] = [];
  constructor(private apiService: ApiService, private router: Router) { }

  ngOnInit() {
    this.getSearchData()

  }

  getFavSearchResult() {
    this.apiService.getUserFavSearch(this.userid).subscribe((res: any) => {
      this.favArray = res.favorite_searches.map(e => e.search_location_id)
      this.data.forEach(element => {
        if (this.favArray.includes(element.pk)) {
          element.saved = true
        }
      });
      this.data = this.data.sort((a, b) => (b.saved - a.saved))
      this.data = [...this.data]
    })
    console.log(this.data)
  }

  afterContentInit(){
    this.data = [...this.data]
  }

  saveFavSearchResult(element, remove) {
    this.apiService.saveFavSearch(this.userid, { 'search_location_id': element.pk, 'remove': remove }).subscribe((res: any) => {
      if (res.status == 'success') {
        this.apiService.openSnackBar(res?.message)
        element.saved = !remove
        this.data = [...this.data]
      } else {
        this.apiService.openSnackBar(res?.message)
      }
    }, (error) => {
      this.apiService.openSnackBar('Failed to save search result')
    })
  }

  getSearchData() {
    this.apiService.getLocations().subscribe((res) => {
      this.data = res.map((e: any) => ({ ...e.fields, pk: e.pk, saved: false }))
      // console.log(this.data)
      this.processData(this.data)
    })
  }
  processData(data: any) {
    this.userid = JSON.parse(sessionStorage.getItem('userData') as any)?.userid
    this.data = this.data.filter((e) => e.search_by == this.userid)
    this.getFavSearchResult()
  }


  bookmark(element) {
    if (element.saved) {
      this.saveFavSearchResult(element, true)
    }
    else {
      this.saveFavSearchResult(element, false)
    }
  }

  repeateRoute(element) {
    this.apiService.setPrevSearchData(element)
    sessionStorage.setItem('prevSearch', JSON.stringify(element))
    this.router.navigate(["maps"])
  }

}
