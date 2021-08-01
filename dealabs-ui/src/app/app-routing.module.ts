import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DealCreateComponent } from './deal/deal-create/deal-create.component';
import { DealDetailComponent } from './deal/deal-detail/deal-detail.component';
import { DealListComponent } from './deal/deal-list/deal-list.component';

const routes: Routes = [
  { path: 'deal-list', component: DealListComponent },
  { path: 'deal-create', component: DealCreateComponent },
  { path: 'deal-detail/:id', component: DealDetailComponent },
  { path: '', redirectTo: 'deal-list', pathMatch: 'full' },
  { path: '**', redirectTo: 'deal-list', pathMatch: 'full' }
];



@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
