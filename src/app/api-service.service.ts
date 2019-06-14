import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  url = 'http://private-anon-40ba9623e1-testphonebook.apiary-mock.com';

  constructor(private http: HttpClient) { }

  searchData(title: string): Observable<any> {
    return this.http.get(`${this.url}?s=${encodeURI(title)}`).pipe(
      map(results => results['Search'])
    );
  }

  getPersona() {
    return this.http.get(`${this.url}/persona`);
  }

  getRegion() {
    return this.http.get(`${this.url}/region`);
  }
}
