// import { CommonModule } from '@angular/common';
// import { HttpClientModule } from '@angular/common/http';
// import { Component } from '@angular/core';
// import { BulkdataService } from '../../services/bulkdata.service';
// import {
//   FormArray,
//   FormBuilder,
//   FormGroup,
//   ReactiveFormsModule,
// } from '@angular/forms';
// import { RouterModule } from '@angular/router'; // Import RouterModule if needed

// @Component({
//   selector: 'app-view-reports',
//   standalone: true,
//   imports: [CommonModule, HttpClientModule, ReactiveFormsModule, RouterModule], // Add RouterModule if needed
//   templateUrl: './view-reports.component.html',
//   styleUrl: './view-reports.component.css',
// })
// export class ViewReportsComponent {
//   bulkDataForm: FormGroup;
//   currentPage: any;

//   constructor(
//     private fb: FormBuilder,
//     private bulkDataService: BulkdataService
//   ) {
//     this.bulkDataForm = this.fb.group({
//       bulkData: this.fb.array([]), // FormArray to hold dynamic rows
//     });
//   }

//   ngOnInit(): void {
//     this.fetchBulkData();
//   }

//   fetchBulkData(): void {
//     this.bulkDataService.getBduData().subscribe((response) => {
//       if (response.success) {
//         this.populateForm(response.data);
//       }
//     });
//   }

//   populateForm(data: any[]): void {
//     const bulkDataArray = this.bulkDataForm.get('bulkData') as FormArray;
//     data.forEach((item) => {
//       bulkDataArray.push(this.createBulkDataGroup(item));
//     });
//   }

//   createBulkDataGroup(item: any): FormGroup {
//     return this.fb.group({
//       Name: [item.Name],
//       BSE_code: [item.BSE_code],
//       NSE_code: [item.NSE_code],
//       Industry: [item.Industry],
//       Current_Price: [item.Current_Price],
//       Market_Capitalization: [item.Market_Capitalization],
//     });
//   }

//   get bulkData(): FormArray {
//     return this.bulkDataForm.get('bulkData') as FormArray;
//   }
// }

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BulkdataService } from '../../services/bulkdata.service';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  ReactiveFormsModule,
} from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-view-reports',
  standalone: true,
  imports: [CommonModule, HttpClientModule, ReactiveFormsModule, RouterModule], // Ensure ReactiveFormsModule is imported
  templateUrl: './view-reports.component.html',
  styleUrl: './view-reports.component.css',
})
export class ViewReportsComponent {
  bulkDataForm: FormGroup;
  currentPage = 1;
  pageSize = 10;
  totalPages = 1;

  constructor(
    private fb: FormBuilder,
    private bulkDataService: BulkdataService
  ) {
    this.bulkDataForm = this.fb.group({
      bulkData: this.fb.array([]),
    });
  }

  ngOnInit(): void {
    this.fetchBulkData(this.currentPage, this.pageSize);
  }

  fetchBulkData(page: number, limit: number): void {
    this.bulkDataService.getBduData(page, limit).subscribe((response) => {
      if (response.success) {
        this.totalPages = Math.ceil(response.totalCount / this.pageSize);
        this.populateForm(response.data);
      }
    });
  }

  populateForm(data: any[]): void {
    const bulkDataArray = this.bulkDataForm.get('bulkData') as FormArray;
    bulkDataArray.clear(); // Clear previous data before adding new ones
    data.forEach((item) => {
      bulkDataArray.push(this.createBulkDataGroup(item));
    });
  }

  createBulkDataGroup(item: any): FormGroup {
    return this.fb.group({
      Name: [item.Name],
      BSE_code: [item.BSE_code],
      NSE_code: [item.NSE_code],
      Industry: [item.Industry],
      Current_Price: [item.Current_Price],
      Market_Capitalization: [item.Market_Capitalization],
    });
  }

  get bulkData(): FormArray {
    return this.bulkDataForm.get('bulkData') as FormArray;
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.fetchBulkData(this.currentPage, this.pageSize);
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.fetchBulkData(this.currentPage, this.pageSize);
    }
  }
}
