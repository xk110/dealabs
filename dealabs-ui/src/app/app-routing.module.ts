import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DealCreateComponent } from './deal/deal-create/deal-create.component';
import { DealDetailComponent } from './deal/deal-detail/deal-detail.component';
import { DealListComponent } from './deal/deal-list/deal-list.component';
import { FourOhFourComponent } from './four-oh-four/four-oh-four.component';

const routes: Routes = [
  { path: 'deal-list', component: DealListComponent },
  { path: 'deal-create', component: DealCreateComponent },
  { path: 'deal-detail/:id', component: DealDetailComponent },
  { path: '', component: DealListComponent },
  { path: 'not-found', component: FourOhFourComponent },
  { path: '**', redirectTo: 'not-found' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
