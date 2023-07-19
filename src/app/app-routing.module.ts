import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login-page/login-page.component';
import { LandingComponent } from './pages/landing-page/landing-page.component';
import { ProfileComponent } from './pages/profile-page/profile-page.component';
import { HolidayComponent } from './pages/holiday-page/holiday-page.component';
import { AuthGuard } from './services/auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: LandingComponent,
    canActivate: [AuthGuard],
  }, // Default route
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'holiday', component: HolidayComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '/' }, // Redirect to login page for any other route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
