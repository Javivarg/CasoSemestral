import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class OpencageService {
  private apiUrl = 'https://api.opencagedata.com/geocode/v1/json';
  private apiKey = '2a21a0d6d02344acb20aa9d7e3249a27';

  constructor(private http: HttpClient) {}

  getComuna(lat: number, lon: number) {
    const url = `${this.apiUrl}?q=${lat}+${lon}&key=${this.apiKey}`;
    return this.http.get(url);
  }
}
