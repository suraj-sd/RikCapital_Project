import { AboutComponent } from './components/about/about.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { Routes } from '@angular/router';
import { UploadReportsComponent } from './components/upload-reports/upload-reports.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { ViewReportsComponent } from './components/view-reports/view-reports.component';
import { SingleReportsComponent } from './components/single-reports/single-reports.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AccesspagesService } from './services/accesspages.service';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'about', component: AboutComponent },
  {
    path: 'uploadReport',
    component: UploadReportsComponent,
    canActivate: [AccesspagesService],
  },
  { path: 'contact', component: ContactUsComponent },
  { path: '', component: ViewReportsComponent },
  { path: 'single-report/:BSE_code', component: SingleReportsComponent },
  { path: '**', component: NotFoundComponent },
  // { path: '', redirectTo: '/login', pathMatch: 'full' },
];
