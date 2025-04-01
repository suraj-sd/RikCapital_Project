// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';

// export interface bulkData {
//   _id: string;
//   Name: string;
//   BSE_code: string;
//   NSE_code: string;
//   Industry: string;
//   Current_Price: string;
//   Market_Capitalization: string;
//   __v: number;
//   createdAt: string;
//   updatedAt: string;
// }

// @Injectable({
//   providedIn: 'root',
// })
// export class BulkdataService {
//   private apiUrl = 'http://localhost:4300/api/v1/bdu/bulkget';

//   constructor(private http: HttpClient) {}

//   getBduData(): Observable<{
//     success: boolean;
//     msg: string;
//     data: bulkData[];
//   }> {
//     return this.http.get<{ success: boolean; msg: string; data: bulkData[] }>(
//       this.apiUrl
//     );
//   }
// }

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface bulkData {
  _id: string;
  Name: string;
  BSE_code: string;
  NSE_code: string;
  Industry: string;
  Current_Price: string;
  Market_Capitalization: string;
  __v: number;
  createdAt: string;
  updatedAt: string;
}

export interface BulkDataResponse {
  success: boolean;
  msg: string;
  data: bulkData[];
  totalRecords: number;
  currentPage: number;
  totalPages: number;
}

@Injectable({
  providedIn: 'root',
})
export class BulkdataService {
  // private apiUrl = 'http://localhost:4300/api/v1/bdu/bulkget';

  private apiUrl = 'https://rikcapital-backend.onrender.com/api/v1/bdu/bulkget';

  constructor(private http: HttpClient) {}

  // getBduData(): Observable<BulkDataResponse> {
  //   return this.http.get<BulkDataResponse>(`${this.apiUrl}`);
  // }

  getBduData(page: number = 1, limit: number = 10): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?page=${page}&limit=${limit}`);
  }
}
