import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login-page/login-page.component';
import { LandingComponent } from './pages/landing-page/landing-page.component';
import { ProfileComponent } from './pages/profile-page/profile-page.component';
import { HolidayComponent } from './pages/holiday-page/holiday-page.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Default route
  { path: 'login', component: LoginComponent },
  { path: 'landing', component: LandingComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'holiday', component: HolidayComponent },
  { path: '**', redirectTo: '/login' }, // Redirect to login page for any other route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
