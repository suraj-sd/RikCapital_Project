import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServerPathService } from './server-path.service';

@Injectable({
  providedIn: 'root',
})
export class UploadReportsService {
  constructor(private http: HttpClient, private common: ServerPathService) {}

  addServiceCategory(data: any) {
    return this.http.post(
      `${this.common.frontUrlOfBackend}/ur/addReport`,
      data
    );
  }
}
