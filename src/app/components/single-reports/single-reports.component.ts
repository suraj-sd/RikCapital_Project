import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ViewReportsService } from '../../services/view-reports.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-single-reports',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './single-reports.component.html',
  styleUrl: './single-reports.component.css',
})
export class SingleReportsComponent {
  stockForm!: FormGroup;
  reportData: any = { quarter1: [], quarter2: [], quarter3: [], quarter4: [] };
  BSE_code: string | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private ViewReportsService: ViewReportsService
  ) {}

  ngOnInit(): void {
    // Initialize reactive form with empty values
    this.stockForm = this.fb.group({
      Name: [''],
      BSE_code: [''],
      NSE_code: [''],
      Industry: [''],
      Current_Price: [''],
      Market_Capitalization: [''],
    });

    // Get BSE_code from the route parameters
    this.route.paramMap.subscribe(
      (params: { get: (arg0: string) => string | null }) => {
        this.BSE_code = params.get('BSE_code');
        if (this.BSE_code) {
          this.fetchStockData(this.BSE_code);
        }
      }
    );
  }

  fetchStockData(bseCode: string) {
    this.ViewReportsService.getStockByBSE(bseCode).subscribe(
      (data: any) => {
        if (data && data.stockData) {
          // Populate form with stock data
          this.stockForm.patchValue({
            Name: data.stockData.Name || '',
            BSE_code: data.stockData.BSE_code || '',
            NSE_code: data.stockData.NSE_code || '',
            Industry: data.stockData.Industry || '',
            Current_Price: data.stockData.Current_Price?.trim() || '0',
            Market_Capitalization:
              data.stockData.Market_Capitalization?.trim() || '0',
          });

          // Store report data
          this.reportData = data.reportData || {
            quarter1: [],
            quarter2: [],
            quarter3: [],
            quarter4: [],
          };
        }
      },
      (error: any) => {
        console.error('Error fetching stock data:', error);
      }
    );
  }

  selectedImage: string | null = null;

  openImagePreview(imageUrl: string) {
    this.selectedImage = imageUrl;
  }

  closeImagePreview() {
    this.selectedImage = null;
  }
}
