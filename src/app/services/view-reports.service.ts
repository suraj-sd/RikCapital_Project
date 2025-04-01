import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ViewReportsService {
  // private apiUrl = 'http://localhost:4300/api/v1/ur/getStockReport';
  private apiUrl =
    'https://rikcapital-backend.onrender.com/api/v1/ur/getStockReport';

  constructor(private http: HttpClient) {}

  getStockByBSE(BSE_code: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${BSE_code}`);
  }
}
