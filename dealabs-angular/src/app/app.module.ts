import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DealListComponent } from './deal/deal-list/deal-list.component';
import { DealDetailComponent } from './deal/deal-detail/deal-detail.component';
import { DealCreateComponent } from './deal/deal-create/deal-create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { MessageService } from 'primeng/api';
import { PanelModule } from 'primeng/panel';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { DealCommentComponent } from './deal/deal-comment/deal-comment.component';

const prime = [
  ButtonModule,
  CalendarModule,
  CardModule,
  InputTextModule,
  InputTextareaModule,
  InputNumberModule,
  MessagesModule,
  MessageModule,
  PanelModule,
  TableModule,
  ToastModule
];

@NgModule({
  declarations: [
    AppComponent,
    DealListComponent,
    DealDetailComponent,
    DealCreateComponent,
    DealCommentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ...prime
  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
