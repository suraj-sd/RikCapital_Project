import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-upload-reports',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, HttpClientModule],
  templateUrl: './upload-reports.component.html',
  styleUrls: ['./upload-reports.component.css'],
})
export class UploadReportsComponent {
  uploadForm: FormGroup;
  files: { [key: string]: File } = {}; // Object to store selected files
  imagePreviews: { [key: string]: string | ArrayBuffer | null } = {}; // Object to store image previews

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.uploadForm = this.fb.group({
      BSE_code: ['', Validators.required],
      name: ['', Validators.required], // Add the name field
      report1: [null],
      report2: [null],
      report3: [null],
      report4: [null],
      report5: [null],
      report6: [null],
    });
  }

  onFileChange(event: Event, controlName: string) {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files[0]) {
      const file = input.files[0];

      // Validate file type (only images allowed)
      if (!file.type.startsWith('image/')) {
        alert('Please upload only image files (e.g., JPEG, PNG).');
        return;
      }

      // Store the file in the `files` object
      this.files[controlName] = file;

      // Generate a preview URL for the image
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreviews[controlName] = reader.result; // Store the preview URL
      };
      reader.onerror = (error) => {
        console.error('Error reading file:', error);
        alert('Error reading file. Please try again.');
      };
      reader.readAsDataURL(file);

      // Update the form control with the selected file name
      this.uploadForm.get(controlName)?.setValue(file.name);
    }
  }

  onSubmit() {
    console.log('Form submitted'); // Check if this logs when the button is clicked

    if (this.uploadForm.invalid) {
      console.log('Form is invalid'); // Check if the form is invalid
      alert(
        'Please fill out all required fields and upload at least one image.'
      );
      return;
    }

    console.log('Form is valid, proceeding with upload'); // Check if the form is valid

    const formData = new FormData();
    formData.append('BSE_code', this.uploadForm.get('BSE_code')?.value);
    formData.append('name', this.uploadForm.get('name')?.value);

    Object.keys(this.files).forEach((key) => {
      if (this.files[key]) {
        formData.append(key, this.files[key], this.files[key].name);
      }
    });

    console.log('FormData:', formData); // Check the FormData being sent

    this.http
      .post(
        'https://rikcapital-backend.onrender.com/api/v1/ur/addReport',
        formData
      )
      .subscribe({
        next: (response) => {
          console.log('Upload successful', response);
          alert('Upload successful!');
          this.resetForm();
        },
        error: (error) => {
          console.error('Upload failed', error);
          alert('Upload failed. Please try again.');
        },
        complete: () => {
          console.log('Upload request completed.');
        },
      });
  }

  resetForm() {
    this.uploadForm.reset(); // Reset the form
    this.files = {}; // Clear the files object
    this.imagePreviews = {}; // Clear the image previews
  }
}
