import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, of } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private dataArray: any[];
  constructor(private http: HttpClient) {
    this.dataArray = [];
  }

  setArray(data: any[]) {
    this.dataArray = data;
  }
  getArray() {
    return this.dataArray;
  }

  totalPages = 10;
  getCardDataUrl =
    'https://prod-advisor-api.ischoolconnect.com/api/v0/public/search';
  data: any = [];

  postData(
    id: any,
    tab: any,
    page: number,
    pageSize: number,
    sortkey: string
  ): Observable<any> {
    const headers = new HttpHeaders({
      'X-Tenant-Id': '81b13b0a-e2bd-4876-a0a5-a6adccbfabca',
    });

    let url: string;

    const payload = {
      application_id: '946917d1-a3f8-4b23-84b5-06c203532cee',
    };

    const params = new HttpParams()
      .set('limit', pageSize)
      .set('page', page)
      .set('sort_direction', 'DESC')
      .set('sort_key', sortkey);
    url = this.getCardDataUrl;

    return this.http.post(url, payload, { headers, params }).pipe(
      map((response: any) => {
        this.totalPages = response.totalPages;
        return response;
      })
    );
  }
}
