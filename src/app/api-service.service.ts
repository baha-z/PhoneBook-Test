import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  url = 'http://private-anon-40ba9623e1-testphonebook.apiary-mock.com';

  constructor(private http: HttpClient) { }

  getPersona() {
    return this.http.get(`${this.url}/persona`);
  }

  getRegion() {
    return this.http.get(`${this.url}/region`);
  }
}
