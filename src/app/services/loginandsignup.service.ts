import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServerPathService } from './server-path.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginandsignupService {
  private apiUrl: string;
  constructor(private http: HttpClient, private common: ServerPathService) {
    this.apiUrl = `${common.frontUrlOfBackend}/admin`;
  }

  createAdmin(data: {
    email: string;
    password: string;
    userType: string;
  }): Observable<any> {
    return this.http.post(`${this.apiUrl}/createAdmin`, data);
  }

  // Login admin or user
  loginAdminAndUser(email: string, password: string): Observable<any> {
    const authHeader = `Basic ${btoa(`${email}:${password}`)}`; // ✅ Correct Encoding

    const headers = new HttpHeaders({
      Authorization: authHeader,
    });

    return this.http.post(`${this.apiUrl}/loginAdminAndUser`, {}, { headers });
  }
}
