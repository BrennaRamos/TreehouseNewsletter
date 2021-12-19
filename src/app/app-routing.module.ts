import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewslettersComponent } from './newsletters/newsletters.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NewsletterDetailComponent } from './newsletter-detail/newsletter-detail.component';

const routes: Routes = [
  { path: 'newsletters', component: NewslettersComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },            // So that users are always led to the dashboard when url path is empty
  { path: 'detail/:id', component: NewsletterDetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

