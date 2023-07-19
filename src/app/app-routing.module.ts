import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { HolidayPageComponent } from './pages/holiday-page/holiday-page.component';
import { AuthGuard } from './services/auth/auth.guard';
import ProfileDetailCardComponent from './components/profile/profile-detail-card/profile-detail-card.component';
import { ProfileDetailUpdateCardComponent } from './components/profile/profile-detail-update-card/profile-detail-update-card.component';
import { ManagementPageComponent } from './pages/management-page/management-page/management-page.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: LandingPageComponent,
    canActivate: [AuthGuard],
  }, // Default route
  { path: 'login', component: LoginPageComponent },
  {
    path: 'profile',
    component: ProfilePageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'holiday',
    component: HolidayPageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'management',
    component: ManagementPageComponent,
    canActivate: [AuthGuard],
  },
  { path: '**', redirectTo: '/' }, // Redirect to login page for any other route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
