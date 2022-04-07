import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { LogoTitleComponent } from './components/logo-title/logo-title.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { BodyContainerComponent } from './components/body-container/body-container.component';
import { CustomButtonComponent } from './components/custom-button/custom-button.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { TaskItemComponent } from './components/task-item/task-item.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LogoTitleComponent,
    SearchBarComponent,
    BodyContainerComponent,
    CustomButtonComponent,
    TasksComponent,
    TaskItemComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
