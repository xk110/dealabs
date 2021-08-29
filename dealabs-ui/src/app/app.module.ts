import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { PanelModule } from 'primeng/panel';
import { SplitterModule } from 'primeng/splitter';
import { TableModule } from 'primeng/table';
import { TabMenuModule } from 'primeng/tabmenu';
import { ToastModule } from 'primeng/toast';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DealCommentComponent } from './deal/deal-comment/deal-comment.component';
import { DealCreateComponent } from './deal/deal-create/deal-create.component';
import { DealDetailComponent } from './deal/deal-detail/deal-detail.component';
import { DealListComponent } from './deal/deal-list/deal-list.component';
import { FourOhFourComponent } from './four-oh-four/four-oh-four.component';
import { LoginComponent } from './login/login.component';
import { AuthInterceptor } from './shared/AuthInterceptor';
import { RequestInterceptor } from './shared/RequestInterceptor';
import { TabMenuComponent } from './tab-menu/tab-menu.component';

const prime = [
  ButtonModule,
  CalendarModule,
  CardModule,
  DynamicDialogModule,
  InputTextModule,
  InputTextareaModule,
  InputNumberModule,
  MessagesModule,
  MessageModule,
  PanelModule,
  SplitterModule,
  TableModule,
  TabMenuModule,
  ToastModule
];

@NgModule({
  declarations: [
    AppComponent,
    DealListComponent,
    DealDetailComponent,
    DealCreateComponent,
    DealCommentComponent,
    FourOhFourComponent,
    TabMenuComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ...prime
  ],
  providers: [MessageService,
    { provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
