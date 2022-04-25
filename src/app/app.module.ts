import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BodyContainerComponent } from './components/body-container/body-container.component';
import { CustomButtonComponent } from './components/custom-button/custom-button.component';
import { HeaderComponent } from './components/header/header.component';
import { LogoTitleComponent } from './components/logo-title/logo-title.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { ShowTasksComponent } from './components/show-tasks/show-tasks.component';
import { TaskItemComponent } from './components/task-item/task-item.component';
import { TasksComponent } from './components/tasks/tasks.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LogoTitleComponent,
    SearchBarComponent,
    BodyContainerComponent,
    CustomButtonComponent,
    TasksComponent,
    TaskItemComponent,
    ShowTasksComponent,
  ],
  imports: [FormsModule, BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
