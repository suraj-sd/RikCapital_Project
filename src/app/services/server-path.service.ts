import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ServerPathService {
  constructor() {}

  // frontUrlOfBackend: any = 'http://localhost:4300/api/v1';

  frontUrlOfBackend: any = 'https://rikcapital-backend.onrender.com/api/v1';
}
