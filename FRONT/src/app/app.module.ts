import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TaskBoardComponent } from './components/task-board/task-board.component';
import { TaskCardComponent } from './components/task-card/task-card.component';
import { TaskCardModalComponent } from './components/task-card-modal/task-card-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthInterceptor } from 'src/core/interceptors/auth.Interceptor';
import { ErrorInterceptor } from 'src/core/interceptors/error.Interceptor';

@NgModule({
  declarations: [
    AppComponent,
    TaskBoardComponent,
    TaskCardComponent,
    TaskCardModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
